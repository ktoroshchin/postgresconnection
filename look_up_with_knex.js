'use strict';
const settings = require("./settings");
const queryPrint = require('./helper_functions')
const argument = process.argv[2];


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
if(isNaN(argument)) {
  knex.select('*').from('famous_people')
  .where({first_name: argument})
  .orWhere({last_name: argument})
  .asCallback((err, result) => {
    if(err) {
      return console.log("Connection Error", error);
    } else {
      console.log(`Searching...`);
      queryPrint.foundByName(result,argument);
    }
  })
  .finally(() => knex.destroy());
} else {
  knex.select('*').from('famous_people')
  .where({id: argument})
  .asCallback((err, result) => {
    if(err) {
      return console.log("Connection Error", error);
    } else {
      queryPrint.foundPeopleById(result,argument);
    }
  })
  .finally(() => knex.destroy());
}
