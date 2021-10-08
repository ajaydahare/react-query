import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const records = ["wake up at 5am ", "learn around 10hr"];
app.get("/api/get-records", (req, res) => {
  res.json({ records });
});

app.post("/api/add-record", (req, res) => {
  const data = req.body.record;
  records.push(data);
  res.json({ status: "ok" });
});

app.listen(5000, () => {
  return console.log("app running on port 5000");
});
