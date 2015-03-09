Template.authenticatedLayout.events({
  'click .logout': function(e, template) {
    e.preventDefault();
    Meteor.logout();
    return false;
  }
});
