import { Drawer, Text } from "@geist-ui/core";
import { DrawerPlacement } from "@geist-ui/core/esm/drawer/helper";
import * as React from "react";

type CustomDrawerProps = {
  placement?: DrawerPlacement;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export const CustomDrawer: React.FunctionComponent<CustomDrawerProps> = ({
  placement,
  drawerOpen,
  setDrawerOpen,
  children,
}) => {
  return (
    <Drawer
      visible={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      placement={placement}
      style={{ width: "500px", margin: "0 auto" }}
    >
      {children}
    </Drawer>
  );
};
