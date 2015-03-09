Accounts.onCreateUser(function(options, user) {
  user.roles = ['user'];
  return user;
});
