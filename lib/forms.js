/**
 * Added Mesosphere rules:
 * matches: Checks if the value of the input matches the value of another input
 *  by field name. Use case: verify password field needs to match the password
 *  field exactly.
 **/
Mesosphere.registerRule(
  'matches',
  function(fieldValue, ruleValue, fieldName, formFieldsObject, fields) {
    var otherFieldValue = formFieldsObject[ruleValue];
    return fieldValue === otherFieldValue;
  }
);

var forms = [
  {
    name: 'signin',
    fields: {
      email: {
        required: true,
        format: 'email',
        message: 'Not a valid email address',
        requiredMessage: 'Email address is required'
      },
      password: {
        required: true,
        requiredMessage: 'Password is required'
      }
    }
  },
  {
    name: 'signup',
    fields: {
      email: {
        required: true,
        format: 'email',
        message: 'Not a valid email address',
        requiredMessage: 'Email address is required'
      },
      password: {
        required: true,
        requiredMessage: 'Password is required'
      },
      passwordCheck: {
        required: true,
        rules: {
          matches: 'password'
        },
        message: 'Does not match password',
        requiredMessage: 'Must verify password'
      }
    }
  }
];

for (var i  = 0; i < forms.length; i++) {
  Mesosphere(forms[i]);
}
