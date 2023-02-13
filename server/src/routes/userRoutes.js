import express from 'express';
import login from '../controllers/auth/login.js';
import logout from '../controllers/auth/logout.js';
import refresh from '../controllers/auth/refresh.js';
import register from '../controllers/auth/register.js';

import userController from '../controllers/user/userController.js';

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.post('/signup', register);
router.post('/login', login);
router.get('/refresh', refresh);
router.get('/logout', logout);

export default router;
