import express from 'express'
import { RezultatTenisController } from '../controllers/rezultatTenis.controller';

const rezultatTenisRouter = express.Router();

rezultatTenisRouter.route('/dodajOsnovu').post(
    (req, res)=>new RezultatTenisController().dodajOsnovu(req, res)
);

rezultatTenisRouter.route('/dohvatiRezultate').post(
    (req, res)=>new RezultatTenisController().dohvatiRezultate(req, res)
);

rezultatTenisRouter.route('/azuriraj').post(
    (req, res)=>new RezultatTenisController().azuriraj(req, res)
);

export default rezultatTenisRouter;