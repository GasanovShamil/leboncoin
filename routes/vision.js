var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var vision = require('@google-cloud/vision');
var client = new vision.ImageAnnotatorClient();
var uploadedFile;
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/upload_image', function (req, res) {
    var photos = [];
    var form = new formidable.IncomingForm();

    // Tells formidable that there will be multiple files sent.
    form.multiples = true;
    // Upload directory for the images
    form.uploadDir = path.join(__dirname, 'tmp_uploads');

    // Invoked when a file has finished uploading.
    form.on('file', function (name, file) {
        uploadedFileName = file.name;
        // Allow only 3 files to be uploaded.
        if (photos.length === 3) {
            fs.unlink(file.path);
            return true;
        }

        var buffer = null,
            type = null,
            filename = '';

        // Read a chunk of the file.
        buffer = readChunk.sync(file.path, 0, 262);
        // Get the file type using the buffer read using read-chunk
        type = fileType(buffer);

        // Check the file type, must be either png,jpg or jpeg
        if (type !== null ) {
            // Assign new file name
            filename = file.name;

            // Move the file with the new file name
            fs.rename(file.path, path.join(__dirname, 'uploads/' + filename));

            // Add to the list of photos
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'uploads/' + filename
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path);
        }
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);
    });

    // Invoked when all the fields have been processed.
    form.on('end', function() {
        console.log(uploadedFileName);
        console.log('All the request fields have been processed.');
        client
            .labelDetection('routes/uploads/'+ uploadedFileName)
            .then(results => {
                const labels = results[0].labelAnnotations; 
				console.log('Labels:');
				for(var i=0; i<3; i++) 
				{
					console.log(labels[i].description); 
					if((labels[i].description === "laptop") || (labels[i].description === "netbook"))
					{
						 res.status(200).json({"category": "IT"});
						 i = 3;
					}
					if((labels[i].description === "mobile phone") || (labels[i].description === "communication device"))
					{
						 res.status(200).json({"category":"Smartphone"});
						 i = 3;
					}
						 
				}
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    });

    // Parse the incoming form fields.
    form.parse(req, function (err, fields, files) {
       
    });
});

module.exports = router;


