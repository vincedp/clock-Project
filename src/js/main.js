"use-strict";

// <!-- body -->
// <!-- button -->
// <!-- center -->
// <!-- hour -->
// <!-- minute -->
// <!-- time -->
// <!-- day -->
// <!-- date -->

const darkModeBtn = document.querySelector(".dark-mode button");
const timeEl = document.querySelector(".time");
const center = document.querySelector(".center");
const secondEl = document.querySelector(".second");
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const dayEl = document.querySelector(".day");
const dateEl = document.querySelector(".date");

// Dark mode
const darkTheme = [
  document.body,
  darkModeBtn,
  center,
  hourEl,
  minuteEl,
  timeEl,
  dayEl,
  dateEl,
];

// Days array
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Months array
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// Fixed values
const CLOCK_MAX_NUM = 12;
const ROTATE_ANGLE_PER_SEC = 6;
const ROTATE_ANGLE_PER_MIN = 6;
const ROTATE_ANGLE_PER_HOUR = 30;

// Get users date base on their system
const date = new Date();

// Functions that corrects date and time format
const _12HourFormatter = (hour) =>
  hour > CLOCK_MAX_NUM ? hour - CLOCK_MAX_NUM : hour;

// Functions that corrects date and time format
const _2DigitFormatter = (time) => (time < 10 ? `0${time}` : `${time}`);

const checkDay = (hour) => (hour < CLOCK_MAX_NUM ? "AM" : "PM");

// Helper function to set hands of the clock
const clockHandAngle = (element, angle) =>
  (element.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`);

// Toggle light or dark mode
darkModeBtn.addEventListener("click", () =>
  darkTheme.forEach((el) => el.classList.toggle("dark-theme"))
);

// Clock logic
const clock = () => {
  // Update time every 1 second
  date.setTime(date.getTime() + 1000);

  // Declare date and time
  const month = date.getMonth();
  const monthDate = date.getDate();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Compute angle of clock hands based on date object
  const hoursAngle = _12HourFormatter(hours) * ROTATE_ANGLE_PER_HOUR;
  const minutesAngle = minutes * ROTATE_ANGLE_PER_MIN;
  const secondsAngle = seconds * ROTATE_ANGLE_PER_SEC;

  // Set angle of clock hands based on date object
  clockHandAngle(secondEl, secondsAngle);
  clockHandAngle(minuteEl, minutesAngle);
  clockHandAngle(hourEl, hoursAngle);

  // Display date, day, time, am/pm
  dateEl.innerHTML = `${monthDate}`;
  dayEl.innerHTML = `${days[day].toUpperCase()}, ${months[month]}`;
  timeEl.innerHTML = `${_2DigitFormatter(
    _12HourFormatter(hours)
  )} : ${_2DigitFormatter(minutes)} : ${_2DigitFormatter(seconds)} ${checkDay(
    hours
  )}`;
};

// Execute clock function every 1 second
setInterval(clock, 1000);
