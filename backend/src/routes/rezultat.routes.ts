import express from 'express'
import { RezultatController } from '../controllers/rezultat.controller';

const rezultatRouter = express.Router();

rezultatRouter.route('/dodajOsnovu').post(
    (req, res)=>new RezultatController().dodajOsnovu(req, res)
);

rezultatRouter.route('/azuriraj').post(
    (req, res)=>new RezultatController().azurirajRezultat(req, res)
);

rezultatRouter.route('/dohvatiRezultate').post(
    (req, res)=>new RezultatController().getAll(req, res)
);

rezultatRouter.route('/dohvatiNeke').post(
    (req, res)=>new RezultatController().dohvatiNeke(req, res)
);

export default rezultatRouter;