import { Grid, Text } from "@geist-ui/core";
import { Calendar } from "@geist-ui/icons";
import { useFormikContext } from "formik";
import { DateTime } from "luxon";
import * as React from "react";
import { FormValues } from "../SuspenseBooking";

interface SelectDateProps {}

export const SelectDate: React.FC<SelectDateProps> = ({}) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const handleSelectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedDate(e.target.value);
    setFieldValue("date", e.target.value);
  };
  return (
    <div className="datetime-selector">
      <Grid.Container gap={1} justify="flex-start" alignItems="center">
        <Grid>
          <Calendar size={24} />
        </Grid>
        <Grid>
          <Text>{"날짜 선택"}</Text>
        </Grid>
      </Grid.Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="date"
          id="start"
          name="date"
          value={values.date}
          min="2022-07-01"
          max="2027-12-31"
          size={20}
          style={{ width: "100%", height: "40px" }}
          onChange={handleSelectDate}
        />
      </div>
    </div>
  );
};
