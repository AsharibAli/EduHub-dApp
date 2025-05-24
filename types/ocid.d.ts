declare module '@opencampus/ocid-connect-js' {
  export interface AuthState {
    isAuthenticated: boolean;
    idToken?: string;
    accessToken?: string;
    error?: Error;
    OCId?: string;
    ethAddress?: string;
    // Add other properties as needed
  }

  export interface OCAuth {
    getAuthState(): {
      OCId: string;
      ethAddress: string;
      isAuthenticated: boolean;
      accessToken?: string;
      idToken?: string;
      // Add other properties as needed
    };
    signInWithRedirect(options: { state: string }): Promise<void>;
    handleLoginRedirect(): Promise<any>;
    logout(options?: { returnUrl?: string }): Promise<void>;
  }

  export interface UseOCAuthResult {
    isInitialized: boolean;
    authState: AuthState;
    ocAuth: OCAuth;
  }

  export function useOCAuth(): UseOCAuthResult;

  export interface LoginCallBackProps {
    successCallback?: (authState: AuthState) => void;
    errorCallback?: (error: Error) => void;
    customErrorComponent?: React.ComponentType;
    customLoadingComponent?: React.ComponentType;
  }

  export function LoginCallBack(props: LoginCallBackProps): JSX.Element;

  export interface OCConnectProps {
    opts: {
      clientId?: string;
      redirectUri: string;
      referralCode?: string;
      storageType?: 'cookie' | 'localStorage';
      domain?: string;
      sameSite?: boolean;
    };
    sandboxMode?: boolean;
    children: React.ReactNode;
  }

  export function OCConnect(props: OCConnectProps): JSX.Element;

  export class OCAuthSandbox implements OCAuth {
    constructor(options?: { clientId?: string });
    getAuthState(): {
      OCId: string;
      ethAddress: string;
      isAuthenticated: boolean;
      accessToken?: string;
      idToken?: string;
    };
    signInWithRedirect(options: { state: string }): Promise<void>;
    handleLoginRedirect(): Promise<any>;
    logout(options?: { returnUrl?: string }): Promise<void>;
  }

  export class OCAuthLive implements OCAuth {
    constructor(options: { clientId: string });
    getAuthState(): {
      OCId: string;
      ethAddress: string;
      isAuthenticated: boolean;
      accessToken?: string;
      idToken?: string;
    };
    signInWithRedirect(options: { state: string }): Promise<void>;
    handleLoginRedirect(): Promise<any>;
    logout(options?: { returnUrl?: string }): Promise<void>;
  }
} 