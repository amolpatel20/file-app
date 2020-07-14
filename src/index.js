const path = require('path')
const express = require('express')
const fs = require('fs')
const bcrypt = require('bcrypt')
const readline = require('readline');
const router = new express.Router;

var bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/readFile', (req, res) => {
    if (req.body) {
        var searchTxt = req.body.searchText;
        processLineByLine(searchTxt).then((result)=>{
            res.send(result);
        }).catch((error)=>{
            res.send(error)
        });
        
    }
})

processLineByLine = async (searchTxt) => {
    const fileStream = fs.createReadStream('./demo.txt', {flags: 'r'});
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      if(line.includes(searchTxt)){
        return line;
      }
    }
  }
app.listen(port, () => {
    console.log('Server is up on port:', port);
})