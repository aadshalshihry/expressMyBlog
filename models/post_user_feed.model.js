import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

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



module.exports = mongoose.model('PostUserFeed', schema);