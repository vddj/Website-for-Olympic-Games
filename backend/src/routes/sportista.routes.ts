import express from 'express'
import { SportistaController } from '../controllers/sportista.controller';

const sportistaRouter = express.Router();

sportistaRouter.route('/dohvatiSportiste').post(
    (req, res)=>new SportistaController().dohvatiSportiste(req, res)
);

sportistaRouter.route('/dodajSportistu').post(
    (req, res)=>new SportistaController().dodajSportistu(req, res)
);

/*sportistaRouter.route('/azurirajSportistu').post(
    (req, res)=>new SportistaController().azurirajSportistu(req, res)
);*/

sportistaRouter.route('/dohvatiRekorde').get(
    (req, res)=>new SportistaController().dohvatiRekorde(req, res)
);

export default sportistaRouter;