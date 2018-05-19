import {isUserLoggedIn} from "./auth.router";
import Post from '../models/post.model';


const router = (app) => {

    /**
     * Render new post form
     */
    app.get('/post', isUserLoggedIn, (req, res) => {
        Post.find({user: req.user.id}).exec((err, posts) => {
            res.render('post/post-page', {
                title: 'Past',
                user: req.user,
                posts: posts,
                currentPage: "post",
                errorMessage: req.flash('postErrorMessage')
            });
        })
    });

    /**
     * Render new post form
     */
    app.get('/post/new', isUserLoggedIn, (req, res) => {

        res.render('post/new-post-form', {
            title: 'New Post',
            user: req.user,
            currentPage: "post",
            errorMessage: req.flash('postErrorMessage'),
            successMessage: req.flash('postSuccessMessage')
        });
    });

    /**
     * to create new post
     */
    app.post('/post/new', isUserLoggedIn, (req, res) => {
        const {title, subtitle, body} = req.body;
        let post = new Post;
        post.title = title;
        post.body = body;
        post.subtitle = subtitle;
        post.user = req.user.id;
        post.save((err, result) => {
            if(err){
                console.log('Err post/new');
                console.log('Err:', err);
                req.flash("postErrorMessage", "Post was not created.");
                res.redirect('new')
            } else {
                console.log('Else post/new');
                req.flash("postSuccessMessage", "Post created successfully");
                res.redirect('/post');
            }
        })
    });

    /**
     * Get one post by slug name
     */
    app.get('/post/show-post/:slug', (req, res) => {
        res.render('post/show-post', {
            title: 'Show Post',
            user: req.user,
            post: req.curReqPost,
            currentPage: "post",
            errorMessage: req.flash('postErrorMessage'),
            successMessage: req.flash('postSuccessMessage')
        });
    });

    /**
     * Render post edit page
     */
    app.get('/post/edit-post/:slug', (req, res) => {
        res.render('post/edit-post', {
            title: 'Edit Post',
            user: req.user,
            post: req.curReqPost,
            currentPage: "post",
            errorMessage: req.flash('postErrorMessage'),
            successMessage: req.flash('postSuccessMessage')
        });
    });

    /**
     * Post route for edit form
     */
    app.post('/post/edit-post', (req, res) => {
        console.log(req.post.slug);
        Post.findOneAndUpdate({slug: req.post.slug}, {
            title: req.body.title,
            subtitle: req.body.subtitle,
            body: req.body.body,
        }, (err, updatePost) => {
            res.redirect('/post/show-post/'+updatePost.slug);
        });
    });

    /**
     * slug middleware handling route
     */
    app.param('slug', (req, res, next, slug) => {
        Post.findOne({slug}, (err, post) => {
            if (err) return next(err);
            if (!post) return next(new Error('Can not found the post: '+ slug));
            req.curReqPost = post;
            next();
        })
    })

};

export default router;
