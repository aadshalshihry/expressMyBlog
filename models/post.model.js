import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

const Schema = mongoose.Schema;
// import {slugify} from "../utils";

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String},
    body: {type: String, required: true},
    rate: {type: Number, default: 0},
    images: [],
    comments: [],
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    slug: {type: String, required: true, unique: true}
}, {timestamps: true});

schema.plugin(URLSlugs('title', {field: 'slug'}));
module.exports = mongoose.model('Post', schema);