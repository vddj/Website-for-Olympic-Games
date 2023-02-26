import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import zemljaRouter from './routes/zemlja.routes';
import sportistaRouter from './routes/sportista.routes';
import sportRouter from './routes/sport.routes';
import takmicenjeRouter from './routes/takmicenje.routes';
import rezultatRouter from './routes/rezultat.routes';
import ekipaRouter from './routes/ekipa.routes';
import rezultatGrupniRouter from './routes/rezultatGrupni.routes';
import rezultatTenisRouter from './routes/rezultatTenis.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/Olimpijada');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok')
});
const router = express.Router();
router.use('/users', userRouter);
router.use('/zemlja', zemljaRouter);
router.use('/sportista', sportistaRouter);
router.use('/sport', sportRouter);
router.use('/takmicenje', takmicenjeRouter);
router.use('/rezultat', rezultatRouter);
router.use('/ekipa', ekipaRouter);
router.use('/rezultatGrupni', rezultatGrupniRouter);
router.use('/rezultatTenis', rezultatTenisRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

