import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Ekipa = new Schema(
    {
        zemlja: {
            type: String
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
        brojPobeda: {
            type: Number
        },
        igraci: {
            type: Array
        }
    }
);

export default mongoose.model('Ekipa', Ekipa, 'ekipa');