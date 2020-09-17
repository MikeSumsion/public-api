// dependencies

const superagent = require('superagent');


// globals

const API_ROUTE = "https://api.portal-agylia.com/GetUsersActivity";
const API_USERNAME = "example.admin-agylia.com";
const API_KEY = "7c82041e63db436eb0a681d6910d71aedf32656ef23";
const DATE = "2020-09-01T08:58:20.820Z";


// helpers

function getUsersActivity(date, done) {
  superagent
    .post(API_ROUTE)
    .auth(API_USERNAME, API_KEY)
    .send({
      params: {
        date
      }
    })
    .set('accept', 'json')
    .end((err, res) => {
      if (err) {
        console.log("ERR! " + err.status);
      } else {
        console.log(res.status + " [activity_count: " + res.body.activities.length + ", next_date: " + res.body.next_date + "]");

        done({
          next_date: res.body.next_date
        });
      }
    });
}

function page(date) {
  getUsersActivity(date, (data) => {
    if (data.next_date) {
      page(data.next_date);
    }
  });
}


// main

page(DATE);
