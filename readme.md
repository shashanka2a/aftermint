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
.
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

## ⚙️ Setup

### Backend (Django)

```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

* Uploads images and stores transformed art.
* Uses `utils.py` with `generate_ghibli_style()` and `walrus_uploader()`.

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

* Uses `AfterMint SDK` for wallet connection and reward logic.
* Integrates backend API to handle image upload and preview.

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

Let me know if you want to add:

* Links to live demo or GitHub
* Contributing instructions
* Deployment notes (Vercel/Docker/etc)

Want this exported as `.md` file too?
