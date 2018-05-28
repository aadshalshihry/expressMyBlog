import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    postRef: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    userRef: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    likeness: {
        type: String,
        enum: ['none', 'false', 'true'],
        default: 'none'
    },
    viewed: {
        type: Boolean,
        default: false
    }
});



export default mongoose.model('PostUserFeed', schema);