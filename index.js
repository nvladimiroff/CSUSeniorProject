let express = require('express');
let mustacheExpress = require('mustache-express');
let session = require('express-session');

let app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');

app.use(express.static('public'));

app.use(session({
  secret: 'hunter2',
  resave: false,
  saveUninitialized: false
}));

app.get('/test', (req, res) => {
  if(req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }

  res.render('test', { name: "Nick Vladimiroff", classname: "CIS 484", views: req.session.views });
});

app.listen(process.env.PORT, () => {
  console.log("http://localhost:" + process.env.PORT + "/");
});
