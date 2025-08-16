# AfterMint SDK

A simple, pluggable SDK for NFT reward gating with Dynamic wallet integration and Flow blockchain support.

## Features

- 🔗 **Dynamic Wallet Integration**: Seamless wallet connection detection
- 🎧 **Flow NFT Mint Listener**: Real-time mint event detection
- 🎁 **Reward Gating**: Fetch and validate gated offers based on NFT ownership
- 🎨 **Beautiful UI Components**: Pre-built reward modal and components
- ⚡ **Pluggable Architecture**: Easy integration with any React app
- 🚀 **Simple Setup**: No complex dependencies or configurations

## Installation

```bash
npm install aftermint-sdk
```

## Quick Start

### 1. Wrap your app with AfterMintProvider

```tsx
import { AfterMintProvider } from 'aftermint-sdk';

const config = {
  apiKey: 'your-api-key',
  environment: 'development',
  flowNetwork: 'testnet',
  litNetwork: 'cayenne',
  rewardsJsonUrl: '/rewards.json',
  debug: true,
};

function App() {
  return (
    <AfterMintProvider config={config}>
      <YourApp />
    </AfterMintProvider>
  );
}
```

### 2. Use the hook in your components

```tsx
import { useAfterMint } from 'aftermint-sdk';

function MyComponent() {
  const { showRewardModal, rewards, unlockContent } = useAfterMint();

  const handleMintSuccess = (nftData) => {
    // Automatically show reward modal on successful mint
    showRewardModal(nftData);
  };

  return (
    <div>
      <button onClick={() => showRewardModal()}>
        Show Available Rewards ({rewards.length})
      </button>
    </div>
  );
}
```

## Configuration

### AfterMintConfig

```typescript
interface AfterMintConfig {
  apiKey: string;
  environment?: 'development' | 'staging' | 'production';
  flowNetwork?: 'testnet' | 'mainnet';
  litNetwork?: 'cayenne' | 'manzano' | 'habanero';
  rewardsJsonUrl?: string;
  debug?: boolean;
}
```

## Rewards JSON Format

Create a `rewards.json` file in your public directory:

```json
{
  "rewards": [
    {
      "id": "discount-10",
      "title": "10% Off Merchandise",
      "description": "Get 10% off in our store",
      "type": "discount",
      "value": "10% OFF",
      "requirements": {
        "contractAddress": "0x...",
        "minBalance": 1
      },
      "redemptionUrl": "https://store.example.com/discount"
    }
  ]
}
```

## Hooks

### useAfterMint()

Main hook providing access to all SDK functionality:

```typescript
const {
  wallet,           // Current wallet info
  isInitialized,    // SDK initialization status
  rewards,          // Available rewards for user
  showRewardModal,  // Function to show reward modal
  hideRewardModal,  // Function to hide reward modal
  unlockContent,    // Function to unlock gated content
  checkAccess,      // Function to check NFT ownership
} = useAfterMint();
```

### useWallet()

Direct access to wallet information:

```typescript
const wallet = useWallet(); // UserWallet | null
```

### useMintListener()

Listen for NFT mint events:

```typescript
const { mintEvents, startListening, stopListening } = useMintListener({
  contractAddress: '0x...',
  onMint: (event) => console.log('NFT minted!', event),
});
```

### useRewardGate()

Manage reward offers and access control:

```typescript
const {
  rewards,
  availableRewards,
  checkAccess,
  getPersonalizedOffers,
} = useRewardGate({
  rewardsJsonUrl: '/rewards.json',
  wallet,
});
```

## Lit Protocol Integration

The SDK automatically handles content encryption/decryption:

```typescript
// Unlock gated content
const content = await unlockContent('content-id');

// Content is automatically decrypted if user owns required NFTs
```

## Components

### RewardModal

Pre-built modal component for displaying rewards:

```tsx
import { RewardModal } from 'aftermint-sdk';

<RewardModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  rewards={rewards}
  nftData={nftData}
  onRedeemReward={(reward) => handleRedeem(reward)}
/>
```

## Types

All TypeScript types are exported:

```typescript
import type {
  AfterMintConfig,
  RewardOffer,
  NFTMintEvent,
  UserWallet,
  GatedContent,
} from 'aftermint-sdk';
```

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Watch for changes
npm run dev

# Run tests
npm test
```

## License

MIT License - see LICENSE file for details.