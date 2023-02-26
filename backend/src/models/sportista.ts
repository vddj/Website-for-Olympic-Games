import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sportista = new Schema(
    {
        ime: {
            type: String
        },
        zemlja: {
            type: String
        },
        sport: {
            type: String
        },
        pol: {
            type: String
        },
        medalja: {
            type: String
        },
        discipline: {
            type: Array
        }
    }
);

export default mongoose.model('Sportista', Sportista, 'sportista');