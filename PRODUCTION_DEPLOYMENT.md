# 🚀 Production Deployment Guide

## Pre-Deployment Checklist

### ✅ **1. Environment Variables Setup**

Create a `.env.local` file (or configure in your deployment platform) with:

```bash
# REQUIRED - Get from Open Campus Developer Portal
OCB_API_KEY=your_production_api_key
NEXT_PUBLIC_OCID_CLIENT_ID=your_production_client_id

# REQUIRED - Set to production
OCA_ENVIRONMENT=production

# OPTIONAL - Customize your images
BADGE_ICON_URL=https://your-domain.com/badge-icon.png
CREDENTIAL_IMAGE_URL=https://your-domain.com/credential-image.png
```

### ✅ **2. Open Campus Production Setup**

1. **Request Production API Key:**
   - Complete sandbox testing and recording
   - Submit integration demo to Open Campus team
   - Request production API key via developer portal
   - Wait for approval (typically 3-5 business days)

2. **Update Client ID Authorization:**
   - Ensure your production client ID is authorized for your production domain
   - Update redirect URI to match your production domain

### ✅ **3. Code Verification**

**Security Check:**
- ✅ No hardcoded API keys in source code
- ✅ No hardcoded client IDs in source code
- ✅ All credentials loaded from environment variables
- ✅ Error handling for missing environment variables

**Environment Configuration:**
- ✅ `OCA_ENVIRONMENT=production` switches to production endpoints
- ✅ Profile URLs point to `https://id.opencampus.xyz`
- ✅ API calls go to `https://api.vc.opencampus.xyz/issuer/vc`
- ✅ OCID Connect uses `sandboxMode=false`

## 🔧 **Environment-Specific Behavior**

### **Development/Sandbox Mode**
```bash
OCA_ENVIRONMENT=sandbox  # or not set
```
- **API Endpoint:** `https://api.vc.staging.opencampus.xyz/issuer/vc`
- **Profile URL:** `https://id.sandbox.opencampus.xyz`
- **OCID Connect:** `sandboxMode=true`
- **Redirect URI:** `http://localhost:3000/redirect`

### **Production Mode**
```bash
OCA_ENVIRONMENT=production
```
- **API Endpoint:** `https://api.vc.opencampus.xyz/issuer/vc`
- **Profile URL:** `https://id.opencampus.xyz`
- **OCID Connect:** `sandboxMode=false`
- **Redirect URI:** `https://your-domain.com/redirect`

## 🏷️ **OCB Badge Configuration**

### **EduPlus Badge Details**
- **Collection Symbol:** `"ocbadge"`
- **Badge Name:** `"EduPlus"` (must match exactly)
- **Achievement Type:** `"Badge"`
- **Yuzu Eligibility:** ✅ When issued to wallet address
- **Requirements:** Complete both Workshop and Tutorial

### **Badge Issuance Options**
1. **To OCID Profile:** Visible in user's Open Campus profile
2. **To Wallet Address:** Eligible for Yuzu Season 3 points

## 🚨 **Critical Production Requirements**

### **1. API Key Security**
- Never commit API keys to version control
- Use environment variables or secure secret management
- Rotate keys periodically as recommended by Open Campus

### **2. Domain Authorization**
- Ensure production client ID is authorized for your domain
- Update redirect URIs in Open Campus developer portal
- Test authentication flow thoroughly

### **3. Image Hosting**
- Host badge/credential images on reliable CDN
- Ensure images remain accessible for credential lifetime
- Use HTTPS URLs only

### **4. Error Handling**
- Monitor API responses and error rates
- Implement proper retry logic for transient failures
- Log errors for debugging without exposing sensitive data

## 📊 **Testing Production Setup**

### **Before Go-Live:**
1. **Environment Variables:** Verify all required vars are set
2. **Authentication:** Test OCID login/logout flow
3. **Credential Issuance:** Test both OCA and OCB issuance
4. **Profile Links:** Verify credentials appear in correct profiles
5. **Badge Claiming:** Test both OCID and wallet claiming options

### **Post-Deployment:**
1. **Monitor API Responses:** Check for any 401/403/500 errors
2. **Verify Credentials:** Ensure issued credentials appear in profiles
3. **Test User Flow:** Complete end-to-end user journey
4. **Check Yuzu Integration:** Verify wallet-issued badges count for points

## 🔄 **Switching from Sandbox to Production**

1. **Update Environment:**
   ```bash
   OCA_ENVIRONMENT=production
   ```

2. **Replace API Keys:**
   ```bash
   OCB_API_KEY=your_production_key
   NEXT_PUBLIC_OCID_CLIENT_ID=your_production_client_id
   ```

3. **Deploy and Test:**
   - Deploy to production environment
   - Test authentication flow
   - Issue test credentials
   - Verify they appear in production profiles

4. **Go Live:**
   - Announce to users
   - Monitor for any issues
   - Be prepared to rollback if needed

## 🆘 **Troubleshooting Production Issues**

### **Common Issues:**

**Authentication Fails:**
- Check client ID authorization for your domain
- Verify redirect URI matches configuration
- Ensure `sandboxMode=false` in production

**Credentials Don't Appear:**
- Verify `OCA_ENVIRONMENT=production`
- Check API key has production permissions
- Ensure profile URLs point to production

**API Errors:**
- Check API key validity and permissions
- Verify payload format matches requirements
- Monitor rate limits and quota usage

### **Support Contacts:**
- Open Campus Developer Support
- Community Forum: [Link from documentation]
- Emergency contact: As provided by Open Campus team

## 📈 **Monitoring & Analytics**

Consider implementing:
- API response time monitoring
- Error rate tracking
- Credential issuance success rates
- User authentication metrics
- Badge claiming analytics

---

**🎯 Ready for Production!** Once you've completed this checklist, your EduHub dApp will be ready for production deployment with full OCA and OCB integration.
