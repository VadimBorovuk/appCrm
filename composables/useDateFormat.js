import {useNuxtApp} from "#app";

export const useFormatDateWithTimezone = (dateString) => {
  const userTimezone = process.server ? null : Intl.DateTimeFormat().resolvedOptions().timeZone
  const {$dayjs} = useNuxtApp()
  const baseOffset = 3; // Базовий офсет (UTC+3)

  const userOffset = $dayjs.tz(dateString, userTimezone).utcOffset() / 60;
  const adjustedOffset = userOffset - baseOffset;

  const convertToDays = (value)=>{
    return $dayjs.utc(dateString).add(adjustedOffset, 'hour')
  }
  return {
    days: convertToDays().format('DD.MM.YYYY'),
    hours: convertToDays().format('HH:mm:ss'),
    label: convertToDays().format('DD.MM.YYYY HH:mm:ss')
  }
}
