"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface DirectMetaMaskConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  className?: string;
  storageKey?: string;
}

const EDU_CHAIN_ID = "0xa3c3";

// Function to detect MetaMask specifically, avoiding other providers
const detectMetaMask = () => {
  if (typeof window === "undefined") return null;

  // Wait for the page to fully load
  if (document.readyState !== "complete") {
    return null;
  }

  const { ethereum } = window;

  if (!ethereum) {
    return null;
  }

  // If there are multiple providers, find MetaMask
  if (ethereum.providers && Array.isArray(ethereum.providers)) {
    const metaMaskProvider = ethereum.providers.find(
      (provider: any) => provider.isMetaMask && !provider.isCoinbaseWallet
    );
    return metaMaskProvider || null;
  }

  // If MetaMask is the main provider
  if (ethereum.isMetaMask && !ethereum.isCoinbaseWallet) {
    return ethereum;
  }

  return null;
};

export const DirectMetaMaskConnect: React.FC<DirectMetaMaskConnectProps> = ({
  onConnect,
  onDisconnect,
  className = "bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg",
  storageKey = "yuzu-badge-wallet",
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const connectDirectly = useCallback(async () => {
    setIsLoading(true);
    console.log("=== Direct MetaMask Connection ===");

    try {
      // Add a small delay to ensure all providers are loaded
      await new Promise((resolve) => setTimeout(resolve, 500));

      const metaMask = detectMetaMask();

      if (!metaMask) {
        throw new Error(
          "MetaMask not found. Please install MetaMask extension."
        );
      }

      console.log("MetaMask provider detected:", metaMask);

      // Request accounts directly from MetaMask
      const accounts = await metaMask.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned from MetaMask");
      }

      const account = accounts[0];
      console.log("Account connected:", account);

      setAccountAddress(account);
      setIsConnected(true);
      localStorage.setItem(storageKey, account);
      onConnect?.(account);

      toast({
        title: "✅ Wallet Connected",
        description: `Connected to ${account.slice(0, 6)}...${account.slice(
          -4
        )}`,
      });
    } catch (error: any) {
      console.error("Connection error:", error);

      let errorMessage = "Failed to connect wallet";

      if (error.code === 4001) {
        errorMessage = "Connection request was rejected";
      } else if (error.code === -32002) {
        errorMessage = "Connection request is already pending in MetaMask";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [onConnect, storageKey]);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    setAccountAddress(undefined);
    localStorage.removeItem(storageKey);
    onDisconnect?.();

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  }, [onDisconnect, storageKey]);

  // Check for existing connection on mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      const storedAddress = localStorage.getItem(storageKey);
      if (!storedAddress) return;

      try {
        // Add delay to ensure providers are loaded
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const metaMask = detectMetaMask();
        if (!metaMask) return;

        const accounts = await metaMask.request({
          method: "eth_accounts",
        });

        if (
          accounts.length > 0 &&
          accounts[0].toLowerCase() === storedAddress.toLowerCase()
        ) {
          setAccountAddress(accounts[0]);
          setIsConnected(true);
          onConnect?.(accounts[0]);
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error("Error checking existing connection:", error);
        localStorage.removeItem(storageKey);
      }
    };

    // Wait for the page to fully load before checking connection
    if (document.readyState === "complete") {
      checkExistingConnection();
    } else {
      window.addEventListener("load", checkExistingConnection);
      return () => window.removeEventListener("load", checkExistingConnection);
    }
  }, [storageKey, onConnect]);

  if (isConnected && accountAddress) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 shadow-sm relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-200 to-green-300 rounded-full -mr-8 -mt-8 opacity-30"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800">
                    MetaMask Connected
                  </h3>
                  <p className="text-sm text-green-600">
                    Wallet ready for badge claiming
                  </p>
                </div>
              </div>
              <div className="text-green-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 mb-3 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-700 font-medium">
                    Wallet Address
                  </p>
                  <p className="text-sm font-mono text-gray-800 break-all">
                    {accountAddress.slice(0, 8)}...{accountAddress.slice(-6)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(accountAddress);
                    toast({
                      title: "Address Copied",
                      description: "Wallet address copied to clipboard",
                    });
                  }}
                  className="p-1 text-green-600 hover:text-green-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
            </div>

            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="w-full border-2 border-green-300 text-green-700 hover:bg-green-100 font-medium transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Disconnect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Button
        className={`w-full ${className}`}
        onClick={connectDirectly}
        disabled={isLoading}
        variant="default"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Connecting...
          </span>
        ) : (
          "🦊 Connect MetaMask"
        )}
      </Button>
    </div>
  );
};
