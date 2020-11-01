const app = require('./backend/app');

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/src/index.html");
});


app.listen(3000, () => {
  console.log("Server Started");
});
