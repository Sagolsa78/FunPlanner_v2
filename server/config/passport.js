import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/tempUser.js";
import dotenv from 'dotenv'


dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },

        async(accessToken, refreshToken , profile , done)=>{
            try {
                const user = await User.findOne({googleId: profile.id});

                if(user){
                    return done(null,user)
                }

                const newUser = await User.create({
                    googleId:profile.id,
                    firstname : profile.displayName,
                    email:profile.emails[0].value,
                });

                 console.log('✅ Google Strategy User:', user);
                return done(null,newUser);
            } catch (error) {
                return done(error,false);
            }
        }
    )
)
passport.serializeUser((user,done)=>{
    console.log('Serializing User ' ,user)

    if (!user || !user.id) {
    console.error('Cannot serialize invalid user:', user);
    return done(new Error('Invalid user during serialization'), null);
  }
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const user= await User.findById(id);
    done(null,user)
})