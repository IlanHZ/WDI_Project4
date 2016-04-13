angular
  .module('mappersApp')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource) {
  var User = $resource("http://localhost:3000/users/:id", { id: '@_id' }, { update: {method: 'PUT'}});

  return User;

  console.log(User)

}
