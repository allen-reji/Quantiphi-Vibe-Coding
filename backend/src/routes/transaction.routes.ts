import { Router } from "express";
import {
  getTransactions,
  getAnalytics,
} from "../services/transaction.service.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(getTransactions());
});

router.get("/analytics", (_req, res) => {
  res.json(getAnalytics());
});

export default router;