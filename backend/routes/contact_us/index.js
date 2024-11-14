const express=require("express");
const router =express.Router();
const db = require('../../connection');
const multer = require('multer');
const upload = multer();
const { authenticateToken, getCurrentDateTimeString }=require('../../config');

router.post('/contact-us', upload.none(), async (req, res) => {
    try {
        const { name, phone, email, industry, details } =req.body;

        const insertQuery='INSERT INTO contact_us(name, contact_num, email, industry, request_details, status, created_on) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
        const values =[ name, phone, email, industry, details, 'pending', getCurrentDateTimeString()];
        const results = await new Promise((resolve, reject)=>{
            db.query( insertQuery, values, (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
        if(!results){
            res.status(200).send({ status : "error"});
        }
        res.status(200).send({ status : "success", message : 'Contact form submitted successfully! '});
    } catch (error) {
        console.error(error);
        res.status(500).send({ status : "error", message : error })
    }
});

router.post('/inquries', authenticateToken, async (req, res) => {
    try {
        const { date } =req.body;
        const getQuery='SELECT * FROM contact_us WHERE DATE_FORMAT(created_on, "%Y-%m") = ?   ORDER BY created_on DESC';
        const values=[date]; 
        const results=await new Promise((resolve, reject)=>{
            db.query(getQuery, values, (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            })
        });

        res.status(200).send(results);
    } catch (error) {
        console.log(error);
    }
});


router.put('/contact/status', authenticateToken, async (req, res) => {
    try {
        const { id, status} =req.body;
        const updateQuery='UPDATE contact_us SET status = ? WHERE id = ?';
        const values=[status, id];
        const results=await new Promise((resolve, reject)=>{
            db.query(updateQuery, values, (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            })
        }) ;
        res.status(200).send({status : "success", message : "Status updated successfully;"}); 
    } catch (error) {
        console.log(error);
    }
})

module.exports=router;