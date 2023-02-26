import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Lokacija = new Schema(
    {
        name: {
            type: String
        },
        zauzeto: {
            type: Array
        }

    }
);

export default mongoose.model('Lokacija', Lokacija, 'lokacija');