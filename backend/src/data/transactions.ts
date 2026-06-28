import type { Transaction } from "../types/transaction.js";

export const transactions: Transaction[] = [
  {
    id: "1",
    message: "Paid Rs.250 to Zomato",
    amount: 250,
    type: "debit",
    category: ""
  },
  {
    id: "2",
    message: "Paid Rs.430 to Swiggy",
    amount: 430,
    type: "debit",
    category: ""
  },
  {
    id: "3",
    message: "Paid Rs.180 to Uber",
    amount: 180,
    type: "debit",
    category: ""
  },
  {
    id: "4",
    message: "Received Rs.50000 from Private Company Ltd",
    amount: 50000,
    type: "credit",
    category: ""
  },
  {
    id: "5",
    message: "Paid Rs.999 to Amazon Cashback Offer",
    amount: 999,
    type: "debit",
    category: ""
  },
  {
    id: "6",
    message: "Received Rs.1200 from Allen",
    amount: 1200,
    type: "credit",
    category: ""
  },
  {
    id: "7",
    message: "Paid Rs.850 Electricity Bill",
    amount: 850,
    type: "debit",
    category: ""
  },
  {
    id: "8",
    message: "Paid Rs.320 at Reliance Fresh",
    amount: 320,
    type: "debit",
    category: ""
  },
  {
    id: "9",
    message: "Paid Rs.1500 to Rapido",
    amount: 1500,
    type: "debit",
    category: ""
  },
  {
    id: "10",
    message: "Received Rs.500 Cashback Reward",
    amount: 500,
    type: "credit",
    category: ""
  }
];