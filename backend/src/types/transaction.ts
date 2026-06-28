export interface Transaction {
  id: string;
  message: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
}