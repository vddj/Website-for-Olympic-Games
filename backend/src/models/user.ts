import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        nacionalnost: {
            type: String
        },
        mail: {
            type: String
        },
        type: {
            type: Number
        },
        odobrenje: {
            type: Number
        }
    }
);

export default mongoose.model('User', User, 'user');