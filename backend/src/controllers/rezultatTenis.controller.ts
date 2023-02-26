import express from 'express';
import RezultatTenis from '../models/rezultatTenis';

export class RezultatTenisController{

    dodajOsnovu = (req: express.Request, res: express.Response)=>{
        let rez = new RezultatTenis(req.body);

        rez.save().then((rez)=>{
            res.status(200).json({'message': 'rezultat added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    dohvatiRezultate = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let pol = req.body.pol;
        //console.log(id + ' ' + ' ' + pol);

        RezultatTenis.findOne({'id': id, 'pol': pol}, (err: any, rez: any)=>{
            if(err) console.log(err);
            else {
                res.json(rez);
            }
        })
    }

    azuriraj = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let pol = req.body.pol;
        let sta = req.body.sta;
        let data = req.body.data;
    
        RezultatTenis.findOne({'id': id, 'pol': pol}, (err: any, rez: any)=>{
            if(err) console.log(err);
            else {
                if(rez){
                    if(sta === 'ekipe4'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"ekipe4": data}});
                    }
                    else if(sta === 'ekipe3'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"ekipe3": data}});
                    }
                    else if(sta === 'ekipe2'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"ekipe2": data}});
                    }
                    else if(sta === 'ekipe1'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"ekipe1": data}});
                    }
                    else if(sta === 'ekipe123'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"ekipe123": data}});
                    }
                    else if(sta === 'f_8'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"f_8": data, "zavrseno8": 1}});
                    }
                    else if(sta === 'f_4'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"f_4": data, "zavrseno4": 1}});
                    }
                    else if(sta === 'f_3'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"f_3": data, "zavrseno3": 1}});
                    }
                    else if(sta === 'f_2'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"f_2": data, "zavrseno2": 1}});
                    }
                    else if(sta === 'f_1'){
                        RezultatTenis.collection.updateOne({'id': id, 'pol': pol}, {$set: {"f_1": data, "zavrseno1": 1}});
                    }
                    res.status(200).json({'message': 'grupa changed'});
                }
                else {
                    res.json({'message': 'not found'});
                }
            }
        })
    }
}