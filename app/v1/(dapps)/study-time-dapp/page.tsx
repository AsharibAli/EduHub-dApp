"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractJson from "@/contracts/StudyTracker.sol/StudyTracker.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { Contracts } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, AlertCircle } from "lucide-react";
import { MetaMaskConnect } from "@/components/MetaMaskConnect";
import InfoAlert from "@/components/InfoAlert";
import Link from "next/link";

interface DecodedToken {
  edu_username: string;
  [key: string]: any;
}

const StudyTracker: React.FC = () => {
  const { isInitialized, authState } = useOCAuth();
  const isConnected = isInitialized && authState.isAuthenticated;
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [contracts, setContracts] = useState<Contracts | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [txnHash, setTxnHash] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [ocidUsername, setOcidUsername] = useState<string | null>(null);
  const [isStudying, setIsStudying] = useState<boolean>(false);
  const [studyTime, setStudyTime] = useState<number>(0);
  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
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

      const contractAddress = "0x00002037A09AB6c78eE38b2D51B2795a8C528589";
      const StudyTracker = new web3Instance.eth.Contract(
        contractJson.abi,
        contractAddress
      ) as Contracts;
      StudyTracker.setProvider(window.ethereum);
      setContracts(StudyTracker);

      // Get initial total study time
      const totalTime = await StudyTracker.methods
        .getTotalStudyTime()
        .call({ from: address });
      setTotalStudyTime(parseInt(totalTime));
    } catch (error) {
      console.error("Failed to initialize web3 or contract:", error);
    }
  };

  const handleDisconnect = () => {
    setWeb3(undefined);
    setContracts(undefined);
    setAccountAddress(undefined);
    setIsMetaMaskConnected(false);
    setIsStudying(false);
    setStudyTime(0);
    setTotalStudyTime(0);
    setStartTime(null);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying]);

  const toggleStudyTimer = async () => {
    if (!isStudying) {
      setStartTime(Date.now());
      setIsStudying(true);
    } else {
      setIsStudying(false);
      if (startTime) {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        await recordStudySession(duration);
      }
    }
  };

  const recordStudySession = async (duration: number) => {
    setLoading(true);
    setShowMessage(true);
    if (contracts && accountAddress) {
      try {
        await contracts.methods
          .recordStudySession(duration)
          .send({ from: accountAddress })
          .on("transactionHash", (hash: string) => {
            setTxnHash(hash);
          });
        await getTotalStudyTime();
      } catch (error) {
        console.error("Failed to record study session:", error);
      }
    }
    setLoading(false);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const getTotalStudyTime = async () => {
    if (contracts && accountAddress) {
      try {
        const totalTime = await contracts.methods
          .getTotalStudyTime()
          .call({ from: accountAddress });
        setTotalStudyTime(parseInt(totalTime));
      } catch (error) {
        console.error("Failed to get total study time:", error);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow w-full mt-24 px-4">
        <Card className="w-full max-w-2xl p-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold mt-4">
              📚 Study Time Tracker Dapp 📚
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
                  Connect your OCID to track your study time.
                </InfoAlert>
                <Link href="/user?redirectTo=/v1/study-time-dapp">
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
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-6 h-6" />
                  <span className="text-xl">
                    Current Session: {formatTime(studyTime)}
                  </span>
                </div>
                <div className="text-lg">
                  Total Study Time: {formatTime(totalStudyTime)}
                </div>
                <Button
                  className={`${
                    isStudying
                      ? "bg-red-500 hover:bg-red-700"
                      : "bg-teal-400 hover:bg-teal-700"
                  } text-black font-bold py-2 px-4 rounded-md`}
                  onClick={toggleStudyTimer}
                >
                  {isStudying ? "Stop Studying" : "Start Studying"}
                </Button>
                {showMessage && (
                  <>
                    <p className="text-center text-sm">
                      Recording study session...
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

export default StudyTracker;
