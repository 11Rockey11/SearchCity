const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const City = require('./model/city');
const dbURI = 'mongodb+srv://dbpassword:project1@cluster0.xbxcn.mongodb.net/yourDbName?retryWrites=true&w=majority';

//invoking express app;
const app = express();


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    City.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { city: result, title: 'Search~City' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/addcity',(req,res)=>{
    res.render('addcity',{title:'Add~City'});
});

app.get('/aboutus',(req,res)=>{
    res.render('about',{title:'About~Us'});
});

app.get('/search',(req,res)=>{
    const name = req.query.cityname;
    console.log(name);
    City.find({name:name})
    .then(result => {
      res.render('index', { city: result, title: 'Search~City' ,name:name});
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/:id',(req,res)=>{
    var id = req.params.id;
    City.findById(id)
      .then(result => {
        res.render('details', { city: result, title: 'About City' });
      })
      .catch(err => {
        console.log(err);
      });
})

app.post('/addcity', (req, res) => {
    // console.log(req.body);
    const city = new City(req.body);
    city.save()
      .then(result => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  });

app.use((req,res)=>{
    res.render('404',{title:'Error'});
})
