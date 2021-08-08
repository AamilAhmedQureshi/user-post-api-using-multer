require("./connections/db");
const express = require("express");
const config = require("config");
const { auth, post, user } = require("./routes");
const app = express();

/* ================> jwtPrivateKey <=======================*/
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR : jwtPrivateKey is not defined ");
  process.exit(1);
}

/* ================> Middleware <=======================*/
app.use(express.json());
app.use("/api/auths", auth);
app.use("/api/posts", post);
app.use("/api/users", user);

/* ================> Port <=======================*/
const port = process.env.Port || 3001;
app.listen(port, () => {
  console.log(`server listen to the port ${port}`);
});
