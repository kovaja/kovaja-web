const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;
const minute = 1000 * 60;
const second = 1000;

export function getSinceTime(isoString: string): string {
  const current = new Date().getTime();
  const timeStamp = new Date(isoString).getTime();

  let diff = current - timeStamp;

  const days = Math.floor(diff / day);
  diff -= day * days;

  const hours = Math.floor(diff / hour);
  diff -= hour * hours;

  const minutes = Math.floor(diff / minute);
  diff -= minute * minutes;

  const seconds = Math.floor(diff / second);

  return `${days} days ${hours} hour(s) ${minutes} minute(s)`;
}