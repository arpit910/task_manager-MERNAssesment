import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode; // Accepts nested child components
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg">{children}</div>
    </div>
  );
};

export default AuthLayout;
