import Link from "next/link";
import { trimFromCenter, trimFromEnd } from "../utils/format";
import { formatEther } from "ethers";
import { Transaction } from "../types/transactions";

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

  return (
    <table className="table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th>Hash</th>
          <th>From</th>
          <th>To</th>
          <th onClick={() => onSortTransaction("value")}>Value (ETH)</th>
          <th onClick={() => onSortTransaction("timestamp")}>Timestamp</th>
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
