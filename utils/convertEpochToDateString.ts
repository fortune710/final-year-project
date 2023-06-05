export function convertEpochToDate(epoch: number): string {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
  
    // Get the individual components of the date
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Format the date string
    const dateOrdinal = getOrdinalSuffix(day);
    const dateString = `${day}${dateOrdinal} ${month} ${year}`;
  
    return dateString;
}

export function convertEpochToDateTime(epoch: number): string {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
  
    // Get the individual components of the date
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Format the date string
    const dateOrdinal = getOrdinalSuffix(day);
    const timeString = formatTime(hours, minutes);
    const dateString = `${day}${dateOrdinal} ${month} ${year}, ${timeString}`;
  
    return dateString;
}
  
function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
  
    const lastDigit = day % 10;
  
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
}

function formatTime(hours: number, minutes: number): string {
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}
