module.exports = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGOLAB_URI, 
  secret: 'thisIsMappers',
  appUrl: 'https://mappersapp.herokuapp.com/'
}
