'use strict';
const settings = require("./settings");
const argument = process.argv.slice(2);
console.log(argument);


const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const addPerson = function(argument) {
  knex('famous_people')
   .insert({first_name: argument[0],
            last_name: argument[1],
            birthdate: argument[2]}
          )
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log("Error ", error );
    })
    .finally(() => knex.destroy());
};

addPerson(argument);
