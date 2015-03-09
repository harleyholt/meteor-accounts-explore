Template.signin.created = function() {
  this.validationResult = new ReactiveVar();
  this.loginError = new ReactiveVar();
};

Template.signin.helpers({
  errors: function() {
    var validationResult = Template.instance().validationResult.get();
    if (validationResult) {
      return validationResult.errors;
    } else {
      return null;
    }
  },
  loginError: function() {
    return Template.instance().loginError.get();
  }
});

Template.signin.events({
  'submit': function (e, template) {
    e.preventDefault();
    var formFields = Mesosphere.Utils.getFormData(e.target);
    var validation = Mesosphere.signin.validate(formFields);
    template.validationResult.set(validation);
    if (!validation.errors) {
      Meteor.loginWithPassword(
        validation.formData.email,
        validation.formData.password,
        function(err) {
          if (err.reason === 'User not found') {
            err.friendlyReason = 'Sorry, no account with that email';
          } else if (err.reason === 'Incorrect password') {
            err.friendlyReason = 'Sorry, that password is incorrect';
          } else {
            err.friendlyReason = err.reason;
          }
          template.loginError.set(err);
        }
      );
    }
    return false;
  }
});
