import { Duration } from 'luxon'

export const convertMin = () =>
  Duration.fromMillis(150000).toFormat("mm'm' ss's'")
