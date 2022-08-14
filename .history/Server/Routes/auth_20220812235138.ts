import express from 'express';
const router = express.Router();

//import the controller module
import {ProcessLogoutPage, ProcessLoginPage, ProcessRegisterPage} from "../Controllers/auth"


/* Process Login page. */
router.post('/login', ProcessLoginPage);

/* Process Register page. */
router.post('/register', ProcessRegisterPage);

router.get('/edit/:id', ProcessEditPage)

router.post('/edit/:id', Process)

/* Process Logout page. */
router.get('/logout', ProcessLogoutPage);

export default router;

