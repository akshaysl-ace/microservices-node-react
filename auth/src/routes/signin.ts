import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@asl.org.ticketing/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage(''),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Username / Password is not valid !'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials !');
    }

    const isMatching = Password.compare(existingUser.password, password);
    if (!isMatching) {
      throw new BadRequestError('Invalid credentials !');
    }

    //generate json web token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    ); // Tell typeScript we have done this ! check already.

    // store it to session cookie object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
