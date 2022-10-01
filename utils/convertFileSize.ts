export const convertBytesToHuman = (bytes: number, si: boolean = false, dp: number = 1) => {
  let clonedBytes = bytes;
  const thresh = si ? 1000 : 1024;

  if (Math.abs(clonedBytes) < thresh) {
    return `${clonedBytes} B`;
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    clonedBytes /= thresh;
    u += 1;
  } while (Math.round(Math.abs(clonedBytes) * r) / r >= thresh && u < units.length - 1);

  return `${clonedBytes.toFixed(dp)} ${units[u]}`;
};
