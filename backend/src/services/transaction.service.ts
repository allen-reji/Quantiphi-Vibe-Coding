import { transactions } from "../data/transactions.js";

export const getTransactions = () => {
  return transactions.map((transaction) => {
    const msg = transaction.message.toLowerCase();

    let category = "Misc";

    if (msg.includes("zomato") || msg.includes("swiggy")) {
      category = "Food";
    } else if (
      msg.includes("uber") ||
      msg.includes("rapido") ||
      msg.includes("ola")
    ) {
      category = "Travel";
    } else if (
      msg.includes("salary") ||
      msg.includes("company")
    ) {
      category = "Salary";
    }

    return {
      ...transaction,
      category,
      expectedSavings: msg.includes("cashback")
        ? Number((transaction.amount * 0.05).toFixed(2))
        : undefined,
    };
  });
};

export const getAnalytics = () => {
  const data = getTransactions();

  const analytics = {
    income: 0,
    expense: 0,
    Food: 0,
    Travel: 0,
    Salary: 0,
    Misc: 0,
  };

  data.forEach((t) => {
    if (t.type === "credit") analytics.income += t.amount;
    else analytics.expense += t.amount;

    analytics[t.category as keyof typeof analytics] += t.amount;
  });

  return analytics;
};