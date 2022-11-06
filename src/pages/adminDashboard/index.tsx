import CustomInput from "@app/components/CustomInput";

import withAuth from "@app/HOC/withAuth";
import { Grid, Loading, Select, Text } from "@geist-ui/core";
import GridContainer from "@geist-ui/core/esm/grid/grid-container";
import { Calendar } from "@geist-ui/icons";
import { Field } from "formik";
import { DateTime } from "luxon";
import { useState, Suspense } from "react";
// import { useAuth } from '@app/hooks/useAuth'
import { LeftNavPane } from "@app/components/LeftNavPane";
import { RightContainerPane } from "components/RightContainerPane";
import { ScheduleTable } from "../../components/ScheduleTable/index";

type Props = {};

const AdminDashboardPage = (props: Props) => {
  // const auth = useAuth()
  const [selectedDate, setSelectedDate] = useState<string>(
    DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd")
  );
  const [selectedStore, setSelectedStore] = useState<string>("");
  const handleSelectStore = (val) => {
    setSelectedStore(val);
  };
  return (
    <div
      style={{
        display: "flex",
        width: "1180px !important",
        maxWidth: "1180px !important",
      }}
    >
      <LeftNavPane />
      <RightContainerPane>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Grid.Container>
            <Grid.Container gap={1} justify="flex-start" alignItems="center">
              <Grid>
                <Calendar size={24} />
              </Grid>
              <Grid>
                <Text>{"날짜 선택"}</Text>
              </Grid>
            </Grid.Container>
            <input
              type="date"
              id="start"
              name="date"
              value={DateTime.fromISO(selectedDate).toFormat("yyyy-MM-dd")}
              min="2022-07-01"
              max="2022-08-30"
              size={20}
              style={{ width: "60%", height: "40px" }}
              onChange={(e) => {
                if (e.currentTarget.validity.valid) {
                  const newValue = DateTime.fromISO(
                    e.currentTarget.value
                  ).toJSDate();
                  setSelectedDate(
                    DateTime.fromISO(e.currentTarget.value).toFormat(
                      "yyyy-MM-dd"
                    )
                  );
                }
              }}
            />
          </Grid.Container>
          <Grid.Container>
            <Grid.Container gap={1} justify="flex-start" alignItems="center">
              <Grid>
                <Calendar size={24} />
              </Grid>
              <Grid>
                <Text>{"가맹점 선택"}</Text>
              </Grid>
            </Grid.Container>
            <Select placeholder="Choose one" onChange={handleSelectStore}>
              <Select.Option value="1"> 용산점 </Select.Option>
              <Select.Option value="2"> 판교점 </Select.Option>
              <Select.Option value="3"> 광교점 </Select.Option>
              <Select.Option value="4"> 광명점 </Select.Option>
              <Select.Option value="5"> 위례점 </Select.Option>
            </Select>
          </Grid.Container>
        </div>

        <ScheduleTable
          selectedDate={selectedDate}
          selectedStore={selectedStore}
        />
      </RightContainerPane>
    </div>
  );
};

// export default withAuth(AdminDashboardPage)
export default AdminDashboardPage;
