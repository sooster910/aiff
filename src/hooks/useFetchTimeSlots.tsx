import {aiffAPI, aiffBackendAPI} from "@app/utils/aiffAPI";
import { DateTime } from "luxon";
import useSWR from "swr";
import { number } from "yup";

export type AvailableRegularClassIds = string[];

export const multiFetcher = async (...urls) => {
  console.log("urls", urls);
  return Promise.all(
    urls.map((url) => {
      return aiffBackendAPI.get(url);
    })
  );
};

export const useFetchTimeSlots = (date: string, storeId: string) => {
  const { data, error, isValidating } = useSWR(
    `/stores?date=${
      date ?? DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd")
    }`,
    {
      fetcher: async (key) => {
        const res = await aiffBackendAPI.get(key);
        return { stores: res.data };
      },
    }
  );

  const {
    data: timeslots,
    error: timeslotsError,
    isValidating: timeslotsIsValidating,
  } = useSWR(
    data?.stores
      ?.find((store) => store.id === Number(storeId))
      ?.availableRegularClassIds?.map(
        (rcId) =>
          `/timeslotByClass?regularClassId=${rcId}&selectedDate=${date}&storeId=${storeId}`
      ),
    {
      fetcher: multiFetcher,
    }
  );

  const timeslotsData = timeslots
    ?.map((t) => t.data)
    .filter((v) => v !== undefined)
    .flat();
  return { data, timeslotsData, error, isValidating };
};
