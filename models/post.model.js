import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String},
    body: {type: String, required: true},
    rate: {type: Number, default: 0.0},
    postUserFeedRef: {
        type: Schema.Types.ObjectId,
        ref: "PostUserFeed"
    },
    userRef: {type: Schema.Types.ObjectId, ref: "User", required: true},
    images: [],
    comments: [],

    slug: {type: String, required: true, unique: true}
}, {timestamps: true});



schema.plugin(URLSlugs('title', {field: 'slug'}));
export default mongoose.model('Post', schema);