const express = require("express");
const { static } = express;
const path = require("path");

const app = express();

app.use("/dist", static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    next(ex);
  }
});
app.post("/api/users", async (req, res, next) => {
  try {
    res.send(await User.createRandomUser());
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 8000;
    çç;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/redux_demo"
);

const User = conn.define("user", {
  name: STRING,
});
User.createRandomUser = function () {
  return this.create({ name: `${Math.random()} - user ` });
};
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await Promise.all([
    User.create({ name: "moe" }),
    User.create({ name: "larry" }),
    User.create({ name: "lucy" }),
  ]);
};

init();
