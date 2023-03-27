var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { urlmetadata, buffermetadata } = require("./modules/readxmp")
const { writemetadata } = require("./modules/writexmp.js")
const fileUpload = require('express-fileupload');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use the file-upload middleware
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Get image data from URL endpoint
app.post('/datafromurl', (req, res) => {
    const imageurl = req.body.imageurl;
    
    urlmetadata(imageurl).then(data => {
        res.status(200).send({ data: data });
    })
    .catch(err => {
        res.status(500).send({ error: err });
    })
});

app.post('/datafromimage', (req, res) => {

    const uploadedFile = req.files.image;
    const fileName = uploadedFile.tempFilePath;
    const fileBuffer = Buffer.from(fs.readFileSync(fileName).toString('hex'), 'hex');
    
    buffermetadata(fileBuffer).then(data => {
        res.status(200).send({ data: data });
    })
    .catch(err => {
        res.status(500).send({ error: err });
    })
});

app.post('/datatoimage', (req, res) => {

    const uploadedFile = req.files.image;
    //const fileBuffer = uploadedFile.data;
    const fileName = uploadedFile.tempFilePath;

    const datasupply = req.body.datasupply;
    const datavalue = req.body.datavalue;
    const dataname = req.body.dataname;
    
    writemetadata(fileName, datasupply, datavalue, dataname).then(data => {
        res.status(200).send({ data: "data:image/png;base64," + fs.readFileSync(fileName, 'base64') });
    })
    .catch(err => {
        res.status(500).send({ error: err });
    })
    

    
});

app.listen(5050, () => {
    console.log('Server running on port 5050');
  });