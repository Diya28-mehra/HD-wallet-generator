# 🔐 Blockchain Wallet Generator

A secure and intuitive web application for generating blockchain wallets with support for multiple cryptocurrencies including Solana and Ethereum.

## 📖 What is this?

This tool helps you create cryptocurrency wallets using industry-standard cryptographic principles:

- **Mnemonic Phrase**: A 12 or 24-word recovery phrase (also called seed phrase) that serves as a human-readable backup of your wallet. Think of it as a master key to all your crypto accounts.

- **Seed**: A cryptographic seed derived from your mnemonic phrase using the BIP39 standard. This seed is used to generate all your wallet addresses.

- **Derivation Path**: A standardized path (BIP44) that determines how wallet addresses are generated from the seed. Different cryptocurrencies use different paths (e.g., `m/44'/501'/0'/0'` for Solana, `m/44'/60'/0'/0` for Ethereum).

## ✨ Features

- 🔑 Generate secure 12 or 24-word mnemonic phrases
- 💼 Support for Solana and Ethereum wallets
- 👁️ Toggle visibility for sensitive information (mnemonics, private keys)
- 📋 One-click copy for addresses and keys
- 🗑️ Easy wallet management (clear, delete individual wallets)
- 🎨 Modern, responsive UI with dark theme

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Diya28-mehra/your-repo-name.git
   cd your-repo-name
```

2. **Install dependencies**
```bash
   npm install
```

3. **Run the development server**
```bash
   npm run dev
```

4. **Open your browser**
```
   Navigate to http://localhost:5173
```

## 🛠️ Built With

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **BIP39** - Mnemonic generation
- **ethers.js** - Ethereum wallet support
- **@solana/web3.js** - Solana wallet support
- **tweetnacl** - Cryptographic operations

## 📦 Build for Production
```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## ⚠️ Security Notice

- **Never share your mnemonic phrase or private keys with anyone**
- **Store your recovery phrase in a secure offline location**
- **This tool generates wallets client-side - your keys never leave your browser**
- **For production use with real funds, consider using hardware wallets**

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Diya Mehra**

- GitHub: [@Diya28-mehra](https://github.com/Diya28-mehra)
- LinkedIn: [diymehra](https://www.linkedin.com/in/diymehra/)
- Twitter: [@itsdiyamehra](https://x.com/itsdiyamehra)

## 🌟 Show your support

Give a ⭐️ if this project helped you!

---

Built with ❤️ by Diya Mehra
