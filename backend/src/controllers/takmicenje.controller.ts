import express from 'express';
import Takmicenje from '../models/takmicenje';

export class TakmicenjeController{
    getAll = (req: express.Request, res: express.Response) =>{
        Takmicenje.find({}, (err, takmicenje)=>{
            if(err) console.log(err);
            else {
                res.json(takmicenje);
            }
        })
    }

    dodajTakmicenje = (req: express.Request, res: express.Response)=>{
        let takmicenje = new Takmicenje(req.body);

        takmicenje.save().then((takmicenje)=>{
            res.status(200).json({'message': 'takmicenje added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    dohvatiTakmicenjaDelegata = (req: express.Request, res: express.Response) =>{
        let delegat = req.body.delegat;
        Takmicenje.find({'delegat': delegat}, (err, takmicenja)=>{
            if(err) console.log(err);
            else {
                res.json(takmicenja);
            }
        })
    }

    dodajTakmicare = (req: express.Request, res: express.Response) =>{
        let sport= req.body.sport;
        let disciplina = req.body.disciplina;
        let sportisti = req.body.sportisti;

        Takmicenje.findOne({'sport': sport, 'disciplina': disciplina}, (err: any, tekma: any)=>{
            if(err) console.log(err);
            else {
                if(tekma){
                    for(let i = 0; i < sportisti.length; i++){
                        Takmicenje.collection.updateOne({'sport': sport, 'disciplina': disciplina}, {$push: {'sportisti': sportisti[i]}});
                    }
                    res.status(200).json({'message': 'takmicari added'});
                }
                else res.status(200).json({'message': 'takmicari error'});
            }
        })
    }

    dodajVremeMesto = (req: express.Request, res: express.Response) =>{
        let sport= req.body.sport;
        let disciplina = req.body.disciplina;
        let vreme = req.body.vreme;
        let vremeDan = req.body.vremeDan;
        let vremeMesec = req.body.vremeMesec;
        let lokacija = req.body.lokacija;
        
        Takmicenje.findOne({'sport': sport, 'disciplina': disciplina}, (err: any, tekma: any)=>{
            if(err) console.log(err);
            else {
                if(tekma){
                    Takmicenje.collection.updateOne({'sport': sport, 'disciplina': disciplina}, 
                        {$set: {'vreme': vreme, 'vremeDan': vremeDan, 'vremeMesec': vremeMesec, 'lokacija': lokacija}});
                    res.status(200).json({'message': 'vreme added'});
                }
                else res.status(200).json({'message': 'vreme error'});
            }
        })
    }

    promeniVremeUtakmica = (req: express.Request, res: express.Response) =>{
        let sport= req.body.sport;
        let disciplina = req.body.disciplina;
        let vreme = req.body.vreme;
        let vremeDan = req.body.vremeDan;
        let vremeMesec = req.body.vremeMesec;
        let lokacija = req.body.lokacija;
        
        Takmicenje.findOne({'sport': sport, 'disciplina': disciplina}, (err: any, tekma: any)=>{
            if(err) console.log(err);
            else {
                if(tekma){
                    Takmicenje.collection.updateOne({'sport': sport, 'disciplina': disciplina}, 
                        {$set: {'vremeG': vreme, 'danG': vremeDan, 'mesecG': vremeMesec, 'lokacijaG': lokacija}});
                    res.status(200).json({'message': 'vreme added'});
                }
                else res.status(200).json({'message': 'vreme error'});
            }
        })
    }

    zavrsiTakmicenje = (req: express.Request, res: express.Response) =>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Takmicenje.findOne({'sport': sport, 'disciplina': disciplina, 'pol': pol}, (err: any, takmicenje: any)=>{
            if(err) console.log(err);
            else {
                if(takmicenje){
                    Takmicenje.collection.updateOne({'sport': sport, 'disciplina': disciplina, 'pol': pol}, 
                    {$set: {'zavrseno': 1}});
                    res.status(200).json({'message': 'zavrseno'});
                }
            }
        })
    }
}