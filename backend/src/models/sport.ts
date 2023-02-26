import mongoose from 'mongoose';
import Disciplina from '../models/disciplina'

const Schema = mongoose.Schema;

let Sport = new Schema(
    {
        sport: {
            type: String
        },
        discipline: {
            type: Array
        }
    }
);

export default mongoose.model('Sport', Sport, 'sport1');