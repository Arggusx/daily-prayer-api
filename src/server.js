import express from "express";
import cors from "cors";
import dailyPrayerRoutes from "./routes/dailyPrayer.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", dailyPrayerRoutes);
app.get("/", (req, res) => {
    res.send("A API do menino Dougilinhas está rodando com toda força!");
});

app.get("/", (req, res) => {
    res.send("A API do menino Dougilinhas está rodando com toda força!");
});

export default app;
