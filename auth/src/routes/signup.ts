import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user'
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage("Please provide valid email."),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 to 20 characters.")
],
    async (req: Request, res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('Email already in use !');
        }

        const user = User.build({ email, password });
        await user.save();

        //generate json web token
        const userJwt = jwt.sign({
            id : user.id,
            email: user.email
        }, process.env.JWT_KEY!);                                  // Tell typeScript we have done this ! check already.

        // store it to session cookie object
        req.session = {
            jwt : userJwt
        };

        res.status(201).send(user);
    });

export { router as signupRouter };