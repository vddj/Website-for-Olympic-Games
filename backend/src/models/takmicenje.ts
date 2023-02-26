import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Takmicenje = new Schema(
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
        pocetakDan: {
            type: String
        },
        pocetakMesec: {
            type: String
        },
        krajDan: {
            type: String
        },
        krajMesec: {
            type: String
        },
        lokacije: {
            type: Array
        },
        format: {
            type: Number
        },
        delegat: {
            type: String
        },
        vreme: {
            type: String
        },
        vremeDan: {
            type: String
        },
        vremeMesec: {
            type: String
        },
        lokacija: {
            type: String
        },
        sportisti:{
            type: Array
        },
        vremeG: {
            type: Array
        },
        danG: {
            type: Array
        },
        mesecG: {
            type: Array
        },
        lokacijaG: {
            type: Array
        },
        zavrseno: {
            type: Number
        }
    }
);

export default mongoose.model('Takmicenje', Takmicenje, 'takmicenje');