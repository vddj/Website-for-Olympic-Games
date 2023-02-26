import express from 'express';
import Rekord from '../models/rekord';
import Sportista from '../models/sportista';

export class SportistaController{
    getAll = (req: express.Request, res: express.Response) =>{
        Sportista.find({}, (err, news)=>{
            if(err) console.log(err);
            else {
                res.json(news);
            }
        })
    }
/*
    dodajSportistu = (req: express.Request, res: express.Response)=>{
        let sportista = new Sportista(req.body);

        sportista.save().then((sportista)=>{
            res.status(200).json({'message': 'sportista added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    azurirajSportistu = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        let disciplina = req.body.disciplina;

        Sportista.findOne({'ime': ime}, (err: any, sportista: any)=>{
            if(err) console.log(err);
            else{
                if(sportista){
                    let disc = {
                        naziv: disciplina,
                        prijavljen: 'ne'
                    }
                    Sportista.collection.updateOne({'ime': ime}, {$push: {"discipline": disc}});
                    res.status(200).json({'message': 'sportista izmenjen'});
                }
                else {
                    res.json({'message': 'not found'});
                }
            }
        })
    }*/

    dodajSportistu = (req: express.Request, res: express.Response)=>{
        let sportista = new Sportista(req.body);
        let ime = req.body.ime;
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let pol = req.body.pol;
        let disciplina = req.body.disciplina;

        Sportista.findOne({'ime': ime, 'pol': pol}, (err: any, sp: any)=>{
            if(err) console.log(err);
            else{
                if(sp){
                    if(sp.sport == sport && sp.zemlja == zemlja){
                        let disc = {
                            naziv: disciplina,
                            prijavljen: 'ne'
                        };
                        Sportista.collection.updateOne({'ime': ime}, {$push: {"discipline": disc}});
                        res.status(200).json({'message': 'sportista izmenjen'});
                    }
                    else {
                        if(sp.sport != sport) res.status(200).json({'message': 'ne moze taj sport'});
                        else if(sp.zemlja != zemlja) res.status(200).json({'message': 'ne moze ta zemlja'});
                    }
                }
                else {
                    
                    sportista.save().then(()=>{
                        res.status(200).json({'message': 'sportista added'});
                    }).catch((err: any)=>{
                        res.status(400).json({'message': err});
                    })
                }
            }
        })
    }

    prijaviTakmicara = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Sportista.findOne({'ime': ime, 'zemlja': zemlja, 'sport': sport, 'pol': pol, 'discipline': {$all: [disciplina]}})
    }

    dohvatiRekorde = (req: express.Request, res: express.Response)=>{
        Rekord.find({}, (err, rekord)=>{
            if(err) console.log(err);
            else {
                res.json(rekord);
            }
        })
    }

    dohvatiSportiste = (req: express.Request, res: express.Response) =>{
        let ime = req.body.ime;
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let pol = req.body.pol;
        let medalja = req.body.medalja;
        let da = 'da';
        if(zemlja == "Све земље") zemlja = '';
        if(medalja == 1){
            Sportista.find({'ime': {$regex: ime}, 'zemlja': {$regex: zemlja}, 
            'sport': {$regex: sport}, 'pol': {$regex: pol}, 'medalja': da}, (err, news)=>{
                if(err) console.log(err);
                else {
                    res.json(news);
                }
            })
        }
        else{
            Sportista.find({'ime': {$regex: ime}, 'zemlja': {$regex: zemlja}, 
                'sport': {$regex: sport}, 'pol': {$regex: pol}}, (err, news)=>{
                if(err) console.log(err);
                else {
                    res.json(news);
                }
            })
        }
        
    }
    
}