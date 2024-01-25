import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", {results : result});
  } catch (error) {
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try{
  const type = req.body.type
  const numPeople = req.body.participants
  const response = await axios.get("https://bored-api.appbrewery.com/filter?type="+type+"&participants="+numPeople);
  const result = response.data;

  var randNMum = Math.floor(Math.random()*result.length);
  const data ={
    results : result,
    randnum : randNMum,
  }
  res.render("index.ejs", {data:data});
  }catch (error) {
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
