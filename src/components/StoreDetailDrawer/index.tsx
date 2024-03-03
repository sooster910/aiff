import * as React from "react";
import { CustomDrawer } from "../Drawer";
import { Drawer, Text } from "@geist-ui/core";

interface StoreDetailDrawerProps {
  storeInfoOpen: boolean;
  setStoreInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StoreDetailDrawer: React.FC<StoreDetailDrawerProps> = ({
  storeInfoOpen,
  setStoreInfoOpen,
}) => {
  return (
    <CustomDrawer
      placement={"bottom"}
      drawerOpen={storeInfoOpen}
      setDrawerOpen={(v) => setStoreInfoOpen(v)}
    >
      <Drawer.Title>{"스토어 이름 넣기 "}</Drawer.Title>
      <Drawer.Content>
        {/* {store?.description?.split("\r\n").map((v, i) => {
          return (
            <Text
              key={i.toString()}
              font={0.8}
              paddingLeft={0.4}
              p
              b
              margin={0}
              style={{ color: "GrayText" }}
            >
              {v}
            </Text>
          );
        })} */}
      </Drawer.Content>
    </CustomDrawer>
  );
};
