import {isUserLoggedIn} from "./auth.router";
import User from '../models/user.model';
const router = (app) => {
    /**
     * Render profile page
     */
    app.get('/profile', isUserLoggedIn, (req, res) => {

        res.render('user/profile', {
            title: 'Profile',
            user: req.user,
            currentPage: "profile",
            errorMessage: req.flash('profileErrorMessage'),
            successMessage: req.flash('profileSuccessMessage')
        });
    });

    /**
     * Render user/edit
     */
    app.get('/profile/user/edit', isUserLoggedIn, (req, res) => {
        res.render('user/profile-edit-user', {
            title: 'Update User',
            user: req.user,
            currentPage: "edit-user",
            errorMessage: req.flash('profileErrorMessage')
        });
    });

    /**
     * Edit user profile
     */
    app.post('/user/edit', isUserLoggedIn, (req, res) => {
        const {name, username, email, oldPassword, newPassword, confirmPassword} = req.body;
        if (newPassword !== confirmPassword){
            req.flash("profileErrorMessage", "New password and confirm password don't match");
            res.redirect('/profile/user/edit');
        } else {

            User.findById(req.user.id, (err, user) => {
                if(oldPassword && !user.isValidPassword(oldPassword)) {
                    req.flash("profileErrorMessage", "Old password isn't correct");
                    res.redirect('/profile/user/edit');
                } else {
                    if(oldPassword && newPassword){
                        user.setPassword(newPassword);
                    }
                    user.name = name;
                    user.username = username;
                    user.email = email;
                    user.save((err, updatedUser) => {
                        req.flash("profileSuccessMessage", "Your profile updated.");
                        res.redirect('/profile');
                    });
                }
            });
        }
    });
};


export default router;
