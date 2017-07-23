// import {schemaFromObject} from '/imports/helpers/array-to-schema.js';
// import {customerInformation} from '/imports/schemas/customers.js';

TemplateController('register', {
  // onCreated() {
  //   const self = this;
  //   Meteor.subscribe('activeRegisterFieldsByClientId', this.data.clientId);
  //   AutoForm.hooks({
  //     insertCustomerForm: {
  //       onSubmit: function (insertDoc, updateDoc, currentDoc) {
  //         insertDoc.clientId = self.data.clientId;
  //         const urls = self.data.urls;
  //         Meteor.call('createCustomers', insertDoc, urls, function(error) {
  //           if(error) {
  //             console.log(error);
  //           } else {
  //             BootstrapModalPrompt.prompt({
  //               title: i18n("global.success"),
  //               content: i18n("customers.newAccountSuccess"),
  //               btnDismissText: null
  //             });
  //           }
  //         });
  //         return false;
  //       }
  //     }
  //   });
  // },
  // onRendered() {
  //   console.log('DATA hopefully', this.data);
  // },
  // helpers: {
  //   getRegistrationFields() {
  //     return schemaFromObject(Meteor.registrationFields.find());
  //   },
  //   isType(field, type) {
  //     return field === type;
  //   }
  // }
});