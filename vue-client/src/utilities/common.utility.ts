const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;
const minute = 1000 * 60;
const second = 1000;

export function getSinceTime(isoString: string): string {
  const current = new Date().getTime();
  const timeStamp = new Date(isoString).getTime();

  let diff = current - timeStamp;

  const days = Math.floor(diff / day);

  if (days > 0) {
    return days + " day" + (days > 1 ? "s " : " ");
  }

  diff -= day * days;
  const hours = Math.floor(diff / hour);
  if (hours > 0) {
    return hours + " hour" + (hours > 1 ? "s " : " ");
  }

  diff -= hour * hours;
  const minutes = Math.floor(diff / minute);
  if (minutes > 0) {
    return minutes + " minute" + (minutes > 1 ? "s " : " ");
  }

  diff -= minute * minutes;
  const seconds = Math.floor(diff / second);
  return seconds + " second" + (seconds > 1 ? "s " : " ");
}
