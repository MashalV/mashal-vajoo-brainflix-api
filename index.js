import "dotenv/config";
import express from "express";
import cors from "cors";
import video from "./routes/video.js"


const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.static("./public"));

app.use(cors());
app.use(express.json());

app.use("/videos" , video);
app.use("/videos/:id" , video);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });