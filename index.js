const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const {check, validationResult}  = require('express-validator');

const port = 3000;
let urlEncoded = bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());
app.use(urlEncoded);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname + '/index.html'));
});

// app.post('/formData', (req,res) => {
//    // console.log(req.body);
// })

app.post('/formData', [
   // this was for name
      check('name')
      .not().isEmpty().withMessage('name cant be empty')
      .isLength({
         min: 3
      }).withMessage('name has to be atleast 3 chars')
      .isAlpha().withMessage('name cant contain num or special characters'),
      

      //checking email
     check('email', 'Email is not valid')
      .isEmail(),

      //check phone number
      check('phone1')
      .not().isEmpty().withMessage('phone no cant be empty')
      .isInt().withMessage('phone number must contain only numbers')
      .isLength({
         min: 3,
         max: 3
      }).withMessage('Area COde  must be 3 digit'),

      //check zipode
      check('ZIpCode')
      .not().isEmpty()
      .isInt()
      .isPostalCode('IN').withMessage('Isnot a valid india zip code'),

      //check radio 18+ or not!
      check('age').custom(age => {
         if(age !== "Yes" && age !== "No") {
            throw new Error('Invalid Age Data');
         }
         console.log(age);
         if(age=='No')
            throw new Error('You are not allowed');
         if(age=='Yes')
            return true;
      })

   ], (req,res) => {
      const errors = validationResult(req);

      //hereif anyone tampers the form
      if(req.body.age !== 'No' && req.body.age !== 'Yes' )
      {
         return res.status('422').json({
            errors: [{'msg': 'invalid data/ tampered'}]
         })
      }

      if(!errors.isEmpty())
      {
         return res.status(422).json({
            errors: errors.array()
         });
      }
      res.status(202).json({
         success: 'ok'
      })
})

app.listen(port, () => console.log('Server running'));
