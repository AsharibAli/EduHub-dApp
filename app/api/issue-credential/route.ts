import { NextRequest, NextResponse } from 'next/server';

// OCA API endpoints
const OCA_API_SANDBOX = 'https://api.vc.staging.opencampus.xyz/issuer/vc';
const OCA_API_PRODUCTION = 'https://api.vc.opencampus.xyz/issuer/vc';

// Get environment variables
const OCA_API_KEY = process.env.OCA_API_KEY;
const OCA_ENVIRONMENT = process.env.OCA_ENVIRONMENT || 'sandbox';
const CREDENTIAL_IMAGE_URL = process.env.CREDENTIAL_IMAGE_URL || 'https://eduhub.dev/eduhub.png';

// Debug info for env variables
console.log('======== ENV VARIABLES CHECK ========');
console.log('OCA_ENVIRONMENT:', OCA_ENVIRONMENT);
console.log('CREDENTIAL_IMAGE_URL is set:', !!CREDENTIAL_IMAGE_URL);
console.log('OCA_API_KEY is set:', !!OCA_API_KEY);
console.log('OCA_API_KEY length:', OCA_API_KEY ? OCA_API_KEY.length : 0);

// Use appropriate API URL based on environment
const OCA_API_URL = OCA_ENVIRONMENT === 'production' ? OCA_API_PRODUCTION : OCA_API_SANDBOX;
console.log('Using OCA API URL:', OCA_API_URL);

// Get sandbox or production profile URL base
const PROFILE_URL_BASE = OCA_ENVIRONMENT === 'production' 
  ? 'https://id.opencampus.xyz/profile/' 
  : 'https://id.sandbox.opencampus.xyz/profile/';

