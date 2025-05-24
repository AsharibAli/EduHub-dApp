"use client";

import { FC, ReactNode } from "react";
import { OCConnect } from "@opencampus/ocid-connect-js";

interface OCIDProviderProps {
  children: ReactNode;
}

const opts = {
  clientId: process.env.NEXT_PUBLIC_OCID_CLIENT_ID,
  redirectUri: "https://app.eduhub.dev/redirect",
  referralCode: "PARTNER6",
};

const OCIDProvider: FC<OCIDProviderProps> = ({ children }) => (
  <OCConnect opts={opts} sandboxMode={false}>
    {children}
  </OCConnect>
);

export default OCIDProvider;
