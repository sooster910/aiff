import * as React from "react";
import { Image } from "@geist-ui/core";

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
            width={4}
            // height={1}
          />
        </div>
      </a>
      <nav>{!auth?.user && <a></a>}</nav>
    </header>
  );
};

export default Navbar;
