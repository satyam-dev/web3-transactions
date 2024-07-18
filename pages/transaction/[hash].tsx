import { GetServerSideProps } from "next";
import {
  getTransactionDetailsFromBlockNumber,
  getTransactionDetailsFromHash,
  getTransactionStatus,
} from "../../utils/etherscan";
import { formatEther } from "ethers";
import Link from "next/link";
import {
  TransactionDetails,
  TransactionStatus,
} from "../../types/transactions";

interface TransactionDetailsProps {
  transaction: TransactionDetails | null; // Ensure transaction can be null
  status: TransactionStatus | null;
  gasUsed: string;
  timeStamp: string;
}

const TransactionDetailsPage = ({
  transaction,
  status,
  gasUsed,
  timeStamp,
}: TransactionDetailsProps) => {
  if (!transaction) {
    return <div>Transaction not found.</div>;
  }

  const getValue = () => {
    console.log({ transationVALUE: transaction.value });
    const value = BigInt(transaction.value);
    return formatEther(value);
  };

  console.log({ timeStamp });

  return (
    <div className="p-3 text-light bg-dark vh-100">
      <h3>Transaction Details</h3>
      <div className="mb-2">
        Block:
        <Link
          className="m-2"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://etherscan.io/block/${parseInt(
            transaction.blockNumber
          )}`}
        >
          {parseInt(transaction.blockNumber)}
        </Link>
      </div>
      <div className="mb-2">Value: {getValue()} ETH</div>

      <div className="mb-2">
        Transaction Fees:{" "}
        {formatEther(BigInt(transaction.gasPrice) * BigInt(gasUsed))} ETH
      </div>
      <div className="mb-2">
        Status:{" "}
        {status?.isError === "1" ? (
          <div className="badge text-bg-danger">{`Failed transaction: ${status.errDescription}`}</div>
        ) : (
          <div className="badge text-bg-success">Success</div>
        )}
      </div>
      <div className="mb-2" suppressHydrationWarning>
        Date: {new Date(Number(timeStamp) * 1000).toLocaleString()}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { hash } = context.params!;
  try {
    const transactionFromHash = await getTransactionDetailsFromHash(
      hash as string
    );
    const status = await getTransactionStatus(hash as string);
    const transactionFromBlock = await getTransactionDetailsFromBlockNumber(
      transactionFromHash.to,
      parseInt(transactionFromHash.blockNumber)
    ); // To get timestamp and gas used since according to assessment requirement we need to cater for these two on details page

    return {
      props: {
        transaction: transactionFromHash || null, // Handle case where transaction might be undefined
        status: status || null,
        timeStamp: transactionFromBlock.timeStamp,
        gasUsed: transactionFromBlock.gasUsed,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default TransactionDetailsPage;
