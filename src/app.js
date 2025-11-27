import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import extractRoute from "./routes/extract.route.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api", extractRoute);

app.use(errorHandler);

export default app;
