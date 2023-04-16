require("dotenv").config();
let express = require("express");
let cors = require("cors");
let app = express();

app.use(express.json());


app.use(cors({ origin: `${process.env.CLIENT_URL}`}));

const port = process.env.PORT || 5000;

app.post("/send", async (req, res, next) => {
    try {
        res.json({ msg: "This is CORS-enabled for all origins!" });
        
    } catch (error) {
        res.status(404).json({msg: "Error "})
    }
});

app.listen(port,  () => {
  console.log(`CORS-enabled web server listening on https://localhost:${port}`);
});