/**** Node.js libraries *****/
const path = require("path");

/**** External libraries ****/
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const checkJwt = require("express-jwt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const appName = "Server API";
const port = process.env.PORT || 8080;


/**** Configuration ****/
dotenv.config();
const app = express();
const server = require("http").createServer(app);
const MONGO_URL = process.env.MONGO_URL;
server.listen(port, () => console.log(`${appName} running on port ${port}!`));

// Connect db
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const secret = process.env.SECRET || "the cake is a lie";

// Create data
const userModel = require("./userModel")(mongoose, secret);

const openPaths = [
  { url: "/api/users/authenticate", methods: ["POST"] },

  { url: "/api/users/create", methods: ["POST"] },

  /^(?!\/api).*/gim,

  { url: /\/api\/posts\.*/gim, methods: ["GET"] },
  { url: /\/api\/categories\.*/gim, methods: ["GET"] },
];

app.use(
  checkJwt({ secret, algorithms: ["HS512"] }).unless({ path: openPaths })
);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.message });
  } else {
    next();
  }
});

// Require routes
const userRoutes = require("./userRoutes")(userModel);

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors());
app.use(express.static(path.resolve("..", "build")));

// Add routes
app.use("/api/users", userRoutes);

// "Redirect" all non-API GET requests to React's entry point (index.html)
app.get("*", (req, res) =>
  res.sendFile(path.resolve("..", "build", "index.html"))
);
