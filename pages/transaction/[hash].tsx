// pages/transaction/[hash].tsx
import { GetServerSideProps } from "next";
import {
  getTransactionDetails,
  getTransactionDetailsV2,
  getTransactionStatus,
  Transaction,
  TransactionDetails,
  TransactionStatus,
} from "../../utils/etherscan";
import { formatEther } from "ethers";
import Link from "next/link";

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
    <div>
      <h1>Transaction Details</h1>
      <div>
        BlockNumber:
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://etherscan.io/block/${parseInt(
            transaction.blockNumber
          )}`}
        >
          {parseInt(transaction.blockNumber)}
        </Link>
      </div>
      <div>Value: {getValue()} ETH</div>
      {/* <div>
        Timestamp:{" "}
        {new Date(Number(transaction.timeStamp) * 1000).toLocaleString()}
      </div> */}
      <div>
        Transaction Fees:{" "}
        {formatEther(BigInt(transaction.gasPrice) * BigInt(gasUsed))} ETH
      </div>
      <div>
        Status:{" "}
        {status?.isError === "1"
          ? `Failed transaction: ${status.errDescription}`
          : "Success"}
      </div>
      <div suppressHydrationWarning>
        Date: {new Date(Number(timeStamp) * 1000).toLocaleString()}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { hash } = context.params!;
  try {
    const transaction = await getTransactionDetails(hash as string);
    const status = await getTransactionStatus(hash as string);
    const transactionV2 = await getTransactionDetailsV2(
      transaction.to,
      parseInt(transaction.blockNumber)
    );

    return {
      props: {
        transaction: transaction || null, // Handle case where transaction might be undefined
        status: status || null,
        timeStamp: transactionV2.timeStamp,
        gasUsed: transactionV2.gasUsed,
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
