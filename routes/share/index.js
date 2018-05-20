import Post from "../../models/post.model";

export const getSortPost = (req, res, next, renderName) => {
    Post.find({}).exec((err, posts) => {
        res.render(renderName, {
            title: '',
            user: req.user,
            posts: posts,
            currentPage: "home"
        });
    });
};