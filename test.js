const { readFileSync } = require("fs");
const { DateTime } = require("luxon");
console.log("");
function generator() {
  const res = [];
  const obj = {
    duration: 60,
    _id: "3166",
    isHoliday: false,
    isBusinessDay: false,
    startDate: "2022-07-01",
    startDateTime: "2022-07-01T09:00:00.000Z",
    endDateTime: "2022-07-01T10:00:00.000Z",
    maximumBookingCount: 6,
    minimumBookingCount: 1,
    currentBookingCount: 0,
    storeId: "3",
    regularClassId: "3",
  };
  for (let i = 0; i <= 36; i++) {
    obj.duration = obj.duration;
    obj._id = (Number(obj._id) + 1).toString();
    obj.isHoliday = false;
    obj.isBusinessDay = false;
    obj.startDate = DateTime.fromISO(obj.startDate)

      .plus({ day: 1 })
      .toFormat("yyyy-MM-dd");
    obj.startDateTime = obj.startDateTime;
    obj.endDateTime = obj.endDateTime;
    obj.maximumBookingCount = obj.maximumBookingCount;
    obj.currentBookingCount = obj.currentBookingCount;
    obj.minimumBookingCount = obj.minimumBookingCount;
    obj.storeId = obj.storeId;
    obj.regularClassId = obj.regularClassId;
    res.push({ ...obj });
  }

  return res;
}
const a_arr = [
  {
    startDate: "2022-07-01",
    startDateTime: "2022-07-01 11:00",
    endDateTime: "2022-07-01 12:00",
  },
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 10:00",
    endDateTime: "2022-07-02 11:00",
  },
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 11:00",
    endDateTime: "2022-07-02 12:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 10:00",
    endDateTime: "2022-07-03 11:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 11:00",
    endDateTime: "2022-07-03 12:00",
  },
  {
    startDate: "2022-07-07",
    startDateTime: "2022-07-07 11:00",
    endDateTime: "2022-07-07 12:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 11:00",
    endDateTime: "2022-07-09 12:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 10:00",
    endDateTime: "2022-07-09 11:00",
  },
  {
    startDate: "2022-07-14",
    startDateTime: "2022-07-14 11:00",
    endDateTime: "2022-07-14 12:00",
  },
  {
    startDate: "2022-07-21",
    startDateTime: "2022-07-21 11:00",
    endDateTime: "2022-07-21 12:00",
  },
  {
    startDate: "2022-07-28",
    startDateTime: "2022-07-28 11:00",
    endDateTime: "2022-07-28 12:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 11:00",
    endDateTime: "2022-07-10 12:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 10:00",
    endDateTime: "2022-07-10 11:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 11:00",
    endDateTime: "2022-07-23 12:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 10:00",
    endDateTime: "2022-07-23 11:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 11:00",
    endDateTime: "2022-07-24 12:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 10:00",
    endDateTime: "2022-07-24 11:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 11:00",
    endDateTime: "2022-07-30 12:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 10:00",
    endDateTime: "2022-07-30 11:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 11:00",
    endDateTime: "2022-07-31 12:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 10:00",
    endDateTime: "2022-07-31 11:00",
  },
  {
    startDate: "2022-07-06",
    startDateTime: "2022-07-06 12:00",
    endDateTime: "2022-07-06 13:00",
  },
  {
    startDate: "2022-07-06",
    startDateTime: "2022-07-06 13:00",
    endDateTime: "2022-07-06 14:00",
  },
  {
    startDate: "2022-07-13",
    startDateTime: "2022-07-13 12:00",
    endDateTime: "2022-07-13 13:00",
  },
  {
    startDate: "2022-07-13",
    startDateTime: "2022-07-13 13:00",
    endDateTime: "2022-07-13 14:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 12:00",
    endDateTime: "2022-07-20 13:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 13:00",
    endDateTime: "2022-07-20 14:00",
  },

  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 12:00",
    endDateTime: "2022-07-27 13:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 13:00",
    endDateTime: "2022-07-27 14:00",
  },
];
const res = [];
let obj = {
  duration: 60,
  _id: "3166",
  isHoliday: false,
  isBusinessDay: false,
  startDate: "2022-07-01",
  startDateTime: "2022-07-01T09:00:00.000Z",
  endDateTime: "2022-07-01T10:00:00.000Z",
  maximumBookingCount: 9,
  minimumBookingCount: 1,
  currentBookingCount: 0,
  storeId: "3",
  regularClassId: "4",
};

