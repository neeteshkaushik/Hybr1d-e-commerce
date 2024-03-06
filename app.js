const express = require("express");
require("dotenv").config();
require("./config/db");
const buyerRouter = require("./routes/buyer");
const sellerRouter = require("./routes/seller");
const authRouter = require("./routes/auth");
const jwtMiddleware = require("./middlewares/jwt.middleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/buyer", jwtMiddleware, buyerRouter);
app.use("/api/seller", jwtMiddleware, sellerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
