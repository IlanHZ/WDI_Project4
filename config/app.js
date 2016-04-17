module.exports = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGODB_URI, 
  secret: 'thisIsMappers',
  appUrl: 'https://mappersapp.herokuapp.com/'
}
