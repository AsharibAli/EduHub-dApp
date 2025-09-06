"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractJson from "@/contracts/Greeter.sol/Greeter.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { Contracts } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MetaMaskConnect } from "@/components/MetaMaskConnect";
import { AlertCircle } from "lucide-react";
import InfoAlert from "@/components/InfoAlert";
import Link from "next/link";

interface DecodedToken {
  edu_username: string;
  [key: string]: any;
}

const App: React.FC = () => {
  const { isInitialized, authState } = useOCAuth();
  const isConnected = isInitialized && authState?.isAuthenticated;
  const [displayMessage, setDisplayMessage] = useState<string>("");
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [contracts, setContracts] = useState<Contracts | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [txnHash, setTxnHash] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [ocidUsername, setOcidUsername] = useState<string | null>(null);
  const [accountAddress, setAccountAddress] = useState<string | undefined>(
    undefined
  );
  const [isMetaMaskConnected, setIsMetaMaskConnected] =
    useState<boolean>(false);

  useEffect(() => {
    if (isConnected && authState?.idToken) {
      const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
      setOcidUsername(decodedToken.edu_username);
    } else {
      setOcidUsername(null);
    }
  }, [isConnected, authState?.idToken]);

  const handleConnect = async (address: string) => {
    try {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      setAccountAddress(address);
      setIsMetaMaskConnected(true);

      const contractAddress = "0x48D2d71e26931a68A496F66d83Ca2f209eA9956E";
      const Greeter = new web3Instance.eth.Contract(
        contractJson.abi,
        contractAddress
      ) as Contracts;
      Greeter.setProvider(window.ethereum);
      setContracts(Greeter);
    } catch (error) {
      console.error("Failed to initialize web3 or contract:", error);
    }
  };

  const handleDisconnect = () => {
    setWeb3(undefined);
    setContracts(undefined);
    setAccountAddress(undefined);
    setIsMetaMaskConnected(false);
  };

  const receive = async () => {
    if (contracts) {
      try {
        const displayMessage = await contracts.methods.read().call();
        setDisplayMessage(displayMessage);
      } catch (error) {
        console.error("Failed to read from contract:", error);
      }
    }
  };

  const send = async () => {
    const getMessage = (document.getElementById("message") as HTMLInputElement)
      .value;
    if (!getMessage.trim()) {
      alert("Message cannot be empty.");
      return;
    }
    setLoading(true);
    setShowMessage(true);
    if (contracts && accountAddress) {
      try {
        await contracts.methods
          .write(getMessage)
          .send({ from: accountAddress })
          .on("transactionHash", (hash: string) => {
            setTxnHash(hash);
          });
        await receive();
      } catch (error) {
        console.error("Failed to write to contract:", error);
      }
    }
    setLoading(false);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow w-full mt-20 sm:mt-24 px-4 py-6">
        <Card className="w-full max-w-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 sm:mt-4 leading-tight">
              📚 Simple Greetings Dapp 📚
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center mt-4 space-y-4 sm:space-y-6">
            {!isConnected ? (
              <div className="w-full text-center">
                <InfoAlert
                  variant="warning"
                  icon={AlertCircle}
                  className="mb-4"
                >
                  <span className="text-sm sm:text-base">
                    Connect your OCID to interact with this dApp.
                  </span>
                </InfoAlert>
                <Link href="/user?redirectTo=/v1/simple-greeting-dapp">
                  <LoginButton className="w-full sm:w-auto" />
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-lg sm:text-xl">
                  👉Welcome,{" "}
                  <Link href="/user">
                    <strong className="text-teal-600 hover:underline">
                      {ocidUsername}👈
                    </strong>
                  </Link>{" "}
                </h1>
              </div>
            )}

            {isConnected && (
              <div className="w-full">
                <MetaMaskConnect
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              </div>
            )}

            {isConnected && isMetaMaskConnected && (
              <div className="flex flex-col items-center w-full space-y-4">
                <input
                  type="text"
                  placeholder="Enter a message to put onchain"
                  id="message"
                  className="w-full max-w-md bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-200 focus:bg-white focus:border-teal-500 text-sm sm:text-base outline-none text-gray-700 px-4 py-3 transition-colors duration-200 ease-in-out touch-manipulation"
                />
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg flex-1 touch-manipulation"
                    onClick={send}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send"}
                  </Button>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg flex-1 touch-manipulation"
                    onClick={receive}
                  >
                    Receive
                  </Button>
                </div>

                {displayMessage && (
                  <div className="w-full max-w-md bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <h3 className="text-sm font-semibold text-teal-700 mb-2">
                      Last Message:
                    </h3>
                    <p className="text-sm text-gray-700 break-words">
                      {displayMessage}
                    </p>
                  </div>
                )}

                {showMessage && (
                  <div className="w-full max-w-md text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      Processing transaction...
                    </p>
                    {txnHash && (
                      <>
                        <p className="text-xs text-gray-500">
                          Txn hash:{" "}
                          <a
                            className="text-teal-600 hover:underline break-all"
                            href={
                              "https://educhain.blockscout.com/tx/" + txnHash
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {txnHash.slice(0, 10)}...{txnHash.slice(-8)}
                          </a>
                        </p>
                        <p className="text-xs text-gray-500">
                          Please wait till the transaction is completed :)
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default App;
