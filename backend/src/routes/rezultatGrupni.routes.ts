import express from 'express'
import { RezultatGrupniController } from '../controllers/rezultatGrupni.controller';

const rezultatGrupniRouter = express.Router();

rezultatGrupniRouter.route('/dodajOsnovu').post(
    (req, res)=>new RezultatGrupniController().dodajOsnovu(req, res)
);

rezultatGrupniRouter.route('/dohvatiRezultate').post(
    (req, res)=>new RezultatGrupniController().getAll(req, res)
);


rezultatGrupniRouter.route('/azuriraj').post(
    (req, res)=>new RezultatGrupniController().azuriraj(req, res)
);

rezultatGrupniRouter.route('/zavrsi').post(
    (req, res)=>new RezultatGrupniController().zavrsi(req, res)
);

rezultatGrupniRouter.route('/dodajEkipe').post(
    (req, res)=>new RezultatGrupniController().dodajEkipe(req, res)
);

export default rezultatGrupniRouter;