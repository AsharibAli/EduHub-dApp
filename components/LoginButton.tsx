"use client";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import OCButton from "./OCButton";
import { usePathname } from "next/navigation";

interface LoginButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  size = "md",
  className,
}) => {
  const { ocAuth } = useOCAuth();
  const pathname = usePathname();

  const handleLogin = async () => {
    try {
      // Check if there's a redirectTo path stored in localStorage
      const redirectTo = localStorage.getItem("redirectTo");

      // If redirectTo exists, use it as the return path, otherwise use current path
      localStorage.setItem("previousPath", redirectTo || pathname || "/");

      await ocAuth.signInWithRedirect({
        state: "opencampus",
      });
    } catch (error) {
      console.error("Error initiating login:", error);
    }
  };

  return (
    <OCButton size={size} onClick={handleLogin} className={className}>
      Connect OCID
    </OCButton>
  );
};

export default LoginButton;
