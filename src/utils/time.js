
export const updatedTimeOffset = (date) => {
    const updated = new Date(date);
    const offset = (Date.now() - updated.getTime())/1000;
    const [minInSec, hourInSec, dayInSec] = [60, 3600, 3600*24];
    if (offset < minInSec) return 'just now';
    let offsetNormalized = 0;
    if (offset < hourInSec) {
      offsetNormalized = Math.floor(offset/minInSec);
      return `${offsetNormalized} minute${offsetNormalized > 1 ? 's': '' } ago`;
    }
    if (offset < dayInSec) {
      offsetNormalized = Math.floor(offset/hourInSec);
      return `${offsetNormalized} hour${offsetNormalized > 1 ? 's': '' } ago`;
    }

    let day = updated.getDate().toString();
    let month = (updated.getMonth() + 1).toString();
    let year = updated.getFullYear().toString();
    let hours = updated.getHours().toString();
    let minutes = updated.getMinutes().toString();
    if (day.length === 1) day = 0 + day;
    if (month.length === 1) month = 0 + month;
    if (hours.length === 1) hours = 0 + hours;
    if (minutes.length === 1) minutes = 0 + minutes;
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }