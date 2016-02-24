module.exports = (app) => {
  app.get("/student", (req, res, next) => {
    res.render('student.html', {});
  });
};
