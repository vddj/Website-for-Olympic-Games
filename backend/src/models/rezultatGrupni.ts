import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RezultatGrupni = new Schema(
    {
        id: {
            type: Number
        },
        sport: {
            type: String
        },
        pol: {
            type: String
        },
        format: {
            type: Number
        },
        ekipe: {
            type: Array
        },
        grupaA: {
            type: Array
        },
        grupaB: {
            type: Array
        },
        prosliA: {
            type: Array
        },
        prosliB: {
            type: Array
        },
        f_4: {
            type: Array
        },
        prosliCetvrt: {
            type: Array
        },
        f_2: {
            type: Array
        },
        prosliPola: {
            type: Array
        },
        f: {
            type: Array
        },
        zavrsenoA: {
            type: Number
        },
        zavrsenoB: {
            type: Number
        },
        zavrseno4: {
            type: Number
        },
        zavrseno2: {
            type: Number
        },
        zavrseno1: {
            type: Number
        },
        mecZaTrece:{
            type: Array
        }
    }
);

export default mongoose.model('RezultatGrupni', RezultatGrupni, 'rezultatGrupni');