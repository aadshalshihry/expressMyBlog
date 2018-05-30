import Post from '../models/post.model';
import PostUserFeed from '../models/post_user_feed.model';

const router = (app) => {
    /**
     * Render home page
     */
    app.get('/', function(req, res) {
        Post.find().populate('postUserFeedRef').sort('-updatedAt').exec((err, posts) => {
            console.log(posts);
            res.render('index', {
                title: '',
                user: req.user,
                posts: posts,
                currentPage: "home"
            });
        });
    });
};

export default router;
