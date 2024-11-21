const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const cors = require('cors');  


const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());

connectToMongoDB(
  "mongodb+srv://admin:GHPe5MeKHxV4DIO9@cluster0.hfxm0of.mongodb.net/url-shortner"
);

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: new Date() }, // Save full ISO timestamp
        },
      },
      { new: true } // Ensure the updated document is returned
    );

    if (entry) {
      res.redirect(entry.redirectURL);
      console.log("Redirected to:", entry.redirectURL);
    } else {
      res.status(404).send("Short URL not found");
    }
  } catch (error) {
    console.error("Error during redirection:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000);
