# Mintari + AfterMint SDK

**AfterMint** is a chain-agnostic SDK for post-mint NFT rewards.
**Mintari** is a demo NFT project using AfterMint to showcase dynamic token-gated utilities.

---

## 🧩 Tech Stack

| Component                      | Stack                                 |
| ------------------------------ | ------------------------------------- |
| Frontend (Mintari)             | Next.js, TailwindCSS                  |
| Backend (API/Image Processing) | Django, Pillow                        |
| Blockchain SDK                 | AfterMint SDK                         |
| Storage                        | Walrus (IPFS Upload)                  |
| Wallet/Auth                    | Dynamic, Lit Protocol                 |
| Blockchain                     | Flow (current), extensible to Zircuit |

---

## 🔍 Overview

### Mintari Flow:

1. Upload a photo.
2. AI transforms it into Ghibli-style art.
3. Mint it on Flow.
4. Receive token-gated rewards powered by AfterMint SDK.

### AfterMint SDK:

* Wallet connect
* Mint detection
* Token-gated modals
* Sponsor rewards delivery

---

## 📁 Project Structure

```
├── mintari/             # 🎨 Frontend NFT minting app (Next.js + AfterMint SDK)
│   ├── pages/
│   ├── components/
│   ├── public/
│   └── styles/
├── aftermint-sdk/       # 🔌 Modular, chain-agnostic TypeScript SDK
│   ├── src/
│   ├── dist/
│   └── package.json
├── backend/             # 🛠️ Legacy Django setup (image processing, Ghibli-style AI, IPFS upload)
│   └── nftmint/
├── README.md
└── .gitignore

```

---

## 🚀 Setup Instructions

### 1. 🖼️ `mintari` (Next.js App)

```bash
cd mintari
npm install
npm run dev
```

> This runs the user-facing app.

#### Available Pages:

* `/upload` – Upload your image
* `/preview` – View Ghibli-style transformed image
* `/mint` – Mint your NFT
* `/success` – Confirmation screen
* `/reward` – Token-gated utility screen

> 💡 Make sure to wrap your app in `AfterMintProvider` and use hooks like `useWallet` and `useRewardGate` to detect wallet connection, NFT mint, and trigger rewards.

---

### 2. 🔌 `aftermint-sdk` (TypeScript SDK)

```bash
cd aftermint-sdk
npm install
npm run build
npm link    # For local development
```

Then, inside `mintari`:

```bash
cd mintari
npm link aftermint-sdk
```

#### SDK Features:

* ✅ **Wallet Connect** via [Dynamic](https://www.dynamic.xyz/)
* ✅ **NFT Mint Detection** via [Flow Blockchain](https://flow.com/)
* ✅ **Reward Modals** gated via [Lit Protocol](https://litprotocol.com/)
* ✅ JSON-configurable utility drops (e.g. coupons, tools, bonus content)

---

### 3. 🛠️ `backend` (Django – Optional AI Image Transformer)

Used for:

* 🎨 Converting user-uploaded photos into **Ghibli-style illustrations**
* 📤 Uploading final images to **IPFS** via [Walrus](https://docs.walrus.ai/)
* 🔗 Returning the **IPFS URI** to `mintari` for minting

#### Run the backend locally:

```bash
cd backend
python manage.py runserver
```

---

## 🎁 Rewards System

* Offers are fetched from sponsor-specific JSON feed.
* Modal pops up with token-gated rewards using Lit Protocol.
* Sponsored by: **Flow**, **Zircuit**, **Walrus**, **Dynamic**.

---

## 💡 Example Use Case

> Upload your photo → get a unique Ghibli-style NFT → mint it → receive discounts, content, and tools from real sponsors.

---

## 📜 License

MIT License.

---
