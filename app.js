const bodyParser = require("body-parser");
const express = require("express");
const https=require("https");
const app=express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    
   res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
   
    const query= req.body.cityname;
    const appid="31119eac61cdf258af0c2cfa037a2b5b";
    const units="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
    https.get(url,function(response){
        // console.log(response);
        console.log(response.statusCode); //gives 200 if it is correct, 401 if unauthorized, 404 resource not found
        response.on("data",function(data){
            const weatherData=JSON.parse(data); //converts the binary code into json format.
            // console.log(weatherData);
    
            // ex:
            // const object={
            //     name:"adnan",
            //     food:"biriyani"
            // }
            // console.log(JSON.stringify(object));
            /*below is used to take a part of info. from the weatherData */
    
            // console.log(weatherData.main.temp);
            const temp=weatherData.main.temp;
            const weatherDes=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            // https://openweathermap.org/weather-conditions
            const URL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+query+" is "+ temp+" degree celcius</h1>");
            res.write("Weather Description: "+ weatherDes);
            res.write("<br><img src="+URL+">");
            res.send();
            //we can only one send, but we can have many write. After using write just call the function send
    
        })
    });
    
    // res.send("server runs");
    
})


app.listen(3000,function(){
    console.log("Server is running...");
})