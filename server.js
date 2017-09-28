// server.js
// where your node app starts

let express = require('express');
let multer = require('multer') //required for parsing the file upload form
let fs = require('fs')

let app = express();
let upload = multer({ dest: 'uploads/' }) // must set a file upload directory

app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//note .post for forms, also the upload.single filename must match the input type name and the the fileupload route must match the form "action" attribute
app.post('/fileupload', upload.single('filetoupload'),function (req, res) {
 if(!req.file){//in case no file uploaded and submit button clicked send null
   res.end(JSON.stringify({name:null,size:null}))
   return;
 }
 fs.unlink(req.file.path,function(err,d){//deletes file once info is captured (works synchronously too)
   if (err){res.end("Error deleting File")}
   res.end(JSON.stringify({name:req.file.originalname,size:req.file.size}))
 })
})

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
