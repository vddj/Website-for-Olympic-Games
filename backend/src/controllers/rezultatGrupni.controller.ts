import express from 'express';
import rezultatGrupni from '../models/rezultatGrupni';
import RezultatGrupni from '../models/rezultatGrupni';

export class RezultatGrupniController{

    dodajOsnovu = (req: express.Request, res: express.Response)=>{
        let rez = new RezultatGrupni(req.body);

        rez.save().then((rez)=>{
            res.status(200).json({'message': 'rezultat added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    getAll = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let sport = req.body.sport;
        let pol = req.body.pol;
        //console.log(id + ' ' + sport + ' ' + pol);

        RezultatGrupni.findOne({'sport': sport, 'pol': pol}, (err: any, rez: any)=>{
            if(err) console.log(err);
            else {
                res.json(rez);
            }
        })
    }

    azuriraj = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let sport = req.body.sport;
        let pol = req.body.pol;
        let grupa = req.body.grupa;
        let data = req.body.data;
    
        RezultatGrupni.findOne({'sport': sport, 'pol': pol}, (err: any, rez: any)=>{
            if(err) console.log(err);
            else {
                if(rez){
                    if(grupa === 'a'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$set: {"grupaA": data}});
                    }
                    else if(grupa === 'b'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$set: {"grupaB": data}});
                    }
                    else if(grupa === 'c'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$set: {"f_4": data}});
                    }
                    else if(grupa === 'd'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$set: {"f_2": data}});
                    }
                    else if(grupa === 'j'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$set: {"f": data}});
                    }
                    else if(grupa === 't'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$set: {"mecZaTrece": data}});
                    }
                    res.status(200).json({'message': 'grupa changed'});
                }
                else {
                    res.json({'message': 'not found'});
                }
            }
        })
    }

    zavrsi = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let sport = req.body.sport;
        let pol = req.body.pol;
        let faza = req.body.faza;
        let data = 1;

        let prosliA = req.body.prosliA;
        let prosliB = req.body.prosliB; 
        let prosliCetvrt = req.body.prosliCetvrt; 
        let prosliPola = req.body.prosliPola;
    
        RezultatGrupni.findOne({'sport': sport, 'pol': pol}, (err: any, rez: any)=>{
            if(err) console.log(err);
            else {
                if(rez){
                    if(faza === 'a'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$set: {"zavrsenoA": data, 
                            "zavrsenoB": data, "prosliA": prosliA, "prosliB": prosliB}});
                    }
                    else if(faza === 'c'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, 
                            {$set: {"zavrseno4": data, "prosliCetvrt": prosliCetvrt}});
                    }
                    else if(faza === 'd'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, 
                            {$set: {"zavrseno2": data, "prosliPola": prosliPola}});
                    }
                    else if(faza === 'j'){
                        RezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$set: {"zavrseno1": data}});
                    }
                    res.status(200).json({'message': 'grupa changed'});
                }
                else {
                    res.json({'message': 'not found'});
                }
            }
        })
    }

    dodajEkipe = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let sport = req.body.sport;
        let pol = req.body.pol;
        let ekipe = req.body.ekipe;

        rezultatGrupni.findOne({'sport': sport, 'pol': pol}, (err: any, news: any)=>{
            if(err) console.log(err);
            else {
                if(news){
                    for(let i = 0; i < ekipe.length; i++){
                        rezultatGrupni.collection.updateOne({'sport': sport, 'pol': pol}, {$push: {'ekipe': ekipe[i]}});
                    }
                    res.status(200).json({'message': 'ekipe added'});
                }
                else res.status(200).json({'message': 'ekipe not added'});
            }
        })
    }
}