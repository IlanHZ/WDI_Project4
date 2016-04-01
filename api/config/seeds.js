var mongoose = require('mongoose');
var Event = require('../models/Event');

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost/mappers';
mongoose.connect(databaseURL);


Event.collection.drop();


Event.create([{
  title: "Wat Phra Kaew visit",
  location: "Bangkok center",
  type: "temple",
  date: "",
  time: 14.00,
  description: "description",
  lat: 14.008696370634658,
  lng: 100.6787109375
},
{
  title: "Vientiane visit",
  location: "Vientiane center",
  type: "city",
  date: "",
  time: 14.00,
  description: "description",
  lat: 18.312810846425442,
  lng: 103.974609375
}], function(err, events){
    if(err) console.error(err);
    else console.log(events);
    mongoose.connection.close()
  });



