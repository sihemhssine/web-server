const express = require('express'); 
var app= express(); 
const hbs = require('hbs'); 
const fs = require('fs'); 
hbs.registerPartials(__dirname+'/views/partials'); 
// key ; view engine , 
app.set('view engine', 'hbs');  
app.use(express.static(__dirname+'/public'));
app.use((req, res, next)=> {
    var now = new Date().toString(); 
 var log= `${now}: ${req.method}  ${req.url}`; 
    console.log(log);
    fs.appendFile('server.log', log +  '\n', (err)=>{
        console.log(err); 
    });  
next(); 

}); 
 
hbs.registerHelper('getCurrentYear', ()=>{
return new Date().getFullYear(); 
}); 


hbs.registerHelper('screamIt', (text)=>{ 
return text.toUpperCase(); 
})


//app.get( url,  function )
app.get('/', (req,res)=>{ 
//res.send('<h1>hello express</h1>!!');     
res.render('home.hbs', { 
    welcomeMessage : 'Hiiii welcoome bb ', 
    pageTitle: 'Weclome to my  website ', 
 }); 
});
app.get('/about', (req, res)=>{
res.render('about.hbs', { 
    pageTitle : 'ABout page ', 
 }); 
}); 
app.get('/bad', (req, res)=>{

    res.send( { 
        errorMessage : 'enable to connect'
    }); 
})

app.listen(2000, ()=> {
    console.log('server is in 2000 port')
}); 
