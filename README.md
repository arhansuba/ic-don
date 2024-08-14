# IC-Don Decentralized Oracle Network
https://github.com/arhansuba/eigenlayer-don  Eigenlayer hackathon winning project.













IC-Don is a decentralized oracle network that leverages the ICP Chain Fusion, EigenLayer, and Aptos to provide secure and reliable data feeds for blockchain applications. Our smart contracts are deployed using the ICP Chain Fusion, ensuring high performance and interoperability between Ethereum and ICP networks.

Table of Contents
Introduction
Features
Project Structure
Installation
Usage
Configuration
Contracts
Testing
Contributing
License
Introduction
IC-Don aims to solve the problem of trusted data delivery in decentralized applications by providing a robust oracle network. By integrating with EigenLayer and Aptos, IC-Don ensures high availability and security of data feeds.

Features
Decentralized Oracle Network: Secure and reliable data feeds.
ICP Chain Fusion: Smart contracts deployed using ICP for interoperability.
EigenLayer Integration: Enhanced security and scalability.
Aptos Integration: High performance and reliability.
User-friendly Interface: Easy-to-use frontend for interacting with the network.
Project Structure :

ic-don/
├── .devcontainer/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── aptosConfig.js
│   │   ├── services/
│   │   │   ├── contractInteractor.js
│   │   │   ├── dataFetcher.js
│   │   │   └── index.js
│   │   ├── package-lock.json
│   │   ├── package.json
├── canisters/
│   └── chain_fusion/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── transactionFlows/
│   │   │   │   ├── MultiAgent.tsx
│   │   │   │   ├── SingleSigner.tsx
│   │   │   │   ├── Sponsor.tsx
│   │   │   │   └── TransactionParameters.tsx
│   │   │   ├── ui/
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── collapsible.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── radio-group.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── toaster.tsx
│   │   │   │   └── use-toast.ts
│   │   │   ├── AutoConnectProvider.tsx
│   │   │   ├── DataDisplayComponent.tsx
│   │   │   ├── LabelValueGrid.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── TransactionHash.tsx
│   │   │   ├── WalletProvider.tsx
│   │   │   ├── WalletSelector.tsx
│   │   │   ├── WalletSelectorComponent.tsx
│   │   ├── constants/
│   │   │   └── constants.ts
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── utils/
│   │   │   ├── index.ts
│   │   │   ├── standardWallet.ts
│   │   │   └── utils.ts
│   │   ├── App.css
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── constants.ts
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── logo.svg
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   ├── setupTests.ts
│   │   └── tailwind.config.ts
├── contracts/
│   ├── EigenLayerOracle.sol
│   └── Randomness.sol
├── lib/
├── packages/
├── script/
│   ├── EigenLayerOracle.s.sol
│   └── Randomness.s.sol
├── .gitignore
├── Caddyfile
├── Cargo.lock
├── Cargo.toml
├── README.md
├── deploy.sh
├── dfx.json
├── foundry.toml
Installation
To get started with IC-Don, follow these steps:

Clone the repository:

git clone https://github.com/arhansuba/ic-don.git
cd ic-don
Install dependencies for both backend and client:

cd backend
npm install

cd ../client
npm install
Usage
Running the Backend
To run the backend server:


cd backend
npm start
Running the Client
To run the client application:


cd client
npm start
Configuration
The backend configuration is stored in src/config/aptosConfig.js. Adjust the configurations as needed to match your setup.

Contracts
The smart contracts are located in the contracts directory. The main contracts include:

EigenLayerOracle.sol: The core oracle contract leveraging EigenLayer.
Randomness.sol: A contract for generating randomness.
Testing
To run tests for the contracts:


cd contracts
npm test
Contributing
We welcome contributions to IC-Don! Please open an issue or submit a pull request on GitHub.

License
This project is licensed under the MIT License. See the LICENSE file for details.
