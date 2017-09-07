const express = require('express');
const hbs=require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

///red izvrsevanja


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err) {
      console.log('unabled with gary king');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res) => {
  //res.send('<h1>hello</h1>');
  // res.send(
  //   {
  //     name: 'ime',
  //     likes: ['biking',
  //   'city']
  //   }
  res.render('home.hbs',{
    pagetitle:'Home page',
    welcomeMessage: 'Hebote obo sljkata',
    currentYear: new Date().getFullYear()
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs', {
    pagetitle:'About page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    erorrMessage:'unable to handle'
  });
});

app.listen(port, ()=> {
  console.log(`server is up on ${port}`);
});
