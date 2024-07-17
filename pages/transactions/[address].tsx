// pages/transactions/[address].tsx
import { GetServerSideProps } from "next";
import {
  getTransactions,
  getBalance,
  Transaction,
} from "../../utils/etherscan";
import Link from "next/link";
import { formatEther } from "ethers";
import { trimFromCenter, trimFromEnd } from "../../utils/format";
import { useState } from "react";

interface TransactionProps {
  address: string;
  transactions: Transaction[];
  balance: string;
}

const TransactionsPage = ({
  address,
  transactions,
  balance,
}: TransactionProps) => {
  const getDateFromTimeStamp = (timeStamp: string) =>
    new Date(Number(timeStamp) * 1000).toLocaleString();

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedTransactions, setSortedTransactions] = useState(transactions);

  const sortTransactions = (field: string) => {
    const isAsc = sortField === field && sortDirection === "asc";
    const newDirection = isAsc ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...transactions].sort((a, b) => {
      let comparison = 0;
      if (field === "value") {
        comparison = a > b ? 1 : -1;
      } else if (field === "timestamp") {
        comparison = Number(a.timeStamp) > Number(b.timeStamp) ? 1 : -1;
      }
      return isAsc ? comparison : -comparison;
    });
    setSortedTransactions(sorted);
  };
  return (
    <div className="p-3 bg-dark vh-100 overflow-y-scroll">
      <h3 className="text-light">
        Transactions for Address:
        <div className="badge text-bg-success m-2">{address}</div>
      </h3>
      <h4 className="text-light">
        Balance:
        <div className="badge text-bg-info m-2">
          {trimFromEnd(formatEther(balance), 9)} ETH
        </div>
      </h4>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Hash</th>
            <th>From</th>
            <th>To</th>
            <th onClick={() => sortTransactions("value")}>Value (ETH)</th>
            <th onClick={() => sortTransactions("timestamp")}>Timestamp</th>
            <th>Transaction fees(ETH)</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((tx) => (
            <tr key={tx.hash}>
              <td>
                <Link title={tx.hash} href={`/transaction/${tx.hash}`}>
                  {trimFromCenter(tx.hash)}
                </Link>
              </td>
              <td>{trimFromCenter(tx.from)}</td>
              <td>{trimFromCenter(tx.to)}</td>
              <td>{trimFromEnd(formatEther(tx.value), 8)}</td>
              <td suppressHydrationWarning>
                {getDateFromTimeStamp(tx.timeStamp)}
              </td>
              <td>
                {trimFromEnd(
                  formatEther(BigInt(tx.gasUsed) * BigInt(tx.gasPrice)),
                  8
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { address } = context.params!;
  try {
    const transactions = await getTransactions(address as string);
    const balance = await getBalance(address as string);
    return {
      props: {
        address,
        transactions,
        balance,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default TransactionsPage;
