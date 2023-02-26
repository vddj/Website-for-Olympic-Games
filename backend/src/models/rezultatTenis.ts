import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RezultatTenis = new Schema(
    {
        id: {
            type: Number
        },
        pol: {
            type: String
        },
        format: {
            type: Number
        },
        ekipe8: {
            type: Array
        },
        ekipe4: {
            type: Array
        },
        ekipe3: {
            type: Array
        },
        ekipe2: {
            type: Array
        },
        ekipe1: {
            type: Array
        },
        ekipe123: {
            type: Array
        },
        f_8: {
            type: Array
        },
        f_4: {
            type: Array
        },
        f_3: {
            type: Array
        },
        f_2: {
            type: Array
        },
        f_1: {
            type: Array
        },
        zavrseno8: {
            type: Number
        },
        zavrseno4: {
            type: Number
        },
        zavrseno3: {
            type: Number
        },
        zavrseno2: {
            type: Number
        },
        zavrseno1: {
            type: Number
        },
        brTakmicara: {
            type: Number
        }
    }
);

export default mongoose.model('RezultatTenis', RezultatTenis, 'rezultatTenis');