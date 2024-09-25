import express from "express";

const app = express();
const PORT = 8001;

// Server Middlewares
app.use(express.json());

// Server Listener
app.listen(PORT, () => {
  console.log(`Auth Service Listening on ${PORT}`);
});
