module.exports = {
  foundByName : function foundPeople(result,argument) {
    console.log(`Found ${result.length} person by the name ${argument} : `);
    for(const people in result) {
      console.log(`- ${result[people].id} : ${result[people].first_name} ${result[people].last_name} , born '${result[people].birthdate.toString().slice(0,15)}'`);
    }
  },
  foundPeopleById: function foundPeople(result, argument) {
    if(result.length === 0) {
      console.log(`No match people with id: ${argument} in test1_db`);
    }
    for(const people in result) {
      console.log(`- ${result[people].id} : ${result[people].first_name} ${result[people].last_name} , born '${result[people].birthdate.toString().slice(0,15)}'`);
    }
  }
};
