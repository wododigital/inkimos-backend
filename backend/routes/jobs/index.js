const express=require("express");
const router =express.Router();
const db = require('../../connection');
const { authenticateToken, getCurrentDateTimeString }=require('../../config');

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomCode = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters[randomIndex];
    }
    
    return randomCode;
}

function checkCode(code) {
    return new Promise((resolve, reject) => {
        const check = "SELECT * FROM jobs WHERE job_code = ?";
        const val = [code];
        db.query(check, val, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
}

function generateUniqueCode() {
    let code = generateRandomCode();
    let results = checkCode(code);

    // If the code already exists in the database, generate a new one
    while (results.length > 0) {
        code = generateRandomCode();
        results = checkCode(code);
    }

    return code;
}


router.post('/add-job', authenticateToken, async (req, res) => {
    try {
      const { jobTitle, jobCategory, jobStatus, jobDescription, jobOverview } =req.body;
      let code=generateUniqueCode();

      const insertQuery="INSERT INTO jobs(job_title, job_category, overview, job_status, description, job_code, created_on) VALUES( ?, ?, ?, ?, ?, ?, ?)";
      const values=[ jobTitle, jobCategory, jobOverview, jobStatus, jobDescription, code, getCurrentDateTimeString()];

      await new Promise((resolve, reject)=>{
        db.query(insertQuery, values, (err, results)=>{
            if(err){
                return reject(err);
            }
            resolve(results);
        });
      });
      res.status(200).send({status :'success', message : 'Job inserted successfully'});

    } catch (error) {
        console.error(error);
    }
});

router.post('/get-jobs', authenticateToken, async (req, res) => {
    try {
        const { date } = req.body;

        // Single query with JOIN and COUNT
        const getQuery = `
            SELECT 
                jobs.*, 
                COUNT(careers.role) AS num_of_applications
            FROM 
                jobs
            LEFT JOIN 
                careers 
            ON 
                jobs.job_code = careers.role
            WHERE 
                DATE_FORMAT(jobs.created_on, "%Y-%m") = ?
            GROUP BY 
                jobs.job_code
            ORDER BY 
                jobs.created_on DESC;
        `;

        const jobsResults = await new Promise((resolve, reject) => {
            db.query(getQuery, [date], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        // Send response
        res.status(200).send(jobsResults);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching jobs.' });
    }
});


router.get('/edit-job/:id', authenticateToken, async (req, res) => {
    try {
        const { id }=req.params;
        const getQuery="SELECT * FROM jobs WHERE job_code = ?";
        const results=await new Promise((resolve, reject)=>{
            db.query(getQuery, [id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            })
        }) ;

        res.status(200).send({status :"success" , data : results});
    } catch (error) {
        console.error(error);
    }
});

router.post('/update-job', authenticateToken, async (req, res) => {
    try {
     console.log(req.body);
      const { jobTitle, jobCategory, jobStatus, jobDescription, jobId, jobOverview } =req.body;
      const insertQuery="UPDATE jobs SET job_title = ?, job_category = ?,  job_status = ?, description =?, overview = ? WHERE id = ?";
      const values=[ jobTitle, jobCategory, jobStatus, jobDescription, jobOverview, jobId];

      await new Promise((resolve, reject)=>{
        db.query(insertQuery, values, (err, results)=>{
            if(err){
                return reject(err);
            }
            console.log('Query Results:', results);

            // Check if any rows were affected
            if (results.affectedRows === 0) {
                return reject(new Error('No job found with the given ID'));
            }
            resolve(results);
        });
      });
      res.status(200).send({status :'success', message : 'Job updated successfully'});

    } catch (error) {
        console.error(error);
    }
});


module.exports=router;