// Header.tsx
import React from "react";

interface HeaderProps {
  user: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header>
      {user ? <p>Welcome, {JSON.stringify(user)}!</p> : <p>Please sign in</p>}
    </header>
  );
};

export default Header;
