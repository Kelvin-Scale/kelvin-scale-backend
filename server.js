const express = require("express");
const cors = require("cors");

const flavours = require("./data/flavours");

const app = express();

app.use(cors());
app.use(express.json());


// GET ALL FLAVOURS
app.get("/api/flavours", (req, res) => {
    res.json(flavours);
});


// GET ONLY AVAILABLE FLAVOURS
app.get("/api/flavours/available", (req, res) => {
    const availableFlavours = flavours.filter(
        flavour => flavour.available
    );

    res.json(availableFlavours);
});


// CHANGE AVAILABILITY
app.put("/api/flavours/:id", (req, res) => {

    const id = Number(req.params.id);

    const flavour = flavours.find(
        item => item.id === id
    );

    if (!flavour) {
        return res.status(404).json({
            message: "Flavour not found"
        });
    }

    flavour.available = req.body.available;

    res.json({
        message: "Availability updated",
        flavour: flavour
    });
});

app.use("/admin", express.static("admin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kelvin Scale Backend running on port ${PORT}`);
});