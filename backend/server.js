import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy from 'passport-google-oauth2';
import { AuthRoutes } from './Routes/AuthRoutes.js';
import { UserModel } from './Models/UserModel.js';
import mongoose from 'mongoose';
import { CalendarRoutes } from './Routes/CalendarRoutes.js';

dotenv.config();

const app = express();

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Database connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(refreshToken);
                let user = await UserModel.findOne({ 'google_id': profile.id });

                if (!user) {
                    user = new UserModel({
                        'google_id': profile.id,
                        'name': profile.displayName,
                        'email': profile.emails[0].value,
                        'profile_Img': profile.photos[0].value
                    });

                    await user.save();
                }
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;

                return done(null, profile);
            } catch (error) {
                return done(error, null);
            }
        })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Use your auth routes
app.use('/', AuthRoutes);
app.use('/calendar', CalendarRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server started at localhost: ${process.env.PORT}`);
});
