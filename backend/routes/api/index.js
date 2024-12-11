const express=require("express");
const router =express.Router();
const db = require('../../connection');

router.get('/get-applications', async (req, res) => {
    try {
        const getQuery="SELECT job_title, description, job_code, overview, job_category FROM jobs WHERE job_status ='open' ORDER BY created_on DESC";
        const results=await new Promise((resolve, reject)=>{
            db.query(getQuery, (err, results)=>{
                if(err){
                    return reject(err);
                }

                resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).send({ status: 'error', message: 'No open jobs found' });
        }
          
        return res.status(200).send({ status: 'success', data: results });
    } catch (error) {
        console.error(error);   
    }
});

router.get('/job-details/:id', async (req, res) => {
    const { id }= req.params;
    try {
        console.log()
        const getQuery="SELECT job_title, overview, job_category FROM jobs WHERE job_code = ?";
        const results=await new Promise((resolve, reject)=>{
            db.query(getQuery, [id], (err, results)=>{
                if(err){
                    return reject(err);
                }

                resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(200).send({ status: 'error', message: 'No open jobs found' });
        }
          
        return res.status(200).send({ status: 'success', data: results });
    } catch (error) {
        console.error(error);   
    }
});


module.exports=router;