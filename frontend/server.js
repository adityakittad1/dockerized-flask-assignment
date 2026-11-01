const express = require("express");
const path = require("path");
const app = express();
const PORT = Number(process.env.PORT || 3000);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (_req, res) => res.json({ status: "ok", service: "frontend" }));
app.get("/api-config", (_req, res) => res.json({ backendUrl: process.env.BACKEND_URL || "http://localhost:5000" }));
app.listen(PORT, "0.0.0.0", () => console.log(`Frontend listening on port ${PORT}`));
