import express from 'express'
import { TakmicenjeController } from '../controllers/takmicenje.controller';

const takmicenjeRouter = express.Router();

takmicenjeRouter.route('/dodajTakmicenje').post(
    (req, res)=>new TakmicenjeController().dodajTakmicenje(req, res)
);

takmicenjeRouter.route('/dohvatiTakmicenja').post(
    (req, res)=>new TakmicenjeController().dohvatiTakmicenjaDelegata(req, res)
);

takmicenjeRouter.route('/getAll').get(
    (req, res)=>new TakmicenjeController().getAll(req, res)
);

takmicenjeRouter.route('/dodajTakmicare').post(
    (req, res)=>new TakmicenjeController().dodajTakmicare(req, res)
);

takmicenjeRouter.route('/dodajVremeMesto').post(
    (req, res)=>new TakmicenjeController().dodajVremeMesto(req, res)
);

takmicenjeRouter.route('/promeniVremeUtakmica').post(
    (req, res)=>new TakmicenjeController().promeniVremeUtakmica(req, res)
);

takmicenjeRouter.route('/zavrsiTakmicenje').post(
    (req, res)=>new TakmicenjeController().zavrsiTakmicenje(req, res)
);

export default takmicenjeRouter;