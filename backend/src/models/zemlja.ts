import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zemlja = new Schema(
    {
        id: {
            type: String
        },
        ime: {
            type: String
        },
        rang: {
            type: Number
        },
        br_zlato: {
            type: Number
        },
        br_srebro: {
            type: Number
        },
        br_bronza: {
            type: Number
        },
        br_ukupno: {
            type: Number
        },
        br_sportista: {
            type: Number
        },
        vodja: {
            type: String
        }
    }
);

export default mongoose.model('Zemlja', Zemlja, 'zemlja');