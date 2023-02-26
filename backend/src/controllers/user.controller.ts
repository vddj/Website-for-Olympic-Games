import express from 'express';
import User from '../models/user';

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username': username, 'password': password},
            (err: any, user: any)=>{
                if(err) console.log("bezveze");
                else res.json(user);
            })
    }
    
    registerleader = (req: express.Request, res: express.Response)=>{
        let user = new User(req.body);
        let username = req.body.username;
        let zemlja = req.body.nacionalnost;
        let type = req.body.type;

        User.findOne({'username': username}, (err: any, u: any)=>{
            if(err) console.log("bezveze");
            else {
                if(u){
                    res.status(201).json({'message': 'korisnik postoji'});
                }
                else {
                    if(type == 3){
                        User.findOne({'nacionalnost': zemlja, 'type': type}, (err: any, us: any)=>{
                            if(err) console.log("bezveze");
                            else {
                                if(us){
                                    res.status(202).json({'message': 'vodja postoji'});
                                }
                                else {
                                    user.save().then(()=>{
                                        res.status(203).json({'message': 'user added'});
                                    }).catch((err: any)=>{
                                        res.status(204).json({'message': err});
                                    })
                                }
                            }
                        })
                    }
                    else {
                        user.save().then(()=>{
                            res.status(203).json({'message': 'user added'});
                        }).catch((err: any)=>{
                            res.status(204).json({'message': err});
                        })
                    }
                }
            }
        })
    }

    dohvatiDelegate = (req: express.Request, res: express.Response) =>{
        let type: Number = 2;
        User.find({'type': type}, (err, users)=>{
            if(err) console.log(err);
            else {
                res.json(users);
            }
        })
    }

    dohvatiNeprihvacene = (req: express.Request, res: express.Response) =>{
        
        User.find({'odobrenje': 0}, (err, users)=>{
            if(err) console.log(err);
            else {
                res.json(users);
            }
        })
    }

    prihvatiZahtev = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOne({'username': username}, (err: any, user: any)=>{
            if(err) console.log(err);
            else{
                if(user){
                    User.collection.updateOne({'username': username}, {$set: {"odobrenje": 1}});
                    res.status(200).json({'message': 'user changed'});
                }
                else {
                    res.json({'message': 'not found'});
                }
            }
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
        let nova = req.body.nova;

        User.findOne({'username': username, 'password': lozinka}, (err: any, user: any)=>{
            if(err) console.log(err);
            else{
                if(user){
                    User.collection.updateOne({'username': username}, {$set: {"password": nova}});
                    res.status(200).json({'message': 'user changed'});
                }
                else {
                    res.json({'message': 'not found'});
                }
            }
        })
    }

}
