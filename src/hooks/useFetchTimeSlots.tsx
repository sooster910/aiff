import { aiffAPI } from "@app/utils/aiffAPI";
import { DateTime } from "luxon";
import useSWR from "swr";
import { number } from "yup";

export type AvailableRegularClassIds = string[];

export const multiFetcher = (...urls) => {
  console.log("urls", urls);
  return Promise.all(urls.map((url) => aiffAPI.get(url)));
};

export const useFetchTimeSlots = (date: string, storeId: string) => {
  const { data, error, isValidating } = useSWR(
    `/stores?date=${
      date ?? DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd")
    }`,
    {
      fetcher: async (key) => {
        const res = await aiffAPI.get(key);
        return { stores: res.data };
      },
    }
  );

  const {
    data: timeslots,
    error: timeslotsError,
    isValidating: timeslotsIsValidating,
  } = useSWR(
    () =>
      data?.stores
        ?.filter((store) => store.id === Number(storeId))[0]
        .availableRegularClassIds?.map(
          (rcId) =>
            `/timeslotByClass?regularClassId=${rcId}&selectedDate=${date}&storeId=${storeId}`
        ),
    multiFetcher
  );
  console.log("Dataddddddd", data);
  console.log("timeslotssssss", timeslots);
  const timeslotsData = timeslots
    ?.map((t) => t.data[0])
    .filter((v) => v !== undefined);
  return { data, timeslotsData, error, isValidating };
};
