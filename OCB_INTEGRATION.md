# Open Campus Badges (OCB) Integration

This document outlines the integration of Open Campus Badges (OCB) into the EduHub dApp.

## Overview

The EduHub dApp now supports both Open Campus Achievements (OCA) and Open Campus Badges (OCB). The OCB integration allows users to claim badges that are eligible for Yuzu Season 3 points.

## Environment Configuration

Add the following environment variables to your `.env.local` file:

```bash
# OCB API Key (provided by Open Campus)
OCB_API_KEY=7884e98a-3460-4cb4-a73c-c4d7625ff7de

# Badge Icon URL
BADGE_ICON_URL=https://i.ibb.co/CpD567YZ/badge-icon.png

# Environment (sandbox for testing, production for live)
OCA_ENVIRONMENT=sandbox
```

## EduPlus Badge Details

- **Badge Name**: EduPlus
- **Description**: Earn this badge by completing the 'Intro to Blockchain' and 'Intro to OCID & OCA' guides on EduHub, then mint verifiable credentials on-chain to prove your learning.
- **Yuzu Points**: 1,000 points per badge
- **Total Allocation**: 600,000 points (600 badges maximum)
- **Requirements**: 
  1. Complete Blockchain Workshop (claim bootcamp credential)
  2. Complete OCID & OCA Tutorial (claim tutorial credential)

## Badge Issuance Options

### 1. Issue to OCID Profile
- Badge appears in user's Open Campus ID profile
- Visible at: `https://id.opencampus.xyz/public/credentials?username={OCID}`

### 2. Issue to Wallet Address (Yuzu Eligible)
- Badge is issued directly to user's wallet address
- **Required for Yuzu Season 3 points eligibility**
- Uses `holderAddress` instead of `holderOcId` in API payload

## API Structure

### OCB API Endpoint
```
POST https://api.vc.staging.opencampus.xyz/issuer/vc
```

### Headers
```
X-API-KEY: 7884e98a-3460-4cb4-a73c-c4d7625ff7de
Content-Type: application/json
```

### Payload for OCID Issuance
```json
{
  "credentialPayload": {
    "validFrom": "2023-12-10T16:00:00.000Z",
    "awardedDate": "2023-12-10T16:00:00.000Z",
    "description": "Earn this badge by completing the 'Intro to Blockchain' and 'Intro to OCID & OCA' guides on EduHub, then mint verifiable credentials on-chain to prove your learning.",
    "credentialSubject": {
      "type": "Person",
      "image": "https://i.ibb.co/CpD567YZ/badge-icon.png",
      "profileUrl": "https://id.opencampus.xyz/profile/user.edu",
      "achievement": {
        "name": "EduPlus",
        "identifier": "eduhub:eduplus:timestamp",
        "description": "Completed both Blockchain Workshop and OCID & OCA Tutorial on EduHub",
        "achievementType": "Badge"
      }
    }
  },
  "collectionSymbol": "ocbadge",
  "holderOcId": "user.edu"
}
```

### Payload for Wallet Issuance (Yuzu Eligible)
```json
{
  "credentialPayload": {
    "validFrom": "2023-12-10T16:00:00.000Z",
    "awardedDate": "2023-12-10T16:00:00.000Z",
    "description": "Earn this badge by completing the 'Intro to Blockchain' and 'Intro to OCID & OCA' guides on EduHub, then mint verifiable credentials on-chain to prove your learning.",
    "credentialSubject": {
      "type": "Person",
      "image": "https://i.ibb.co/CpD567YZ/badge-icon.png",
      "achievement": {
        "name": "EduPlus",
        "identifier": "eduhub:eduplus:timestamp",
        "description": "Completed both Blockchain Workshop and OCID & OCA Tutorial on EduHub",
        "achievementType": "Badge"
      }
    }
  },
  "collectionSymbol": "ocbadge",
  "holderAddress": "0xabcD12345..."
}
```

## Implementation Details

### New Components
- `BadgeClaimer.tsx` - OCB-specific claiming component with wallet/OCID options
- `/eduplus` page - Dedicated page for EduPlus badge claiming

### Updated Components
- `app/api/issue-credential/route.ts` - Extended to handle OCB issuance
- `lib/oca.ts` - Added OCB functions (`issueBadgeToOCID`, `issueBadgeToWallet`)
- `utils/credentialStorage.ts` - Updated to handle wallet addresses

### Badge Claiming Flow
1. User completes both Workshop and Tutorial
2. System checks completion status via claimed credentials
3. User visits `/eduplus` page to check eligibility
4. If eligible, user can choose to claim badge to OCID or wallet
5. Wallet claims are eligible for Yuzu Season 3 points

### Key Differences from OCA
- Uses `collectionSymbol: "ocbadge"`
- `achievementType: "Badge"` instead of `"Certificate"`
- Can issue to `holderAddress` for Yuzu eligibility
- Badge name must match exactly: "EduPlus"

## Testing

1. Set up environment variables with provided API key
2. Complete both Workshop and Tutorial to claim credentials
3. Visit `/eduplus` page to check eligibility
4. Test badge claiming to both OCID and wallet
5. Verify badge appears in appropriate location

## Production Deployment

Before going to production:
1. Update `OCA_ENVIRONMENT=production`
2. Use production API endpoint: `https://api.vc.opencampus.xyz/issuer/vc`
3. Request production API key from Open Campus team
4. Update badge icon URL to permanent hosting location

## Yuzu Season 3 Compliance

- ✅ Badge name matches submission: "EduPlus"
- ✅ Wallet issuance supported for Yuzu eligibility
- ✅ Uses `collectionSymbol: "ocbadge"`
- ✅ Badge description matches requirements
- ✅ Proper `achievementType: "Badge"`
