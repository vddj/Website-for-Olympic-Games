import express from 'express';
import Sport from '../models/sport';
import Disciplina from '../models/disciplina';

export class SportController{

    dodajSport = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let vrsta = req.body.vrsta;
        let min_igraca = req.body.min_igraca;
        let max_igraca = req.body.max_igraca;
        let disc = {
            naziv: disciplina,
            vrsta: vrsta,
            min_igraca: min_igraca,
            max_igraca: max_igraca
        };
        let sportObj = new Sport({
            sport: sport,
            discipline: [
               disc
            ]
        });
        
        Sport.findOne({'sport': sport}, (err: any, sport1: any)=>{
            if(err) console.log(err);
            else {
                if(sport1) {
                    Sport.collection.updateOne({'sport': sport}, {$push: {'discipline': disc}});
                    res.status(200).json({'message': 'disciplina added'});
                }
                else {
                    sportObj.save().then((sport: any)=>{
                        res.status(200).json({'message': 'sport added'});
                    }).catch((err: any)=>{
                        res.status(400).json({'message': err});
                    })
                }
            }
        })
    }

    getAll1 = (req: express.Request, res: express.Response) =>{
        Sport.find({}, (err, news)=>{
            if(err) console.log(err);
            else {
                res.json(news);
            }
        })
    }
}
