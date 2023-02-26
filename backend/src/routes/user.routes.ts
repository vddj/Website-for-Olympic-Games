import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
);

userRouter.route('/registerleader').post(
    (req, res)=>new UserController().registerleader(req, res)
)

userRouter.route('/dohvatiDelegate').get(
    (req, res)=>new UserController().dohvatiDelegate(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res)=>new UserController().promeniLozinku(req, res)
)

userRouter.route('/dohvatiNeprihvacene').get(
    (req, res)=>new UserController().dohvatiNeprihvacene(req, res)
)

userRouter.route('/prihvatiZahtev').post(
    (req, res)=>new UserController().prihvatiZahtev(req, res)
)

export default userRouter;