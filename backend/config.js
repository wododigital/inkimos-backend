const host="localhost";
const database="inkimos";
const user="wododigital";
const password="Wodo@123";
const jwt_secret="92154578f53f8c1a8a3a8d2288ff7ade258e5e45ebf837458652f03adf48db7c";
const url=['http://localhost:5173', 'http://localhost:3000'];
const live=['http://localhost:5173'];
const media_url = 'http://localhost:3004';

// const email_user = "invengersolutions@gmail.com";
// const email_pass = "NewValley45$";  
const email_user = "invengersolutions@gmail.com";
const email_pass = "lxsj rghc nluq rreh";  


const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

function getCurrentDateTimeString() {
    const date = new Date();
    return date.getFullYear() + '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0') + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0');
}

const getInquiryTemplate = (inquiryData) => {
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceRequested,
      customerMessage
    } = inquiryData;
  
    // Read the HTML template file
    const fs = require('fs');
    const path = require('path');
    let template = fs.readFileSync(
      path.join(__dirname, './mail-templates/inquiry.html'),
      'utf8'
    );
  
    // Replace placeholders with actual data
    template = template
      .replace('${customerName}', customerName || 'N/A')
      .replace('${customerEmail}', customerEmail || 'N/A')
      .replace('${customerPhone}', customerPhone || 'N/A')
      .replace('${serviceRequested}', serviceRequested || 'N/A')
      .replace('${customerMessage}', customerMessage || 'N/A')
      .replace('${year}', new Date().getFullYear());
  
    return {
      subject: "New Service Inquiry Received",
      html: template
    };
};

const getCareerTemplate = (careerData) => {
    const {
        applicantName,
        applicantEmail,
        appliedPosition,
        resumeName,
        resumeLink
    } = careerData; 

    const fs = require('fs');
    const path = require('path');
    let template = fs.readFileSync(
      path.join(__dirname, './mail-templates/career.html'),
      'utf8'
    );

    template = template
      .replace('${applicantName}', applicantName || 'N/A')
      .replace('${applicantEmail}', applicantEmail || 'N/A')
      .replace('${appliedPosition}', appliedPosition || 'N/A')
      .replace('${resumeName}', resumeName || 'N/A')
      .replace('${resumeLink}', resumeLink || 'N/A')  
      .replace('${year}', new Date().getFullYear());      

    return {
        subject: "New Career Application Submitted",
        html: template
    };
}   


module.exports = {
    host,
    database,
    user,
    password,
    jwt_secret,
    url,
    live,
    authenticateToken,
    getCurrentDateTimeString,
    email_user,
    email_pass,
    getInquiryTemplate,
    getCareerTemplate,
    media_url
};