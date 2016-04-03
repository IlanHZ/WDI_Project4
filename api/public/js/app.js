angular
  .module('mappersApp', ['satellizer', 'angular-jwt','ngResource'])
  .constant('API_URL', 'http://localhost:3000')
  .config(oauthConfig);


  oauthConfig.$inject = ['API_URL', '$authProvider', 'FACEBOOK_API_KEY'];
  function oauthConfig(API_URL, $authProvider, FACEBOOK_API_KEY) {
    // facebook = method given to us by satellizer
    $authProvider.facebook({
      // the place where we want fb to make its post request when we log in
      url: API_URL + '/auth/facebook',
      // our app id:
      clientId: FACEBOOK_API_KEY,
    })

    
    // store the token as "token", not satellizer_token, don't let people know which tech we re using
    $authProvider.tokenPrefix = null;
  }

