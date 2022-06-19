const app = require("./app");
const mongoose = require("mongoose");
const { MONGO_URL, PORT = 3001 } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: " + PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
