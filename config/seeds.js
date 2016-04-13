var mongoose = require('mongoose');
var Event = require('../models/Event');
// var User = require('../models/User');

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost/mappers';
mongoose.connect(databaseURL);

Event.collection.drop();
// User.collection.drop();


Event.create([{
  title: "Wat Phra Kaew visit",
  location: "Bangkok center",
  type: "temple",
  time: 14.00,
  description: "description",
  lat: 14.008696370634658,
  lng: 100.6787109375,
  moreInformations: "more informations",
  organizer: "Ilan Hazan",
  type: "",
  // start_date: ,
  // end_date: ,
  // time: ,
  description: ""
},
{
  title: "Vientiane visit",
  location: "Vientiane center",
  type: "city",
  time: 14.00,
  description: "description",
  lat: 18.312810846425442,
  lng: 103.974609375,
  moreInformations: "more informations",
  organizer: "Ilan Hazan",
  type: "",
  // start_date: ,
  // end_date: ,
  // time: ,
  description: ""
},
{
  title: "Brussels",
  location: "Bruxelles",
  type: "",
  time: 14.00,
  description: "description",
  lat: 50.54136296522161,
  lng: 4.5263671875,
  moreInformations: "more informations",
  organizer: "Ilan Hazan",
  type: "",
  // start_date: ,
  // end_date: ,
  // time: ,
  description: ""
},
{
  title: "Geneva",
  location: "Geneva",
  type: "",
  time: 14.00,
  description: "description",
  lat: 46.316584181822186,
  lng: 6.50390625,
  moreInformations: "more informations",
  organizer: "Ilan Hazan",
  type: "",
  // start_date: ,
  // end_date: ,
  // time: ,
  description: ""

}], function(err, events){
    if(err) console.error(err);
    else console.log(events);
    mongoose.connection.close()
  });




