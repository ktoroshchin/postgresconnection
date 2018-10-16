const pg = require("pg");
const settings = require("./settings"); // settings.json
const argument = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    console.log(`Searching...`);
    return console.error("Connection Error", err);
  }
  if(isNaN(argument)) {
    client.query("SELECT * FROM famous_people WHERE first_name = $1 or last_name = $1", [argument], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      } else {
        foundPeople(result.rows);
        client.end();
      }
    });
  } else {
    client.query("SELECT * FROM famous_people WHERE id = $1", [argument], (err, result) => {
      console.log(`Searching...`);
      if(err) {
        return console.error("Connection Error", err);
      } else {
        foundPeopleById(result.rows);
        client.end();
        }
      });
    }
  });


function foundPeople(input) {
  console.log(`Found ${input.length} person by the name ${argument} : `);
  for(const people of input) {
    console.log(`- ${people.id} : ${people.first_name} ${people.last_name} , born '${people.birthdate.toString().slice(0,15)}'`)
  }
}

function foundPeopleById(input) {
  if(input.length === 0){
    console.log(`No match people with id: ${argument} in test1_db`);
  }
  for(const people of input) {
    console.log(`- ${people.id} : ${people.first_name} ${people.last_name} , born '${people.birthdate.toString().slice(0,15)}'`)
  }
}