// Simple in-memory store for issued credentials
// Format: { [holderOcId]: { [credentialType]: timestamp } }
// In a production app, this should be replaced with a proper database
const issuedCredentials: Record<string, Record<string, number>> = {};

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request
    console.log('======== CREDENTIAL REQUEST RECEIVED ========');
    
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { credentialType, holderOcId, userName, userEmail, alreadyClaimed } = body;
    
    if (!holderOcId || !userName || !userEmail) {
      console.error('Missing required parameters:', { holderOcId, userName, userEmail });
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Check if the client reports this credential was already claimed
    if (alreadyClaimed === true) {
      console.log(`Client reported credential already claimed: ${credentialType} for user ${holderOcId}`);
      return NextResponse.json(
        { 
          success: false,
          message: 'Credential already claimed',
          alreadyIssued: true
        },
        { status: 409 } // Conflict status code
      );
    }

    // Check if API key is configured
    if (!OCA_API_KEY) {
      console.error('OCA_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'API key not configured. Please set the OCA_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Check if this user already has this credential type (server-side check)
    if (issuedCredentials[holderOcId] && issuedCredentials[holderOcId][credentialType]) {
      console.log(`Credential of type ${credentialType} already issued to user ${holderOcId} (server-side check)`);
      return NextResponse.json(
        { 
          success: false,
          message: 'Credential already issued',
          alreadyIssued: true,
          issuedAt: new Date(issuedCredentials[holderOcId][credentialType]).toISOString()
        },
        { status: 409 } // Conflict status code
      );
    }

    console.log('Processing credential request with params:', { credentialType, holderOcId, userName, userEmail });
    
    // Format credentialPayload based on OCA API documentation
    // https://devdocs.educhain.xyz/start-building/open-campus-achievements/api-specifications
    let credentialPayload;
    
    // Get current date in ISO format for the timestamps
    const currentDate = new Date().toISOString();
    
    // Format payload based on credential type
    if (credentialType === 'bootcamp') {
      credentialPayload = {
        validFrom: currentDate,
        awardedDate: currentDate,
        description: "Completed the Educhain Web3 Developer Bootcamp",
        credentialSubject: {
          name: userName,
          type: "Person",
          email: userEmail,
          image: CREDENTIAL_IMAGE_URL,
          profileUrl: `${PROFILE_URL_BASE}${holderOcId}`,
          achievement: {
            name: "Web3 Developer Bootcamp",
            identifier: `edukit:bootcamp:${Date.now()}`,
            description: "Successfully completed the Web3 Developer Bootcamp",
            achievementType: "Certificate"
          }
        }
      };
    } else {
      // Default tutorial credential
      credentialPayload = {
        validFrom: currentDate,
        awardedDate: currentDate,
        description: "Completed the OCID and OCA Integration Tutorial",
        credentialSubject: {
          name: userName,
          type: "Person",
          email: userEmail,
          image: CREDENTIAL_IMAGE_URL,
          profileUrl: `${PROFILE_URL_BASE}${holderOcId}`,
          achievement: {
            name: "OCID & OCA Integration Master",
            identifier: `edukit:${Date.now()}`,
            description: "Successfully completed the comprehensive tutorial on integrating OCID Connect and Open Campus Achievements into dApps.",
            achievementType: "Certificate"
          }
        }
      };
    }

    // Exact structure according to docs:
    // https://devdocs.educhain.xyz/start-building/open-campus-achievements/api-specifications
    const payload = {
      credentialPayload: credentialPayload,
      holderOcId: holderOcId
    };

    console.log('======== SENDING TO OCA API ========');
    console.log('OCA API URL:', OCA_API_URL);
    console.log('Request payload:', JSON.stringify(payload, null, 2));
    
    // Debug headers without showing the full API key
    const requestHeaders = {
      'Content-Type': 'application/json',
      'X-API-KEY': OCA_API_KEY ? `${OCA_API_KEY.substring(0, 3)}...${OCA_API_KEY.substring(OCA_API_KEY.length - 3)}` : 'not-set'
    };
    console.log('Request headers (partial):', JSON.stringify(requestHeaders, null, 2));

    // Add a try-catch specifically for the fetch operation
    let ocaResponse;
    try {
      ocaResponse = await fetch(OCA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': OCA_API_KEY || '',
        },
        body: JSON.stringify(payload),
      });
    } catch (fetchError) {
      console.error('Fetch operation failed:', fetchError);
      return NextResponse.json(
        { 
          error: 'Network error when connecting to OCA API',
          message: fetchError instanceof Error ? fetchError.message : String(fetchError)
        },
        { status: 500 }
      );
    }

    // Log response status for debugging
    console.log('======== OCA API RESPONSE ========');
    console.log('Status code:', ocaResponse.status);
    console.log('Status text:', ocaResponse.statusText);
    
    // Log a few important headers without using iterator
    const headers = {
      'content-type': ocaResponse.headers.get('content-type'),
      'content-length': ocaResponse.headers.get('content-length'),
      'date': ocaResponse.headers.get('date')
    };
    console.log('Headers:', headers);
    
    // Handle error responses
    if (!ocaResponse.ok) {
      let errorText = '';
      let errorData = null;
      
      try {
        errorData = await ocaResponse.json();
        errorText = JSON.stringify(errorData, null, 2);
        console.error('OCA API error response (JSON):', errorData);
      } catch (e) {
        try {
          errorText = await ocaResponse.text();
          console.error('OCA API error response (Text):', errorText);
        } catch (textError) {
          errorText = 'Could not parse response body';
          console.error('Failed to read response body:', textError);
        }
      }
      
      return NextResponse.json(
        { 
          error: `OCA API error: HTTP ${ocaResponse.status}`,
          details: errorText,
          data: errorData
        },
        { status: ocaResponse.status }
      );
    }

    // Parse and return the successful response
    const data = await ocaResponse.json();
    console.log('OCA API success response:', JSON.stringify(data, null, 2));
    
    // Store the issued credential in our tracking system
    if (!issuedCredentials[holderOcId]) {
      issuedCredentials[holderOcId] = {};
    }
    issuedCredentials[holderOcId][credentialType] = Date.now();
    
    return NextResponse.json({
      success: true,
      message: 'Credential issued successfully',
      data: data,
      // Send this back so the client can store it in localStorage
      claimRecord: {
        holderOcId,
        credentialType,
        issuedAt: Date.now()
      }
    });
  } catch (error) {
    console.error('======== ERROR IN API ROUTE ========');
    console.error('Error:', error);
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Error issuing credential',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 