import express from 'express'
import { SportController } from '../controllers/sport.controller';

const sportRouter = express.Router();

sportRouter.route('/dohvatiSportove1').get(
    (req, res)=>new SportController().getAll1(req, res)
);

sportRouter.route('/dodajSport').post(
    (req, res)=>new SportController().dodajSport(req, res)
);

export default sportRouter;