import { Button, Drawer, Grid, Note, Spacer, Text } from "@geist-ui/core";
import { useFormikContext } from "formik";
import * as React from "react";
import { FormValues } from "../SuspenseBooking";
import { ChevronRightCircle, Navigation } from "@geist-ui/icons";
import { STORE_NAME } from "../Forms/BookingFormTest";
import { CustomDrawer } from "@app/components/Drawer";
import { graphql, useLazyLoadQuery } from "react-relay";
import type { SelectStoreQuery as SelectStoreQueryType} from "../../../__generated__/SelectStoreQuery.graphql";

interface SelectStoreProps {
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  data?: any;
}


export const SelectStore: React.FC<SelectStoreProps> = (props) => {
  const { values, setFieldValue, errors } = useFormikContext<FormValues>();



  // TODO: 모든 stores가져오기 grapqhl통해서 stores에 접근하는 graphql query 작성

  const data = {
    stores: [
      {
        id: "1",
        name: "store1",
      },
      {
        id: "2",
        name: "store2",
      },
      {
        id: "3",
        name: "store3",
      },
    ],
  };

  const handleStoreClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked", e.currentTarget.id)
    setFieldValue("store", e.currentTarget.id.split(".")[1]);
  };
  return (

    <>
    <Grid.Container
      gap={1}
      justify="space-between"
      alignItems="center"
      style={{ marginTop: "10px" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Navigation size={22} />
        <Text style={{ fontWeight: "600" }} ml={1}>
          {/*select store name 현재 서초점 밖에 없음  */}
         {STORE_NAME[values.store]}
        </Text>
      </div>
      <div
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          // setStoreInfoOpen(() => true);
        }}
      >
        <Text mr={0.2} style={{ fontWeight: "600" }}>
          {"지점 정보"}
        </Text>
        <ChevronRightCircle size={22} />
      </div>

      {errors?.store && (
        <>
          <Spacer />
          <Note label="" type="error">
            {errors.store}
          </Note>
        </>
      )}
    </Grid.Container>
    <Grid.Container>
      <div
        style={{
          display: "flex",
          borderRadius: "31px",
          backgroundColor: "#ffffff",
          flexWrap: "wrap",
          width: "95%",
          margin: "0 auto",
        }}
      >
        {stores?.map((store,i) => {
            return (
              <Grid key={store?.id} padding={0.5}>
                <Button
                  id={store?.id}
                  color="primary"
                  style={{ marginLeft: "2px" }}
                  name={"store"}
                  auto
                  onClick={handleStoreClicked}
                >
                  {store.name}
                </Button>
              </Grid>
            );
          })}
      </div>
    </Grid.Container>
    </>
  );
  
};
