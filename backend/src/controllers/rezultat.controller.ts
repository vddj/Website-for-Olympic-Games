import express from 'express';
import Rezultat from '../models/rezultat';

export class RezultatController{

    dodajOsnovu = (req: express.Request, res: express.Response)=>{
        let rez = new Rezultat(req.body);

        rez.save().then((rez)=>{
            res.status(200).json({'message': 'rezultat added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    azurirajRezultat = (req: express.Request, res: express.Response) =>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let ime = req.body.ime;
        let mm = req.body.mm;
        let ss = req.body.ss;
        let tt = req.body.tt;
        let metar1 = req.body.metar1;
        let centi1 = req.body.centi1;
        let metar2 = req.body.metar2;
        let centi2 = req.body.centi2;
        let metar3 = req.body.metar3;
        let centi3 = req.body.centi3;
        let cc = req.body.cc;
        let krug = req.body.krug;
        //console.log(mm);
        //console.log(ime);

        Rezultat.findOne({'sport': sport, 'disciplina': disciplina, 'ime': ime}, (err: any, tekma: any)=>{
            if(err) console.log(err);
            else {
                if(tekma){
                    Rezultat.collection.updateOne({'sport': sport, 'disciplina': disciplina, 'ime': ime},
                        {$set: {'mm': mm, 'ss': ss, 'tt': tt, 'metar1': metar1, 'centi1': centi1,  
                        'metar2': metar2, 'centi2': centi2, 'metar3': metar3, 'centi3': centi3, 'cc': cc, 'krug': krug}});
                    
                    res.status(200).json({'message': 'rezultati added'});
                }
                else res.status(200).json({'message': 'rezultati error'});
            }
        })
    }


    getAll = (req: express.Request, res: express.Response) =>{
        Rezultat.find({}, (err, rez)=>{
            if(err) console.log(err);
            else {
                res.json(rez);
            }
        })
    }

    dohvatiNeke = (req: express.Request, res: express.Response) =>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        Rezultat.find({'sport': sport, 'disciplina': disciplina, 'pol': pol}, (err, news)=>{
            if(err) console.log(err);
            else {
                res.json(news);
            }
        })
    }

}