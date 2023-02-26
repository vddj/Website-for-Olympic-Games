import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Disciplina = new Schema(
    {
        naziv: {
            type: String
        },
        vrsta: {
            type: String
        },
        min_igraca: {
            type: String
        },
        max_igraca: {
            type: String
        }
    }
);

export default mongoose.model('Disciplina', Disciplina, 'disciplina');
