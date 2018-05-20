import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

const Schema = mongoose.Schema;


const schema = new mongoose.Schema({
    postRef: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    countLike: {type: Number, default: 0}
});



module.exports = mongoose.model('PostLikes', schema);