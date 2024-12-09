import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import connectToDatabase from "./config/database.js";
import UserRoutes from "./routes/UserRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js";
import PriorityRoutes from "./routes/PriorityRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// app.use("/", (req, res) => {
//   res.send("welcom eto task manager backend");
// });

app.use("/api/users", UserRoutes);
app.use("/api/priorities", PriorityRoutes);
app.use("/api/tasks", TaskRoutes);

app.use(errorHandler);

const initApp = async () => {
  try {
    await connectToDatabase();
    console.log("DB connection established");
    app.listen(process.env.HTTP_PORT, () => {
      console.log(`HTTP Server listening on ${process.env.HTTP_PORT}`);
    });
  } catch (e) {
    throw e;
  }
};

initApp().catch((err) => console.log(`Error on startup! ${err}`));
