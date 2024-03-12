import express from "express";
import fs, { readFileSync } from "fs";
import { format } from "date-fns";
import path from "path";

const app = express();
const PORT = 4040;

app.get("/", (req, res) => {
  let today = format(new Date(), "dd-mm-yyyy-HH-mm-ss");
  const filePath = `TimeStamp/${today}.txt`;
  fs.writeFileSync(filePath, `${today}`, "utf8");
  let data = readFileSync(filePath, "utf8");
  res.status(200).send(data);
});
app.get("/getTextFiles", (req, res) => {
  const folderPath = "TimeStamp";

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("An error occurred while listing the files from directory");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
      res.status(200).json(textFiles);
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
}); //running status
