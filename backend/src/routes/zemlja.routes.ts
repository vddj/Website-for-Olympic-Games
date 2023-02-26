import express from 'express'
import { ZemljaController } from '../controllers/zemlja.controller';

const zemljaRouter = express.Router();

zemljaRouter.route('/getAll').get(
    (req, res)=>new ZemljaController().pokupiSveZemlje(req, res)
);

zemljaRouter.route('/getLokacije').get(
    (req, res)=>new ZemljaController().pokupiSveLokacije(req, res)
);

zemljaRouter.route('/dodajVreme').post(
    (req, res)=>new ZemljaController().dodajVreme(req, res)
);

zemljaRouter.route('/dodajMedalju').post(
    (req, res)=>new ZemljaController().dodajMedalju(req, res)
);

export default zemljaRouter;