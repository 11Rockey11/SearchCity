const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const City = require('./model/city');
<<<<<<< HEAD
const Image = require('./model/image');
const Login = require('./model/logins');
const multer = require('multer');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
var ObjectId = mongoose.Types.ObjectId();
const dbURI = 'mongodb+srv://bharath:project1@cluster0.xbxcn.mongodb.net/project1?retryWrites=true&w=majority';
=======
const dbURI = 'mongodb+srv://dbpassword:project1@cluster0.xbxcn.mongodb.net/yourDbName?retryWrites=true&w=majority';
>>>>>>> a8adcb5beceb80835e6d15a34e6fadc9adb756cd

//invoking express app;
const app = express();


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());


//For processin image
const storage = multer.diskStorage({
  //destination for files
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },

  //add back the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 100,
  },
});


app.get('/',(req,res)=>{
    City.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { city: result,image:Image,title: 'Search~City' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/login',(req,res)=>{
  res.render('login',{title:'Login~City'});
})
app.get('/addcity',(req,res)=>{
    res.render('addcity',{title:'Add~City'});
});
app.get('/maps',(req,res)=>{
  res.render('map');
});

app.get('/aboutus',(req,res)=>{
    res.render('about',{title:'About~Us'});
});

app.get('/search',(req,res)=>{
    const name = req.query.cityname;
    console.log(name);
    City.find({name:new RegExp('^' +name + '$', 'i')})
    .then(result => {
      res.render('index', { city: result, title: 'Search~City' ,name:name});
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/mat/:id',(req,res)=>{
    const dood = req.params.id;
    City.findById(dood)
      .then(result => {
        Image.findById(dood)
          .then(resulting =>{
            res.render('details', { city: result,image:resulting,title: 'About City' });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
});
app.post('/api/register',async (req,res)=>{
  //console.log(req.body.password);
  const username = req.body.username;
  const password =await bcrypt.hash(req.body.password,10)
  console.log(password);
  // try{
  //   const response = await Login.create({
  //     username,
  //     password
  //   })
  //   console.log("Sucessfully created the USER account ",response);
  //   res.redirect('/')
  // }catch(error)
  //   {
  //     console.log("ERROR");
  //   }
    const log = new Login({username:username,password:password})
    await log.save()
      .then(result => {
        res.json({ redirect: '/' });
      })    
      .catch(err =>{
        console.log("Error found");
      })
})
app.post('/addcity',upload.single('img'),async (req, res) => {
    const city = new City(req.body);
    city.save()
      .then(result => {
        const image = new Image({
          _id: result._id,
          img: req.file.filename,
        });
        image.save()
          .then(result=>{
            res.redirect('/');
            console.log("Added sucessfully");
          })
          .cathc(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
  app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    
    City.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.use((req,res)=>{
    res.render('404',{title:'Error'});
})
