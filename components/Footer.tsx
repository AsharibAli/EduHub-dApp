import Image from "next/image";
import React from "react";
import Link from "next/link";
import { GithubIcon, HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-teal-800 to-teal-900 text-white shadow-inner">
      <div className="container mx-auto px-4 py-4 sm:py-3">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col items-center space-y-4 sm:hidden">
          <div className="flex items-center text-sm font-medium">
            <p className="flex items-center">
              Built with <HeartIcon className="w-4 h-4 mx-2 text-white" /> by{" "}
              <a
                href="https://eduhub.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold ml-2 hover:underline"
              >
                EduHub
              </a>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Follow us:</span>
            <div className="flex items-center space-x-3">
              <a
                href="https://x.com/eduhub__"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform touch-manipulation"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-5 h-5"
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
                className="hover:scale-110 transition-transform touch-manipulation"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5"
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
                className="hover:scale-110 transition-transform touch-manipulation"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs">
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

        {/* Desktop Layout - Horizontal */}
        <div className="hidden sm:flex justify-center items-center">
          <div className="flex flex-row items-center flex-wrap justify-center gap-4 lg:gap-0">
            <p className="flex items-center text-sm md:text-base lg:text-lg font-medium">
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

            <span className="hidden lg:inline mx-4 text-teal-300">|</span>

            <div className="flex items-center text-sm md:text-base lg:text-lg font-medium">
              <span>Follow us on</span>
              <div className="flex items-center ml-2 space-x-2">
                <a
                  href="https://x.com/eduhub__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform touch-manipulation"
                  aria-label="X (Twitter)"
                >
                  <svg
                    className="w-5 h-5"
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
                  className="hover:scale-110 transition-transform touch-manipulation"
                  aria-label="Telegram"
                >
                  <svg
                    className="w-5 h-5"
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
                  className="hover:scale-110 transition-transform touch-manipulation"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            <span className="hidden lg:inline mx-4 text-teal-300">|</span>

            <p className="text-xs md:text-sm lg:text-base">
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
