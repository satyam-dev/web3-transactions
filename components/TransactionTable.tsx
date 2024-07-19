import Link from "next/link";
import { trimFromCenter, trimFromEnd } from "../utils/format";
import { formatEther } from "ethers";
import { Transaction } from "../types/transactions";
import { useMediaQuery } from "react-responsive";

interface TransactionTableProps {
  transactions: Transaction[];
  onSortTransaction: (field: string) => void;
}
const TrasactionTable = ({
  transactions,
  onSortTransaction,
}: TransactionTableProps) => {
  const getDateFromTimeStamp = (timeStamp: string) =>
    new Date(Number(timeStamp) * 1000).toLocaleString();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

  if (isTabletOrMobile) {
    return (
      <div>
        {transactions.map((tx) => (
          <div key={tx.hash} className="card mb-2 bg-dark border-light ">
            <ul className="list-group list-group-flush ">
              <li className="list-group-item bg-dark text-light">
                From: {tx.from}
              </li>
              <li className="list-group-item bg-dark text-light">
                To: {tx.to}
              </li>

              <li className="list-group-item bg-dark text-light">
                Amount: {formatEther(tx.value)}
              </li>
              <li
                suppressHydrationWarning
                className="list-group-item bg-dark text-light"
              >
                Date: {formatEther(tx.value)}
              </li>
              <li className="list-group-item bg-dark text-light">
                Transaction const:{" "}
                {formatEther(BigInt(tx.gasUsed) * BigInt(tx.gasPrice))}
              </li>
            </ul>
            <div className="card-body">
              <Link
                className="card-link"
                title={tx.hash}
                href={`/transaction/${tx.hash}`}
              >
                {tx.hash}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <table className="table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th>Hash</th>
          <th>From</th>
          <th>To</th>
          <th
            className="cursor-pointer"
            onClick={() => onSortTransaction("value")}
          >
            Value (ETH) ↓↑
          </th>
          <th
            className="cursor-pointer"
            onClick={() => onSortTransaction("timestamp")}
          >
            Timestamp ↓↑
          </th>
          <th>Transaction fees(ETH)</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
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
  );
};

export default TrasactionTable;
