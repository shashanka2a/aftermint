# 🎨 Mintari + AfterMint SDK

> **Hackathon Project**: Transform images into Ghibli NFTs while pioneering the AfterMint SDK for Flow ecosystem rewards

[![Flow](https://img.shields.io/badge/Flow-Blockchain-00EF8B)](https://flow.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)
[![IPFS](https://img.shields.io/badge/IPFS-Decentralized-orange)](https://ipfs.io)
[![SDK](https://img.shields.io/badge/AfterMint-SDK-purple)](https://aftermint.dev)

## 🏆 Hackathon Vision

**Mintari** is our showcase application, but the real innovation is **AfterMint SDK** - a public reward system that any Flow project can integrate to unlock post-mint experiences and monetization.

### 🎯 What We Built
- **Mintari**: Beautiful Ghibli NFT creator (fully functional)
- **AfterMint SDK**: Reward system architecture and logic (prototype stage)

### 💡 The Bigger Picture
While building Mintari's reward system, I realized: "Why not make this available to the entire Flow ecosystem?" Thus, AfterMint SDK was born.

## ✨ Mintari Features

- 🎨 **AI-Powered Transformation** - Convert any image to Studio Ghibli style
- ⛓️ **Flow Blockchain Integration** - Real NFT minting on Flow testnet
- 🌐 **Decentralized Storage** - IPFS upload via multiple providers (Walrus, Pinata, Web3.Storage)
- 💰 **AfterMint Integration** - Prototype reward system showcasing SDK capabilities
- 🎁 **Flow Ecosystem Partners** - POAP, NBA Top Shot, Pinnacle, Flowty integrations
- 📱 **Production-Ready UI** - Beautiful design with Framer Motion animations

## 🚀 Live Demo

**[Try Mintari Now →](https://aftermint.dev/)**

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible components

### Blockchain
- **Flow Blockchain** - Fast, developer-friendly blockchain
- **FCL (Flow Client Library)** - Wallet connection and transactions
- **Cadence** - Smart contract language

### Storage & APIs
- **IPFS** - Decentralized file storage
- **Walrus** - Sui ecosystem storage solution
- **Pinata** - IPFS pinning service
- **Replicate/Hugging Face** - AI image transformation

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- Flow wallet (Blocto, Lilico, or Flow Wallet)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mintari.git
cd mintari

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys (see Configuration section)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## ⚙️ Configuration

Create a `.env.local` file with the following variables:

```env
# Flow Blockchain
NEXT_PUBLIC_FLOW_NETWORK=testnet
NEXT_PUBLIC_FLOW_ACCESS_NODE=https://rest-testnet.onflow.org

# IPFS Providers (at least one required)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_web3_storage_token
NEXT_PUBLIC_WALRUS_API_URL=https://publisher-devnet.walrus.space

# AI Services (optional)
REPLICATE_API_TOKEN=your_replicate_token
HUGGING_FACE_API_TOKEN=your_huggingface_token
```

## 🎯 How It Works

1. **Connect Wallet** - Link your Flow wallet (Blocto, Lilico, etc.)
2. **Upload Image** - Choose any image to transform
3. **AI Magic** - Watch as AI converts it to Ghibli style
4. **IPFS Upload** - Image stored on decentralized IPFS network
5. **Mint NFT** - Create real NFT on Flow blockchain
6. **Exclusive Rewards** - Unlock Flow ecosystem benefits

## 🏗️ Architecture

### Mintari Platform
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   AI Services   │    │   Blockchain    │
│   (Next.js)     │───▶│   (Replicate)   │    │   (Flow)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Walrus Storage  │    │   AfterMint     │    │   Wallet        │
│ (IPFS Upload)   │    │   SDK Logic     │    │   Integration   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### AfterMint SDK Architecture (Designed)
```
┌─────────────────────────────────────────────────────────────┐
│                    AfterMint SDK Core                       │
├─────────────────┬─────────────────┬─────────────────────────┤
│   Reward Engine │   Partner API   │   Analytics Engine      │
│   - Trigger     │   - POAP        │   - Event Tracking      │
│   - Display     │   - NBA Top Shot│   - Conversion Metrics  │
│   - Analytics   │   - Pinnacle    │   - Revenue Attribution │
└─────────────────┴─────────────────┴─────────────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Any Flow      │    │   Shared        │    │   Developer     │
│   Project       │    │   Partnerships  │    │   Dashboard     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npm run build
vercel --prod
```


## 🚀 AfterMint SDK Vision

### 🎯 The Problem
Every Flow project builds reward systems from scratch:
- ❌ Duplicated effort across projects
- ❌ Inconsistent user experiences  
- ❌ Limited monetization options
- ❌ No ecosystem-wide partnerships

### ✅ The Solution: AfterMint SDK
A plug-and-play reward system for any Flow NFT project:

```typescript
import { AfterMint } from '@aftermint/sdk'

// One line integration
const rewards = new AfterMint({
  projectId: 'your-project',
  nftContract: '0xYourContract',
  partners: ['poap', 'nba-topshot', 'pinnacle']
})

// Trigger rewards after minting
await rewards.showRewards(nftData, userAddress)
```

### 🏗️ Hackathon Scope vs Full Vision

#### ✅ **What I Built (Hackathon)**
- **Mintari**: Complete NFT creation platform
- **Reward Logic**: Full implementation in Mintari
- **SDK Architecture**: Designed and prototyped
- **Partner Integration**: Flow ecosystem connections
- **Analytics System**: Sponsor engagement tracking

#### 🔄 **What's Next (Post-Hackathon)**
- **SDK Deployment**: Publish AfterMint as public npm package
- **Documentation**: Complete developer guides
- **Partner Onboarding**: Formal Flow ecosystem partnerships
- **Multi-project Integration**: SDK adoption across Flow projects

## 🛣️ Roadmap

### Phase 1: Hackathon (✅ Complete)
- [x] **Mintari Platform** - Showcase application
- [x] **Reward System Logic** - Core functionality
- [x] **SDK Architecture** - Technical foundation
- [x] **Flow Integration** - Real blockchain minting

### Phase 2: SDK Launch (Q4 2025)
- [ ] **AfterMint SDK** - Public npm package
- [ ] **Developer Documentation** - Integration guides
- [ ] **Partner API** - Ecosystem connections
- [ ] **Analytics Dashboard** - Project insights

### Phase 3: Ecosystem Growth (Q1 2026)
- [ ] **10+ Flow Projects** - SDK adoption
- [ ] **Zircuit extension** - Extend support to Zircuit and other EVM chains
- [ ] **Advanced Rewards** - Gamification features
- [ ] **Mobile SDK** - React Native support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ for the Flow ecosystem</p>
  <p>
    <a href="https://flow.com">
      <img src="https://assets.website-files.com/5f6294c0c7a8cdd643b1c820/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.svg" alt="Flow" width="100">
    </a>
  </p>
</div>
