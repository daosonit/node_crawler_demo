let express = require('express');
let path = require('path');
let fs = require('fs');
let port = 3000;
let app = express();

// let schedule = require('node-schedule');

// const scrapeIt = require(__dirname + '/library/scraper')
//
// let url = 'https://www.vietnamworks.com/cong-ty/tim-kiem/#companies-in-T%E1%BA%A5tc%E1%BA%A3ng%C3%A0nhngh%E1%BB%81-at-H%C3%A0N%E1%BB%99i-sortedBy-mostFollowed-with-all'
//
// let rule = new schedule.RecurrenceRule();
// rule.second = 10;

// schedule.scheduleJob(rule, () => {
//   scrapeIt(url, {
//     listData: {
//       listItem: '.list-group',
//       name: 'listData',
//       data: {
//         title: 'a'
//       }
//     }
//   }).then(({data}) => {
//     console.log(data)
//   })
//
// });

app.get('/', function (req, res) {
  console.log(req)
  console.log(res)
  console.log('dao dang son')
})

app.listen(port)

