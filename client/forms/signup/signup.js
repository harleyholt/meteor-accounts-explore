Template.signup.created = function() {
  this.validationResult = new ReactiveVar();
};

Template.signup.helpers({
  errors: function() {
    var validationResult = Template.instance().validationResult.get();
    if (validationResult) {
      return validationResult.errors;
    } else {
      return null;
    }
  }
});

Template.signup.events({
  'submit': function (e, template) {
    e.preventDefault();
    var formFields = Mesosphere.Utils.getFormData(e.target);
    var validation = Mesosphere.signup.validate(formFields);
    template.validationResult.set(validation);
    if (!validation.errors) {
      var userObj = {
        username: validation.formData.email,
        email: validation.formData.email,
        password: validation.formData.password
      };
      console.log('creating user', userObj);
      Accounts.createUser(userObj, function(err) {
        if (err) {
          console.log('Error trying to create a new user.', err);
        }
      });
    }
    return false;
  }
});
