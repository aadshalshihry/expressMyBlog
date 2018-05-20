import Post from '../models/post.model';

const router = (app) => {
    /**
     * Render home page
     */
    app.get('/', function(req, res) {
        Post.find({}).sort('-updatedAt').exec((err, posts) => {
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
