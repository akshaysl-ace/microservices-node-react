import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    if (req) {
        console.log("from sign in route");
    }
    res.send("Hi there");
});

export { router as signinRouter };