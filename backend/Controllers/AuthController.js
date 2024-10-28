import passport from 'passport';

export const googleAuth = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

export const googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/dashboard',
        failureRedirect: 'http://localhost:3000'
    })(req, res, next);
};

export const loginSuccess = async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: 'User Login', user: req.user });
    } else {
        res.status(400).json({ message: 'Not Authorized' });
    }
};

export const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Handle logout error
        }
        // Optionally, you can also destroy the session
        req.session.destroy((err) => {
            if (err) {
                return next(err); // Handle session destruction error
            }
            // Redirect after successful logout
            res.status(200).json({
                msg: 'done'
            })
        });
    })
}