const aa = [
  {
    startDate: "2022-07-01",
    startDateTime: "2022-07-01 12:00",
    endDateTime: "2022-07-01 13:00",
  },
  {
    startDate: "2022-07-01",
    startDateTime: "2022-07-01 13:00",
    endDateTime: "2022-07-01 14:00",
  },
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 12:00",
    endDateTime: "2022-07-02 13:00",
  },
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 13:00",
    endDateTime: "2022-07-02 14:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 12:00",
    endDateTime: "2022-07-03 13:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 13:00",
    endDateTime: "2022-07-03 14:00",
  },
  {
    startDate: "2022-07-07",
    startDateTime: "2022-07-07 12:00",
    endDateTime: "2022-07-07 13:00",
  },
  {
    startDate: "2022-07-07",
    startDateTime: "2022-07-07 13:00",
    endDateTime: "2022-07-07 14:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 12:00",
    endDateTime: "2022-07-09 13:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 13:00",
    endDateTime: "2022-07-09 14:00",
  },
  {
    startDate: "2022-07-08",
    startDateTime: "2022-07-08 12:00",
    endDateTime: "2022-07-08 13:00",
  },
  {
    startDate: "2022-07-08",
    startDateTime: "2022-07-08 13:00",
    endDateTime: "2022-07-08 14:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 12:00",
    endDateTime: "2022-07-10 13:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 13:00",
    endDateTime: "2022-07-10 14:00",
  },
  {
    startDate: "2022-07-14",
    startDateTime: "2022-07-14 12:00",
    endDateTime: "2022-07-14 13:00",
  },
  {
    startDate: "2022-07-14",
    startDateTime: "2022-07-14 13:00",
    endDateTime: "2022-07-14 14:00",
  },
  {
    startDate: "2022-07-15",
    startDateTime: "2022-07-15 12:00",
    endDateTime: "2022-07-15 13:00",
  },
  {
    startDate: "2022-07-15",
    startDateTime: "2022-07-15 13:00",
    endDateTime: "2022-07-15 14:00",
  },
  {
    startDate: "2022-07-16",
    startDateTime: "2022-07-16 12:00",
    endDateTime: "2022-07-16 13:00",
  },
  {
    startDate: "2022-07-16",
    startDateTime: "2022-07-16 13:00",
    endDateTime: "2022-07-16 14:00",
  },
  {
    startDate: "2022-07-17",
    startDateTime: "2022-07-17 12:00",
    endDateTime: "2022-07-17 13:00",
  },
  {
    startDate: "2022-07-17",
    startDateTime: "2022-07-17 13:00",
    endDateTime: "2022-07-17 14:00",
  },
  {
    startDate: "2022-07-21",
    startDateTime: "2022-07-21 12:00",
    endDateTime: "2022-07-21 13:00",
  },
  {
    startDate: "2022-07-21",
    startDateTime: "2022-07-21 13:00",
    endDateTime: "2022-07-21 14:00",
  },
  {
    startDate: "2022-07-22",
    startDateTime: "2022-07-2 12:00",
    endDateTime: "2022-07-22 13:00",
  },
  {
    startDate: "2022-07-22",
    startDateTime: "2022-07-22 13:00",
    endDateTime: "2022-07-22 14:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 12:00",
    endDateTime: "2022-07-23 13:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 13:00",
    endDateTime: "2022-07-23 14:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 12:00",
    endDateTime: "2022-07-24 13:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 13:00",
    endDateTime: "2022-07-24 14:00",
  },
  {
    startDate: "2022-07-28",
    startDateTime: "2022-07-28 12:00",
    endDateTime: "2022-07-28 13:00",
  },
  {
    startDate: "2022-07-28",
    startDateTime: "2022-07-28 13:00",
    endDateTime: "2022-07-28 14:00",
  },
  {
    startDate: "2022-07-29",
    startDateTime: "2022-07-29 12:00",
    endDateTime: "2022-07-29 13:00",
  },
  {
    startDate: "2022-07-29",
    startDateTime: "2022-07-29 13:00",
    endDateTime: "2022-07-29 14:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 12:00",
    endDateTime: "2022-07-30 13:00",
  },
  {
    startDate: "2022-07-39",
    startDateTime: "2022-07-30 13:00",
    endDateTime: "2022-07-30 14:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 12:00",
    endDateTime: "2022-07-31 13:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 13:00",
    endDateTime: "2022-07-31 14:00",
  },
  {
    startDate: "2022-07-06",
    startDateTime: "2022-07-06 14:00",
    endDateTime: "2022-07-06 15:00",
  },
  {
    startDate: "2022-07-06",
    startDateTime: "2022-07-06 15:00",
    endDateTime: "2022-07-06 16:00",
  },
  {
    startDate: "2022-07-13",
    startDateTime: "2022-07-13 14:00",
    endDateTime: "2022-07-13 15:00",
  },
  {
    startDate: "2022-07-13",
    startDateTime: "2022-07-13 15:00",
    endDateTime: "2022-07-13 16:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 14:00",
    endDateTime: "2022-07-20 15:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 15:00",
    endDateTime: "2022-07-20 16:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 14:00",
    endDateTime: "2022-07-27 15:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 15:00",
    endDateTime: "2022-07-27 16:00",
  },
  {
    startDate: "2022-07-01",
    startDateTime: "2022-07-01 17:00",
    endDateTime: "2022-07-01 18:00",
  },
];
const cupcakeEngArr = [
  {
    startDate: "2022-07-18",
    startDateTime: "2022-07-18 10:00",
    endDateTime: "2022-07-18 11:00",
  },
  {
    startDate: "2022-07-18",
    startDateTime: "2022-07-18 11:00",
    endDateTime: "2022-07-18 12:00",
  },
  {
    startDate: "2022-07-18",
    startDateTime: "2022-07-18 14:00",
    endDateTime: "2022-07-18 15:00",
  },
  {
    startDate: "2022-07-18",
    startDateTime: "2022-07-18 15:00",
    endDateTime: "2022-07-18 16:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 15:00",
    endDateTime: "2022-07-20 16:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 16:00",
    endDateTime: "2022-07-20 17:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 17:00",
    endDateTime: "2022-07-20 18:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 10:00",
    endDateTime: "2022-07-23 11:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 15:00",
    endDateTime: "2022-07-23 16:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 14:00",
    endDateTime: "2022-07-24 15:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 15:00",
    endDateTime: "2022-07-24 16:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 16:00",
    endDateTime: "2022-07-24 17:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 17:00",
    endDateTime: "2022-07-24 18:00",
  },
  {
    startDate: "2022-07-25",
    startDateTime: "2022-07-25 10:00",
    endDateTime: "2022-07-25 11:00",
  },
  {
    startDate: "2022-07-25",
    startDateTime: "2022-07-25 11:00",
    endDateTime: "2022-07-25 12:00",
  },
  {
    startDate: "2022-07-25",
    startDateTime: "2022-07-25 14:00",
    endDateTime: "2022-07-25 15:00",
  },
  {
    startDate: "2022-07-25",
    startDateTime: "2022-07-25 15:00",
    endDateTime: "2022-07-25 16:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 15:00",
    endDateTime: "2022-07-27 16:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 16:00",
    endDateTime: "2022-07-27 17:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 17:00",
    endDateTime: "2022-07-27 18:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 10:00",
    endDateTime: "2022-07-30 11:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 15:00",
    endDateTime: "2022-07-30 16:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 14:00",
    endDateTime: "2022-07-31 15:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 15:00",
    endDateTime: "2022-07-31 16:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 16:00",
    endDateTime: "2022-07-31 17:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 17:00",
    endDateTime: "2022-07-31 18:00",
  },
];
const cupcakeEng = {
  duration: 60,
  _id: "5000",
  isHoliday: false,
  isBusinessDay: false,
  startDate: "2022-07-01",
  startDateTime: "2022-07-01T09:00:00.000Z",
  endDateTime: "2022-07-01T10:00:00.000Z",
  maximumBookingCount: 9,
  minimumBookingCount: 1,
  currentBookingCount: 0,
  storeId: "1",
  regularClassId: "1",
};
// 위례점
const charCupcakeArr = [
  {
    startDate: "2022-07-18",
    startDateTime: "2022-07-18 12:00",
    endDateTime: "2022-07-18 13:00",
  },
  {
    startDate: "2022-07-18",
    startDateTime: "2022-07-18 13:00",
    endDateTime: "2022-07-18 14:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 10:00",
    endDateTime: "2022-07-20 11:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 11:00",
    endDateTime: "2022-07-20 12:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 12:00",
    endDateTime: "2022-07-20 13:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 16:00",
    endDateTime: "2022-07-23 17:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 17:00",
    endDateTime: "2022-07-23 18:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 12:00",
    endDateTime: "2022-07-24 13:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 13:00",
    endDateTime: "2022-07-24 14:00",
  },
  {
    startDate: "2022-07-25",
    startDateTime: "2022-07-25 12:00",
    endDateTime: "2022-07-25 13:00",
  },
  {
    startDate: "2022-07-25",
    startDateTime: "2022-07-25 13:00",
    endDateTime: "2022-07-25 14:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 10:00",
    endDateTime: "2022-07-27 11:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 11:00",
    endDateTime: "2022-07-27 12:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 12:00",
    endDateTime: "2022-07-27 13:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 16:00",
    endDateTime: "2022-07-30 17:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 17:00",
    endDateTime: "2022-07-30 18:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 12:00",
    endDateTime: "2022-07-31 13:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 13:00",
    endDateTime: "2022-07-31 14:00",
  },
];
const unicornArr = [
  {
    startDate: "2022-07-18",
    startDateTime: "2022-07-18 16:00",
    endDateTime: "2022-07-31 17:00",
  },
  {
    startDate: "2022-07-18",
    startDateTime: "2022-07-18 17:00",
    endDateTime: "2022-07-31 18:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 13:00",
    endDateTime: "2022-07-20 14:00",
  },
  {
    startDate: "2022-07-20",
    startDateTime: "2022-07-20 14:00",
    endDateTime: "2022-07-20 15:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 12:00",
    endDateTime: "2022-07-23 13:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 13:00",
    endDateTime: "2022-07-23 14:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 10:00",
    endDateTime: "2022-07-24 11:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 11:00",
    endDateTime: "2022-07-24 12:00",
  },
  {
    startDate: "2022-07-25",
    startDateTime: "2022-07-24 16:00",
    endDateTime: "2022-07-24 17:00",
  },
  {
    startDate: "2022-07-25",
    startDateTime: "2022-07-24 17:00",
    endDateTime: "2022-07-24 18:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 13:00",
    endDateTime: "2022-07-27 14:00",
  },
  {
    startDate: "2022-07-27",
    startDateTime: "2022-07-27 14:00",
    endDateTime: "2022-07-27 15:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 12:00",
    endDateTime: "2022-07-30 13:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 13:00",
    endDateTime: "2022-07-30 14:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 10:00",
    endDateTime: "2022-07-31 11:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 11:00",
    endDateTime: "2022-07-31 12:00",
  },
];
const giantArr = [
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 11:00",
    endDateTime: "2022-07-23 12:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 14:00",
    endDateTime: "2022-07-23 15:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 11:00",
    endDateTime: "2022-07-30 12:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 14:00",
    endDateTime: "2022-07-30 14:00",
  },
];

