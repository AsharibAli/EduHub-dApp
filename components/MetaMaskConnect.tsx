"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Web3 from "web3";
import { toast } from "@/components/ui/use-toast";

interface MetaMaskConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  className?: string;
  storageKey?: string; // Custom storage key to avoid conflicts
}

const EDU_CHAIN_ID = "0xa3c3";

// Utility function to get MetaMask provider specifically
const getMetaMaskProvider = () => {
  if (typeof window.ethereum === "undefined") {
    return null;
  }

  // If there are multiple providers, find MetaMask specifically
  if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
    return (
      window.ethereum.providers.find((provider) => provider.isMetaMask) ||
      window.ethereum
    );
  }

  // If MetaMask is the main provider or only provider
  return window.ethereum;
};

export const MetaMaskConnect: React.FC<MetaMaskConnectProps> = ({
  onConnect,
  onDisconnect,
  className = "bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg touch-manipulation",
  storageKey = "walletAddress", // Default storage key for backward compatibility
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    // Check localStorage for existing connection
    const storedAddress = localStorage.getItem(storageKey);
    if (storedAddress) {
      checkConnection(storedAddress);
    }

    // Add event listeners for account and network changes
    const ethereum = getMetaMaskProvider();
    if (ethereum) {
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleChainChanged);

      return () => {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
        ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]); // Only storageKey as dependency to avoid complex callback issues

  const checkConnection = async (storedAddress: string) => {
    const ethereum = getMetaMaskProvider();
    if (ethereum) {
      try {
        const accounts = await ethereum.request({
          method: "eth_accounts",
        });

        if (
          accounts[0] &&
          accounts[0].toLowerCase() === storedAddress.toLowerCase()
        ) {
          const chainId = await ethereum.request({
            method: "eth_chainId",
          });
          if (chainId === EDU_CHAIN_ID) {
            setAccountAddress(accounts[0]);
            setIsConnected(true);
            onConnect?.(accounts[0]);
          } else {
            await switchToOpenCampusNetwork();
          }
        } else {
          handleDisconnect();
        }
      } catch (error) {
        console.error("Error checking connection:", error);
        handleDisconnect();
      }
    }
  };

  const switchToOpenCampusNetwork = async () => {
    const ethereum = getMetaMaskProvider();
    if (ethereum) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: EDU_CHAIN_ID }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: EDU_CHAIN_ID,
                  chainName: "EDU Chain",
                  nativeCurrency: {
                    name: "EDU",
                    symbol: "EDU",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc.edu-chain.raas.gelato.cloud"],
                  blockExplorerUrls: ["https://educhain.blockscout.com/"],
                },
              ],
            });
          } catch (addError) {
            console.error("Failed to add Open Campus Codex network:", addError);
            toast({
              variant: "destructive",
              title: "Network Error",
              description: "Failed to add Open Campus Codex network",
            });
          }
        } else {
          console.error(
            "Failed to switch to Open Campus Codex network:",
            switchError
          );
          toast({
            variant: "destructive",
            title: "Network Error",
            description: "Failed to switch to Open Campus Codex network",
          });
        }
      }
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else if (accounts[0] !== accountAddress) {
      setAccountAddress(accounts[0]);
      setIsConnected(true);
      localStorage.setItem(storageKey, accounts[0]);
      onConnect?.(accounts[0]);
      toast({
        title: "Account Changed",
        description: `Connected to ${accounts[0].slice(
          0,
          6
        )}...${accounts[0].slice(-4)}`,
      });
    }
  };

  const handleChainChanged = async (chainId: string) => {
    if (chainId !== EDU_CHAIN_ID) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Please connect to Open Campus Codex network",
      });
      await switchToOpenCampusNetwork();
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAccountAddress(undefined);
    localStorage.removeItem(storageKey);
    onDisconnect?.();
  };

  const connectWallet = async () => {
    console.log("=== MetaMask Connection Debug ===");
    const ethereum = getMetaMaskProvider();
    console.log("MetaMask provider found:", !!ethereum);
    console.log("Provider details:", ethereum);

    if (!ethereum) {
      console.log("MetaMask not detected");
      toast({
        variant: "destructive",
        title: "MetaMask Required",
        description: "Please install MetaMask to use this application",
      });
      return;
    }

    try {
      console.log("Requesting MetaMask accounts...");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("MetaMask accounts received:", accounts);

      if (accounts.length === 0) {
        throw new Error("No accounts returned from MetaMask");
      }

      const account = accounts[0];
      console.log("Setting account:", account);

      setAccountAddress(account);
      setIsConnected(true);
      localStorage.setItem(storageKey, account);
      onConnect?.(account);

      console.log("Wallet connected successfully:", account);

      toast({
        title: "Wallet Connected",
        description: `Connected to ${account.slice(0, 6)}...${account.slice(
          -4
        )}`,
      });
    } catch (error: any) {
      console.error("=== MetaMask Connection Error ===");
      console.error("Error object:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);

      // Handle specific MetaMask errors
      if (error.code === 4001) {
        toast({
          variant: "destructive",
          title: "Connection Rejected",
          description: "You rejected the connection request. Please try again.",
        });
      } else if (error.code === -32002) {
        toast({
          variant: "destructive",
          title: "Request Pending",
          description:
            "MetaMask is already processing a request. Please check MetaMask.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description:
            error.message || "Failed to connect wallet. Please try again.",
        });
      }
    }
  };

  if (isConnected && accountAddress) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 text-center">
          <h3 className="text-sm font-semibold text-teal-700 mb-2">
            Wallet Connected
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 break-all">
            <span className="font-mono">
              {accountAddress.slice(0, 6)}...{accountAddress.slice(-6)}
            </span>
          </p>
          <Button
            onClick={handleDisconnect}
            variant="outline"
            size="sm"
            className="mt-3 text-xs touch-manipulation"
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Button
        className={`w-full ${className}`}
        onClick={() => {
          console.log("MetaMask button clicked!");
          connectWallet();
        }}
        variant="default"
      >
        Connect with MetaMask
      </Button>
    </div>
  );
};
