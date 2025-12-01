import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
console.log("final deployments server.js");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
