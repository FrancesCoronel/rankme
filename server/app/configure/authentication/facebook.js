'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function(app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL
    };


    var verifyCallback = function(accessToken, refreshToken, profile, done) {
        var firstName = profile.displayName.split(" ")[0]
        var lastName = profile.displayName.split(" ")[2] || profile.displayName.split(" ")[1]
        var email = firstName + lastName + "@fakeemail.com" // email not sent through passport, so making fake email address

        UserModel.findOne({
                'facebook.id': profile.id
            }).exec()
            .then(function(user) {
                // login with facebook
                if (user) {
                    user.facebook.id = profile.id;
                    user.facebook.accessToken = accessToken;
                    user.facebook.refreshToken = refreshToken;
                    return user.save();
                } else {
                    // sign up with facebook
                    return UserModel.create({ 
                        name: { 
                            first: firstName, 
                            last: lastName
                        },
                        email: email,
                        facebook: {
                            id: profile.id,
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }
                    })
                }

            }).then(function(userToLogin) {
                done(null, userToLogin);
            }, function(err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            });

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            res.redirect('/');
        });

};