// 용산
const giantArr_ys = [
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 11:00",
    endDateTime: "2022-07-23 12:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 11:00",
    endDateTime: "2022-07-30 12:00",
  },
];
const charCup_ys = [
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 15:00",
    endDateTime: "2022-07-03 16:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 15:00",
    endDateTime: "2022-07-10 16:00",
  },
  {
    startDate: "2022-07-17",
    startDateTime: "2022-07-17 15:00",
    endDateTime: "2022-07-17 16:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 12:00",
    endDateTime: "2022-07-23 13:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 13:00",
    endDateTime: "2022-07-23 14:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 13:00",
    endDateTime: "2022-07-30 14:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 12:00",
    endDateTime: "2022-07-30 13:00",
  },
];
const unicorn_ys = [
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 14:00",
    endDateTime: "2022-07-23 15:00",
  },
  {
    startDate: "2022-07-23",
    startDateTime: "2022-07-23 15:00",
    endDateTime: "2022-07-23 16:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 14:00",
    endDateTime: "2022-07-30 15:00",
  },
  {
    startDate: "2022-07-30",
    startDateTime: "2022-07-30 15:00",
    endDateTime: "2022-07-30 16:00",
  },
];
const gummy_ys = [
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 11:00",
    endDateTime: "2022-07-02 12:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 11:00",
    endDateTime: "2022-07-03 12:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 11:00",
    endDateTime: "2022-07-09 12:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 11:00",
    endDateTime: "2022-07-10 12:00",
  },
  {
    startDate: "2022-07-16",
    startDateTime: "2022-07-16 11:00",
    endDateTime: "2022-07-16 12:00",
  },
  {
    startDate: "2022-07-17",
    startDateTime: "2022-07-17 11:00",
    endDateTime: "2022-07-17 12:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 11:00",
    endDateTime: "2022-07-24 12:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 11:00",
    endDateTime: "2022-07-31 12:00",
  },
];
const storeId = "1";
const regularClassId = "6";
const charCupcake = {
  duration: 60,
  _id: "1038",
  isHoliday: false,
  isBusinessDay: false,
  startDate: "2022-07-01",
  startDateTime: "2022-07-01T09:00:00.000Z",
  endDateTime: "2022-07-01T10:00:00.000Z",
  maximumBookingCount: 6,
  minimumBookingCount: 1,
  currentBookingCount: 0,
  storeId,
  regularClassId,
};
const cupcake_ev = [
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 12:00",
    endDateTime: "2022-07-02 13:00",
  },
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 13:00",
    endDateTime: "2022-07-02 14:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 13:00",
    endDateTime: "2022-07-03 14:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 14:00",
    endDateTime: "2022-07-03 15:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 12:00",
    endDateTime: "2022-07-09 13:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 13:00",
    endDateTime: "2022-07-09 14:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 13:00",
    endDateTime: "2022-07-10 14:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 14:00",
    endDateTime: "2022-07-10 15:00",
  },
  {
    startDate: "2022-07-16",
    startDateTime: "2022-07-16 12:00",
    endDateTime: "2022-07-16 13:00",
  },
  {
    startDate: "2022-07-16",
    startDateTime: "2022-07-16 13:00",
    endDateTime: "2022-07-16 14:00",
  },
  {
    startDate: "2022-07-17",
    startDateTime: "2022-07-16 13:00",
    endDateTime: "2022-07-16 14:00",
  },
  {
    startDate: "2022-07-17",
    startDateTime: "2022-07-16 14:00",
    endDateTime: "2022-07-16 15:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 12:00",
    endDateTime: "2022-07-24 13:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 13:00",
    endDateTime: "2022-07-24 14:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 12:00",
    endDateTime: "2022-07-31 13:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 13:00",
    endDateTime: "2022-07-31 14:00",
  },
];
const unicorn_ev = [
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 14:00",
    endDateTime: "2022-07-02 15:00",
  },
  {
    startDate: "2022-07-02",
    startDateTime: "2022-07-02 15:00",
    endDateTime: "2022-07-02 16:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 12:00",
    endDateTime: "2022-07-03 13:00",
  },
  {
    startDate: "2022-07-03",
    startDateTime: "2022-07-03 12:00",
    endDateTime: "2022-07-03 13:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 12:00",
    endDateTime: "2022-07-09 13:00",
  },
  {
    startDate: "2022-07-09",
    startDateTime: "2022-07-09 13:00",
    endDateTime: "2022-07-09 14:00",
  },
  {
    startDate: "2022-07-10",
    startDateTime: "2022-07-10 12:00",
    endDateTime: "2022-07-10 13:00",
  },
  {
    startDate: "2022-07-16",
    startDateTime: "2022-07-16 12:00",
    endDateTime: "2022-07-16 13:00",
  },
  {
    startDate: "2022-07-16",
    startDateTime: "2022-07-16 13:00",
    endDateTime: "2022-07-16 14:00",
  },
  {
    startDate: "2022-07-17",
    startDateTime: "2022-07-17 12:00",
    endDateTime: "2022-07-17 13:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 14:00",
    endDateTime: "2022-07-24 15:00",
  },
  {
    startDate: "2022-07-24",
    startDateTime: "2022-07-24 15:00",
    endDateTime: "2022-07-24 16:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 14:00",
    endDateTime: "2022-07-31 15:00",
  },
  {
    startDate: "2022-07-31",
    startDateTime: "2022-07-31 15:00",
    endDateTime: "2022-07-31 16:00",
  },
];
// const arr = unicorn_ev
// obj = charCupcake
// for (let i = 0; i <= arr.length - 1; i++) {
//   obj._id = (Number(obj._id) + 1).toString()
//   obj.startDate = arr[i].startDate
//   obj.startDateTime = new Date(arr[i].startDateTime).toISOString()
//   obj.endDateTime = new Date(arr[i].startDateTime).toISOString()
//   obj.maximumBookingCount = obj.maximumBookingCount
//   obj.currentBookingCount = obj.currentBookingCount
//   obj.minimumBookingCount = obj.minimumBookingCount
//   obj.storeId = obj.storeId
//   obj.regularClassId = obj.regularClassId
//   res.push({ ...obj })
// }

// console.log(res)

// DateTime.fromJSDate(timeSlotObj?.startDateTime).toFormat('HH:mm')

const fs = require("fs");
const st = JSON.parse(fs.readFileSync("./db/stores.json", "utf-8"));
// console.log('stores', stores)
const ys = st.find((store) => store._id === 1);
// console.log('ys', ys)
const ff = ys.regularClasses.map((regular) =>
  regular.timeSlots.filter((v) => v.currentBookingCount === 0)
);
const resp = ff.filter((v) => v.startDate === "2022-07-02");

// // 2022 - 07 - 03 12: 00   horn cookie 영어수업
// // 2022 - 07 - 03 11: 00 giant gummy 영어수업
// // 2022 - 07 - 02 12: 00 character cupcake  영어수업
// // 2022 - 07 - 02 13: 00 character cupcake  영어수업
// // 2022 - 07 - 03 13: 00 horn cookie 영어수업
// // 2022 - 07 - 03 12: 00 horn cookie 영어수업
// // console.log('ff', ff)
