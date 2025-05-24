import Image from "next/image";
import React from "react";
import Link from "next/link";
import { GithubIcon, HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-teal-800 to-teal-900 text-white shadow-inner">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center">
          <div className="flex flex-row items-center">
            <p className="flex items-center text-base md:text-lg font-medium">
              Built with <HeartIcon className="w-5 h-5 mx-2 text-white" /> by{" "}
              <a
                href="https://eduhub.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold ml-2 hover:underline"
              >
                EduHub
              </a>
            </p>

            <span className="mx-4 text-teal-300">|</span>

            <div className="flex items-center text-base md:text-lg font-medium">
              <span>Follow us on</span>
              <a
                href="https://x.com/eduhub__"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 hover:underline flex items-center"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-5 h-5 mx-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/eduhub_tg"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 hover:underline flex items-center"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5 mx-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
                </svg>
              </a>
              <a
                href="https://github.com/eduhub-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 hover:underline flex items-center"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5 mx-1" />
              </a>
            </div>

            <span className="mx-4 text-teal-300">|</span>

            <p className="text-sm md:text-base ">
              Powered by{" "}
              <a
                href="https://opencampus.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-bold"
              >
                Open Campus
              </a>{" "}
              and{" "}
              <a
                href="https://educhain.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-bold"
              >
                EduChain
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
