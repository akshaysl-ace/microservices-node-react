import express from 'express';
import { currentUserValidator } from '@asl.org.ticketing/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUserValidator, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
