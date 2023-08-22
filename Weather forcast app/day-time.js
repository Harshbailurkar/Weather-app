export default function time_date() {
  let dayname = "";
  let date = new Date();
  const day = date.getDay();
  switch (day) {
    case 0:
      dayname = "sunday";
      break;
    case 1:
      dayname = "monday";
      break;
    case 2:
      dayname = "Tuesday";
      break;
    case 3:
      dayname = "wednesday";
      break;
    case 4:
      dayname = "thrusday";
      break;
    case 5:
      dayname = "friday";
      break;
    case 6:
      dayname = "saturday";
      break;
  }
  const time = dayname + " " + date.toLocaleTimeString();
  return time;
}
