const express = require('express');
const router = express.Router();
const multer = require('multer');
const docxpdf = require('docx-pdf');
const path =require('path');

var storage = multer.diskStorage({
    diskStorage: function (req, file, cb) {
        cb(null, "../uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (err) {
        res.json(500).send("Internal Server Error");
    }
});

router.post('/docxtopdf', upload.single('file'), (req, res) => {
    
    let outputFilePath = 'pdf_output.pdf';
    docxpdf(req.file.path, outputFilePath, (err, resuult) => {
        if (err) {
            console.log('error', err);
        } else {
            res.download(outputFilePath);
        }
    });
});

module.exports = router;