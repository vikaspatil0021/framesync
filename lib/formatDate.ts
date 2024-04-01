export default function formatDate(dateString: string) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const date = new Date(dateString);

  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minute = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() < 12 ? "am" : "pm";

  const formattedDay = day + (day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th");

  return `${month} ${formattedDay}, ${hour}:${minute}${ampm}`;
}

