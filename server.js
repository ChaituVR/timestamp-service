
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var resultTime = function(unix,natural){

  this.unix=unix;
  this.natural=natural;
};

var getTimeFromOb= function (timeObj){
  var months =[ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

  var month=months[timeObj.getMonth()];
  var day = timeObj.getDate();
  var year = timeObj.getFullYear();
  if(isNaN(year)){
    return null;
  }
  else{
    return  month +" "+day+", "+year;
  }


}
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/now', function (req, res) {
  // 
  var a=new Date();
  var time=Math.floor(a.getTime() / 1000)

  var sendTime=new resultTime(time,getTimeFromOb(a));
  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(sendTime));
  

});

app.get('/:time', function (req, res) {
 
  var timeFromUrl=Number(req.params.time);
  var a=new Date(timeFromUrl*1000);
  //a.setSeconds();
  if(!timeFromUrl){
    a=new Date(req.params.time);
    var time=Math.floor(a.getTime() / 1000);
    var sendTime=new resultTime(time,getTimeFromOb(a));
  }
  else {
      var sendTime=new resultTime(timeFromUrl,getTimeFromOb(a));
  }


  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(sendTime));
  

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
