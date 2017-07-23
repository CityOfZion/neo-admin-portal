import { Random } from 'meteor/random';

const registerFieldTypes = [
  {text: 'text'},
  {number: 'number'},
  {email: 'email'},
  {date: 'date'},
  {password: 'password'},
  {radio: 'radio'},
  {checkbox: 'checkbox'},
  {
    autofill: 'autofill',
    types: [{
      type: 'randomNumber',
      randomNumber: {
        min: 'number',
        max: 'number',
        func: (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }
      }
    }, {
      type: 'randomString',
      randomString: {
        func: () => {
          return Random.id();
        }
      }
    }]
  }
];

export { registerFieldTypes };