// import {useNuxtApp} from '#app';
//
// export const useDateFormatMoment = () => {
//   const {$moment} = useNuxtApp();
//
//   const getFormatDate = (date) => {
//     const convertDateFormat = (formatInfo) => {
//       return $moment(date).format(formatInfo)
//     }
//     return `
//      <div>
//        <b>${convertDateFormat('DD.MM.YYYY')}</b>
//        <p>${convertDateFormat('HH:mm:ss')}</p>
//       </div>
//      `
//   };
//
//   const setReverseDateForOffset = (data) => {
//     if (data) {
//       return $moment(data).format('YYYY-MM-DD HH:mm:ss');
//     }
//   };
//
//   const getUTCTimeOffset = (date, offset, type, format) => {
//     if (date) {
//       let getOffset = offset - 3;
//       let setOffset = -offset + 3;
//       console.log('getOffset', getOffset)
//
//       if (type === 'get') {
//         if (format === 'dotts') {
//           let newDate = $moment(date, 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
//           return $moment(newDate).add(getOffset, 'hours').format('DD.MM.YYYY HH:mm:ss');
//         } else if (format === 'unix') {
//           const unixDate = $moment.unix(date).format('YYYY-MM-DD HH:mm:ss');
//           return $moment(unixDate).format('YYYY-MM-DD HH:mm:ss');
//         } else if (format === 'org') {
//           const convertDateFormat = (formatInfo) => {
//             return $moment(date).add(getOffset, 'hours').format(formatInfo)
//           }
//           return `
//            <div>
//              <b>${convertDateFormat('DD.MM.YYYY')}</b>
//              <p>${convertDateFormat('HH:mm:ss')}</p>
//             </div>
//           `
//         } else if (format === 'days') {
//           return $moment(date).add(getOffset, 'hours').format('DD.MM.YYYY');
//         }
//       } else if (type === 'set') {
//         if (format === 'boot') {
//           return $moment(date).add(setOffset, 'hours').format('YYYY-MM-DD[T]HH:mm:ss');
//         } else if (format === 'none') {
//           return $moment(date).add(setOffset, 'hours').format('YYYY-MM-DD HH:mm:ss');
//         } else if (format === 'dotts') {
//           let newDate = $moment(date, 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
//           return $moment(newDate).add(setOffset, 'hours').format('DD.MM.YYYY HH:mm:ss');
//         } else if (format === 'days') {
//           return $moment(date).add(setOffset, 'hours').format('YYYY-MM-DD');
//         } else if (format === 'org') {
//           return $moment(date, 'DD.MM.YYYY HH:mm:ss').add(setOffset, 'hours').format('DD.MM.YYYY HH:mm:ss');
//         }
//       }
//     } else {
//       return '-';
//     }
//   };
//
//   return {
//     // getFormattedDateOrg,
//     // getFormattedTimeRequest,
//     // getUnixDate,
//     getFormatDate,
//     setReverseDateForOffset,
//     getUTCTimeOffset,
//   };
// };
