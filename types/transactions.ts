export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  gasUsed: string;
  gas: string;
  gasPrice: string;
}

export interface TransactionResponse {
  status: string;
  message: string;
  result: Transaction[];
}

export interface TransactionStatus {
  isError: "1" | "0";
  errDescription: string;
}

export interface GetUsedGasParams {
  data: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
}

export interface TransactionDetails {
  value: string;
  gasPrice: string;
  blockNumber: string;
  to: string;
}

export interface BalanceResponse {
  status: string;
  message: string;
  result: string;
}
