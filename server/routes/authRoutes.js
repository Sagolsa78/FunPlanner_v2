import {Router} from 'express'
import { signup,login, checkAuth } from '../controllers/authController.js';
import passport from 'passport';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}))

router.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:   "https://fun-planner-v2-agxf80um1-omguptatech-gmailcoms-projects.vercel.app",
        failureRedirect:'/login-failure'}),
)

router.get('/login-failure', (req, res) => {
  res.send('Login failed');
});
router.get('/check', isAuthenticated, checkAuth)

export default router;