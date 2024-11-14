const express=require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router =express.Router();
const db = require('../../connection');
const { jwt_secret, getCurrentDateTimeString, authenticateToken }=require('../../config');

const SECRET_KEY = jwt_secret;

router.post('/login',
    [
        // Input validation
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ]
,async(req,res)=>{
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }

        //console.log(req.body);
        const { email, password } = req.body;

        // Find user in the database
        const userQuery = 'SELECT * FROM admin_users WHERE email = ?';
        const results = await new Promise((resolve, reject) => {
            db.query(userQuery, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(200).json({ status: 'error', message: 'Invalid credentials' });
        }

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(200).json({ status: 'error', message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '10h' });

        res.cookie('token', token, {
            httpOnly: true, 
            secure:false,  // Set to true if using HTTPS
            sameSite: 'Lax',  // Allows cookies only in the same site
            maxAge: 10 * 60 * 60 * 1000 
        });

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully'
        });

    } catch (error) {
        console.error(error);
    }
});


router.get('/add-user',async(req,res)=>{
    try {
        const name="Wodo";
        const email='hello@wodo.digital';
        const password='Wodo@123';
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery='INSERT INTO admin_users(name, email, password, created_on, last_logged_in) VALUES(?, ?, ?, ?, ?)';
        const values=[name, email, hashedPassword, getCurrentDateTimeString(), ''];
        await new Promise((resolve,reject)=>{
            db.query(insertQuery,values,(err)=>{
                if (err) return reject(err);
                resolve();
            })
        })
        res.status(201).send({ status: 'success', message: 'User added successfully' });
        
    } catch (error) {
        console.error(error);
    }
})

router.get('/get-user',async(req,res)=>{
    try {
     
        const insertQuery='SELECT * FROM admin_users';
        const results=await new Promise((resolve,reject)=>{
            db.query(insertQuery,(err,results)=>{
                if (err) return reject(err);
                resolve(results);
            })
        })
        res.status(201).send({ status: 'success', message: 'User added successfully', data : results });
        
    } catch (error) {
        console.error(error);
    }
})



// Check if the user is authenticated by verifying the token in the cookie
router.get('/auth/check', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(200).json({ authenticated: false });

    // Verify token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(200).json({ authenticated: false });
        res.status(200).json({ authenticated: true });
    });
});

router.post('/logout', authenticateToken, (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS in production
        sameSite: 'Lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
});




module.exports=router;