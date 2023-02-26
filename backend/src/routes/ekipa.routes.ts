import express from 'express'
import { EkipaController } from '../controllers/ekipa.controller';

const ekipaRouter = express.Router();

ekipaRouter.route('/getAll').get(
    (req, res)=>new EkipaController().getAll(req, res)
);

ekipaRouter.route('/dodajClana').post(
    (req, res)=>new EkipaController().dodajClana(req, res)
);

ekipaRouter.route('/dodajEkipu').post(
    (req, res)=>new EkipaController().dodajEkipu(req, res)
);

export default ekipaRouter;