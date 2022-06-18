const app = require("./app");
const MongoClient = require("mongodb").MongoClient;
const { MONGO_URL, PORT = 3001 } = process.env;

const start = async () => {
  const client = await MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db();
  const Contacts = db.collection("contacts");
  const contacts = await Contacts.find({}).toArray();
  console.log(contacts);
  app.listen(PORT, () => {
    console.log("Server running. Use our API on port: " + PORT);
  });
};

start();
