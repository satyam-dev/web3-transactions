import { useState } from "react";
import { Transaction } from "../types/transactions";
import { formatEther } from "ethers";

const useSort = (transactions: Transaction[]) => {
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedTransactions, setSortedTransactions] = useState(transactions);

  const shouldSortTransactions = (field: string) => {
    const isAsc = sortField === field && sortDirection === "asc";
    const newDirection = isAsc ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...transactions].sort((a, b) => {
      let comparison = 0;
      if (field === "value") {
        comparison = +formatEther(a.value) > +formatEther(b.value) ? 1 : -1;
      } else if (field === "timestamp") {
        comparison = Number(a.timeStamp) > Number(b.timeStamp) ? 1 : -1;
      }
      return isAsc ? comparison : -comparison;
    });
    setSortedTransactions(sorted);
  };

  return { shouldSortTransactions, sortedTransactions };
};

export default useSort;
