"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractJson from "@/contracts/AnonymousFeedback.sol/AnonymousFeedback.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LoginButton from "@/components/LoginButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { Contracts } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { MetaMaskConnect } from "@/components/MetaMaskConnect";
import InfoAlert from "@/components/InfoAlert";
import Link from "next/link";

interface DecodedToken {
  edu_username: string;
  [key: string]: any;
}

const FeedbackApp: React.FC = () => {
  const { isInitialized, authState } = useOCAuth();
  const isConnected = isInitialized && authState.isAuthenticated;
  const [feedback, setFeedback] = useState<string>("");
  const [submittedFeedback, setSubmittedFeedback] = useState<string[]>([]);
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [contracts, setContracts] = useState<Contracts | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [txnHash, setTxnHash] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [ocidUsername, setOcidUsername] = useState<string | null>(null);
  const [isEducator, setIsEducator] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string | undefined>(
    undefined
  );
  const [isMetaMaskConnected, setIsMetaMaskConnected] =
    useState<boolean>(false);

  useEffect(() => {
    if (isConnected && authState?.idToken) {
      const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
      setOcidUsername(decodedToken.edu_username);
      setIsEducator(decodedToken.edu_username.startsWith("asharib"));
    } else {
      setOcidUsername(null);
      setIsEducator(false);
    }
  }, [isConnected, authState?.idToken]);

  const handleConnect = async (address: string) => {
    try {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      setAccountAddress(address);
      setIsMetaMaskConnected(true);

      const contractAddress = "0x1f99874fa16F5228b518e475CaF29d340BbA403f";
      const AnonymousFeedback = new web3Instance.eth.Contract(
        contractJson.abi,
        contractAddress
      ) as Contracts;
      AnonymousFeedback.setProvider(window.ethereum);
      setContracts(AnonymousFeedback);
    } catch (error) {
      console.error("Failed to initialize web3 or contract:", error);
    }
  };

  const handleDisconnect = () => {
    setWeb3(undefined);
    setContracts(undefined);
    setAccountAddress(undefined);
    setIsMetaMaskConnected(false);
    setSubmittedFeedback([]);
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) {
      alert("Feedback cannot be empty.");
      return;
    }
    setLoading(true);
    setShowMessage(true);
    if (contracts && accountAddress) {
      try {
        await contracts.methods
          .submitFeedback(feedback)
          .send({ from: accountAddress })
          .on("transactionHash", (hash: string) => {
            setTxnHash(hash);
          });
        setFeedback("");
        alert("Feedback submitted successfully!");
      } catch (error) {
        console.error("Failed to submit feedback:", error);
      }
    }
    setLoading(false);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const getFeedback = async () => {
    if (contracts) {
      try {
        const feedback = await contracts.methods.getAllFeedback().call();
        setSubmittedFeedback(feedback);
      } catch (error) {
        console.error("Failed to get feedback:", error);
      }
    }
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow w-full mt-24 px-4">
        <Card className="w-full max-w-2xl p-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold mt-4">
              📚 Anonymous FB Dapp 📚
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center mt-4 space-y-6">
            {!isConnected ? (
              <div className="w-full text-center">
                <InfoAlert
                  variant="warning"
                  icon={AlertCircle}
                  className="mb-4"
                >
                  Connect your OCID to submit anonymous feedback.
                </InfoAlert>
                <Link href="/user?redirectTo=/v1/anonymous-feedback-dapp">
                  <LoginButton />
                </Link>
              </div>
            ) : (
              <div className="text-center text-xl">
                <h1>
                  👉Welcome,{" "}
                  <Link href="/user">
                    <strong>{ocidUsername}👈</strong>
                  </Link>{" "}
                </h1>
              </div>
            )}

            {isConnected && (
              <MetaMaskConnect
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            )}

            {isConnected && isMetaMaskConnected && (
              <div className="flex flex-col items-center w-full">
                <Textarea
                  placeholder="Enter your anonymous feedback about the course here"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full mb-4"
                />
                <Button
                  className="bg-teal-300 hover:bg-teal-700 text-black font-bold py-1 px-6 rounded"
                  onClick={submitFeedback}
                >
                  Submit Feedback
                </Button>
                {isEducator && (
                  <>
                    <Button
                      className="bg-teal-300 hover:bg-teal-700 text-black font-bold py-1 px-6 rounded mt-4"
                      onClick={getFeedback}
                    >
                      View Feedback
                    </Button>
                    {submittedFeedback.length > 0 && (
                      <div className="mt-4 w-full">
                        <h3 className="text-xl mb-2">Submitted Feedback:</h3>
                        {submittedFeedback.map((fb, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 p-3 rounded mb-2"
                          >
                            {fb}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
                {showMessage && (
                  <>
                    <p className="text-center text-sm mt-6">
                      Submitting feedback...
                    </p>
                    <p className="mt-2 text-xs">
                      Txn hash:{" "}
                      <a
                        className="text-teal-300"
                        href={"https://educhain.blockscout.com/tx/" + txnHash}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {txnHash}
                      </a>
                    </p>
                  </>
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

export default FeedbackApp;
