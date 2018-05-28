import {isUserLoggedIn} from "./auth.router";
import Post from '../models/post.model';
import PostUserFeed from '../models/post_user_feed.model';


const router = (app) => {

    /**
     * Render new post form
     */
    app.get('/post', isUserLoggedIn, (req, res) => {
        Post.find({userRef: req.user.id}).exec((err, posts) => {
            res.render('post/post-page', {
                title: 'Past',
                user: req.user,
                posts: posts,
                currentPage: "post",
                errorMessage: req.flash('postErrorMessage'),
                successMessage: req.flash('postSuccessMessage')
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

        // create new post
        let post = new Post({
            title, subtitle, body, userRef: req.user.id
        });

        // create feed for the post
        let postUserFeed = new PostUserFeed({
            postRef: post.id,
            userRef: post.userRef
        });

        // add the reference of postUserFeed to the new post model
        post.postUserFeedRef = postUserFeed;
        post.save((err, result) => {
            if(err){
                console.log('Err post/new');
                console.log('Err:', err);
                req.flash("postErrorMessage", "Post was not created.");
                res.redirect('new')
            } else {
                postUserFeed.save((err, p) => {
                    console.log('Else post/new');
                    req.flash("postSuccessMessage", "Post created successfully");
                    res.redirect('/post');
                });
            }
        });
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
    app.post('/post/edit-post/:slug', (req, res) => {
        Post.findOneAndUpdate({slug: req.curReqPost.slug}, {
            $set: {
                title: req.body.title,
                subtitle: req.body.subtitle,
                body: req.body.body,
            }
        }, (err, updatePost) => {
            res.redirect('/post/show-post/'+updatePost.slug);
        });
    });

    app.get('/post/delete-post/:slug', (req, res) => {
       Post.deleteOne({slug: req.curReqPost.slug}, (err) => {
           if (err){
               req.flash("postErrorMessage", "Post was not deleted");
               res.redirect('/post');
           } else {
               req.flash("postSuccessMessage", "Post deleted successfully");
               res.redirect('/post');
           }
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
