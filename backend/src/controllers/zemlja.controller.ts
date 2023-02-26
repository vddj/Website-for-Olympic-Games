import express from 'express';
import Lokacija from '../models/lokacija';
import Zemlja from '../models/zemlja';

export class ZemljaController{
    pokupiSveZemlje = (req: express.Request, res: express.Response) =>{
        Zemlja.find({}, (err, news)=>{
            if(err) console.log(err);
            else {
                res.json(news);
            }
        })
    }

    dodajMedalju = (req: express.Request, res: express.Response) =>{
        let ime = req.body.ime;
        let medalja = req.body.medalja;

        Zemlja.findOne({'ime': ime}, (err: any, zemlja: any)=>{
            if(err) console.log(err);
            else {
                if(zemlja){
                    if(medalja === 'sportista'){
                        let sportista = zemlja.br_sportista+1;
                        Zemlja.collection.updateOne({'ime': ime}, {$set: {'br_sportista': sportista}});
                        console.log('bronza ' + ime + ' ' + sportista);
                        return;
                    }

                    if(medalja === 'zlato'){
                        let zlato = zemlja.br_zlato+1;
                        Zemlja.collection.updateOne({'ime': ime}, {$set: {'br_zlato': zlato}});
                        console.log('zlato ' + ime + ' ' + zlato);
                    }
                    else if(medalja === 'srebro'){
                        let srebro = zemlja.br_srebro+1;
                        Zemlja.collection.updateOne({'ime': ime}, {$set: {'br_srebro': srebro}});
                        console.log('srebro ' + ime + ' ' + srebro);
                    }
                    else if(medalja === 'bronza'){
                        let bronza = zemlja.br_bronza+1;
                        Zemlja.collection.updateOne({'ime': ime}, {$set: {'br_bronza': bronza}});
                        console.log('bronza ' + ime + ' ' + bronza);
                    }
                    let ukupno = zemlja.br_ukupno+1;
                    Zemlja.collection.updateOne({'ime': ime}, {$set: {'br_ukupno': ukupno}});
                    console.log('ukupno ' + ime + ' ' + ukupno);
                }
            }
        })
    }

    pokupiSveLokacije = (req: express.Request, res: express.Response) =>{
        Lokacija.find({}, (err: any, news: any)=>{
            if(err) console.log(err);
            else {
                res.json(news);
            }
        })
    }

    dodajVreme = (req: express.Request, res: express.Response) =>{
        let name = req.body.name;
        let vreme = req.body.vreme;

        Lokacija.findOne({'name': name, 'zauzeto': {$all: [vreme]}}, (err: any, news: any)=>{
            if(err) console.log(err);
            else {
                if(news){
                    res.status(200).json({'message': 'vreme postoji'});
                }
                else{
                    Lokacija.collection.updateOne({'name': name}, {$push: {'zauzeto': vreme}});
                    res.status(200).json({'message': 'vreme added'});
                }
            }
        })
    }
}