// server.js
// where your node app starts

let express = require('express');
let multer = require('multer') //required for parsing the file upload form
let fs = require('fs')

let app = express();
let upload = multer() // actually after reading docs the arguments to multer are optiona, and for this project I don't really need a directory as I am only outputing file info (example srgument for directory { dest: 'uploads/' })

app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//note .post for forms, also the upload.single filename must match the input type name and the the fileupload route must match the form "action" attribute
app.post('/fileupload', upload.single('filetoupload'),function (req, res) {
 //in case no file uploaded and submit button clicked send null otherwise...
 return (!req.file) ? res.end(JSON.stringify({name:null,size:null})) : res.end(JSON.stringify({name:req.file.originalname,size:req.file.size}))
})

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
