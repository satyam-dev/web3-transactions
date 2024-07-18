This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Web3 Transactions:

This project includes:
1. Listing of transactions from a given address
2. Current balance of address
3. A table with details like - hash, from address, to address, value, timestamp and transaction fees
4. Hash is a clickable link which takes you to the transaction detail page
5. Transaction details page contains details block, amount, timestamp etc. Block number is clickable and takes you to a block explorer to etherscan.

## Demo
https://demo-web3-transactions.netlify.app/transactions/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae 

You can try any other valid ETH address and see similar results. Find more addresses [here](https://etherscan.io/)

### Desktop View
![desktop_view](https://github.com/user-attachments/assets/5391e073-f72e-4b76-892c-ab8b662f0176)

### Mobile
![mobile_screen](https://github.com/user-attachments/assets/2273f8bd-fbd3-4d7e-9292-cef646a1244a)


## Libraries and dependencies:
- `"react-responsive": "^10.0.0"` - Makes it easier to creave responsive layouts.
- `"bootstrap": "^5.3.3"` - UI components for quick development
- `"ethers": "^6.13.1"` - Lot of good modules to help you make web3 apps quickly
- `"axios": "^1.7.2"` - For API call


## Limitations/Coming Soon

1. Only supports Ethereum addresses
2. Can add unit tests for robust development

