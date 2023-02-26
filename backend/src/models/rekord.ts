import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rekord = new Schema(
    {
        godina: {
            type: String
        },
        mesto: {
            type: String
        },
        disciplina: {
            type: String
        },
        takmicar: {
            type: String
        },
        nacional: {
            type: String
        },
        rekord: {
            type: String
        }
    }
);

export default mongoose.model('Rekord', Rekord, 'rekord');