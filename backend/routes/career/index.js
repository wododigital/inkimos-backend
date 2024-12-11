const express=require("express");
const fs = require('fs').promises; 
const path = require('path');
const router =express.Router();
const multer = require('multer');
const db = require('../../connection');
const { authenticateToken, getCurrentDateTimeString, getCareerTemplate, media_url }=require('../../config');
const { sendEmail } = require('../../mailer');

const sendInquiryEmail = async (name, email, position, resumeName, resumeLink, message, to) => {
    const template = getCareerTemplate({
      applicantName: name,
      applicantEmail: email,
      appliedPosition: position,
      resumeName: resumeName,
      resumeLink: resumeLink,
      details: message
    }); 
  
    await sendEmail(
      to, // to
      template.subject,
      template.html
    );
};

// Configure Multer storage settings
const storage =multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/msword', 'application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and Word documents are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

router.post( '/career',upload.fields([{ name: 'resume' }]), async (req, res) => {
    try {
        const { name, phone, email, role, url, details} =req.body;
        const insertQuery='INSERT INTO careers(full_name, contact_num, email, url, role, file_attachment, details, status, created_on) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const insertValues=[name, phone, email, url, role, '', details, 'pending', getCurrentDateTimeString()];
        const results=await new Promise((resolve, reject)=>{
            db.query(insertQuery, insertValues,(err, results)=>{
                if(err){
                    return reject(err);
                }
                resolve(results);
            });
        });
        const insertId = results.insertId;
        const files = req.files;
        if (files) {
            const uploadFolder = path.join('media', 'careers', String(insertId));
            try {
                await fs.mkdir(uploadFolder, { recursive: true }); // Ensure folder creation is awaited
            } catch (error) {
                console.error('Error creating folder:', error);
                return res.status(500).send({ status: 'error', message: 'Error creating folder' });
            }

            const fileWritePromises = [];
            if (files['resume']) {
                const resumeFile=files['resume'][0];
                const resumePath = path.join(uploadFolder, resumeFile.originalname);

                const writePromise = fs.writeFile(resumePath, resumeFile.buffer)
                    .catch(err => {
                        console.error('Error writing file file:', err);
                        throw new Error('Error uploading file');
                    });
                fileWritePromises.push(writePromise);
            }

            // Wait for all file uploads to complete
            try {
                await Promise.all(fileWritePromises);
            } catch (uploadError) {
                return res.status(500).send({ status: 'error', message: uploadError.message });
            }

            const updateQuery = 'UPDATE careers SET file_attachment = ? WHERE id = ?';
            const updateValues = [files['resume'][0].originalname, insertId];

            db.query(updateQuery, updateValues, async (dbErr) => {
                if (dbErr) {
                    return res.status(500).send({ status: 'error', message: 'Error saving file data to the database' });
                }

                const getRoleName = await new Promise((resolve, reject)=>{
                    db.query('SELECT job_title FROM jobs WHERE job_code = ?', [role], (err, results)=>{
                        resolve(results[0].job_title);
                    });
                });


                const resumeLink = `${media_url}/api/download/${insertId}/${files['resume'][0].originalname}`;
                await sendInquiryEmail(name, email, getRoleName, files['resume'][0].originalname, resumeLink, details, 'hr@inkimos.com');
                res.status(200).send({ status: 'success', message: 'Data added successfully' });
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/download/:id/:file', (req, res) => {
    const filePath = path.join('media', 'careers', req.params.id, req.params.file);
    res.download(filePath); 
});


router.post('/carees-list', authenticateToken, async (req, res) => {
    try {
        const { date } = req.body;
        const getQuery = `
            SELECT 
            careers.full_name, 
            careers.contact_num, 
            careers.email, 
            careers.url, 
            careers.file_attachment, 
            careers.status, 
            careers.created_on, 
            careers.id, 
            careers.details, 
            jobs.job_title as role 
            FROM careers 
                LEFT JOIN jobs 
            ON careers.role = jobs.job_code 
            WHERE DATE_FORMAT(careers.created_on, "%Y-%m") = ? 
                ORDER BY careers.created_on DESC
        `;
        const values = [date];
        const results = await new Promise((resolve, reject) => {
            db.query(getQuery, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        // Directly send the results as the response
        res.status(200).send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/download/:id/:file', authenticateToken, (req, res) => {
    const filePath = path.join('media', 'careers', req.params.id, req.params.file);
    res.download(filePath); 
});

router.put('/career/status', authenticateToken, async (req, res) => {
    try {
        const { id, status} =req.body;
        const updateQuery='UPDATE careers SET status = ? WHERE id = ?';
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