import { GetServerSideProps } from "next";
import { getTransactions, getBalance } from "../../utils/etherscan";
import { formatEther } from "ethers";
import { trimFromCenter, trimFromEnd } from "../../utils/format";
import { Transaction } from "../../types/transactions";
import useSort from "../../hooks/useSort";
import TransactionTable from "../../components/TransactionTable";
import { useMediaQuery } from "react-responsive";

interface TransactionPageProps {
  address: string;
  transactions: Transaction[];
  balance: string;
}

const TransactionsPage = ({
  address,
  transactions,
  balance,
}: TransactionPageProps) => {
  const { shouldSortTransactions: sortTransactions, sortedTransactions } =
    useSort(transactions);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className="p-3 bg-dark vh-100 overflow-y-scroll">
      <h3 className="text-light">
        Transactions for Address:
        <div className="badge text-bg-success m-2">
          {isTabletOrMobile ? trimFromCenter(address, 10) : address}
        </div>
      </h3>
      <h4 className="text-light">
        Balance:
        <div className="badge text-bg-info m-2">
          {trimFromEnd(formatEther(balance), 9)} ETH
        </div>
      </h4>
      <TransactionTable
        onSortTransaction={sortTransactions}
        transactions={sortedTransactions}
      />
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
