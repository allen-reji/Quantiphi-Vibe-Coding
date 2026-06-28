import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transaction.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRoutes);

app.get("/", (_req, res) => {
  res.json({
    status: "success",
    message: "Quantiphi Vibe Coding Backend is running 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});