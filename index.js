const app = require("./src");

const PORT = 5005;

app.listen(PORT, () => {
  console.log(`Application is running on PORT ${PORT}`);
});

module.exports = app;
