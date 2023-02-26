import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rezultat = new Schema(
    {
        id: {
            type: Number
        },
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        pol: {
            type: String
        },
        format: {
            typr: Number
        },
        ime: {
            type: String
        },
        mm : {
            type: Number
        },
        ss : {
            type: Number
        },
        tt : {
            type: Number
        },
        metar1 : {
            type: Number
        },
        centi1 : {
            type: Number
        },
        metar2 : {
            type: Number
        },
        centi2 : {
            type: Number
        },
        metar3 : {
            type: Number
        },
        centi3 : {
            type: Number
        },
        cc : {
            type: Number
        },
        krug : {
            type: Number
        },
    }
);

export default mongoose.model('Rezultat', Rezultat, 'rezultat');