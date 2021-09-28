import React from "react";

interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => {
  return <h2>{name}</h2>;
};

export default Header;
