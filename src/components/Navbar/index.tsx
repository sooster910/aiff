import * as React from "react";
import Image from 'next/image'
import { useAuth } from "@app/hooks/useAuth";
interface INavbarProps {}
const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const auth = useAuth();
  return (
    <header style={{ display: "flex", justifyContent: "start" }}>
      <a href="/" style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/aiffschool_logo.svg"
            alt="AIFF Logo"
            width={70}
            height={70}
          />
        </div>
      </a>
      <nav>{!auth?.user && <a></a>}</nav>
    </header>
  );
};

export default Navbar;
