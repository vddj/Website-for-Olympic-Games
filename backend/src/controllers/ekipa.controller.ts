import express from 'express';
import Ekipa from '../models/ekipa';

export class EkipaController{

    dodajEkipu = (req: express.Request, res: express.Response)=>{
        let ekipa = new Ekipa(req.body);

        ekipa.save().then((ekipa)=>{
            res.status(200).json({'message': 'ekipa added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    getAll = (req: express.Request, res: express.Response) =>{
        Ekipa.find({}, (err, news)=>{
            if(err) console.log(err);
            else {
                res.json(news);
            }
        })
    }

    dodajClana = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let zemlja = req.body.zemlja;
        let niz = req.body.niz;

        Ekipa.findOne({'sport': sport, 'disciplina': disciplina, 'pol': pol, 'zemlja': zemlja}, (err: any, tekma: any)=>{
            if(err) console.log(err);
            else {
                if(tekma){
                    for(let i = 0; i < niz.length; i++){
                        Ekipa.collection.updateOne({'sport': sport, 'disciplina': disciplina, 'pol': pol, 'zemlja': zemlja},
                         {$push: {'igraci': niz[i]}});
                    }
                    res.status(200).json({'message': 'takmicari added'});
                }
                else res.status(200).json({'message': 'takmicari error'});
            }
        })
    }
}