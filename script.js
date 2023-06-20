// HTML input element
const days = document.getElementById('days');
const months = document.getElementById('months');
const years = document.getElementById('years');

// Label element of inputs
const labelDay = document.querySelector('.day');
const labelYear = document.querySelector('.year');
const labelMonth = document.querySelector('.month');

// HTML output element
const outputDays = document.getElementById('output-days');
const outputMonths = document.getElementById('output-months');
const outputYears = document.getElementById('output-years');

// Submit button
const btn = document.getElementById('submit');

// Span elements
const yearSpan = document.getElementById('year-empty');
const monthSpan = document.getElementById('month-empty');
const daySpan = document.getElementById('day-empty');

// Invalid input span errors
const invalidYearSpan = document.getElementById('year-error');
const invalidMonthSpan = document.getElementById('month-error');
const invalidDaySpan = document.getElementById('day-error');

// Default values for DOM
let defaultDays = '--';
let defaultMonths = '--';
let defaultYears = '--';

// For error checking
let dayError = true;
let monthError = true;
let yearError = true;

// For animation of age
const displayValues = document.querySelectorAll('.output');

window.addEventListener('load', () => {
    outputDays.setHTML(defaultDays); 
    outputMonths.setHTML(defaultMonths), 
    outputYears.setHTML(defaultYears)});

currentYear = new Date().getFullYear();
currentMonth = (new Date().getMonth() + 1);
currentDay = new Date().getUTCDate();

let loading = true;

btn.addEventListener('click', () => {
    getDay();
    getMonth();
    getYears();
    if (dayError === true || monthError === true || yearError === true) {
        outputDays.setHTML(defaultDays); 
        outputMonths.setHTML(defaultMonths), 
        outputYears.setHTML(defaultYears)
    } else {
        getAge();
    } 
})

function getAge() {
    if (
        years.value < currentYear &&
        months.value == currentMonth &&
        days.value == currentDay
    ) {
        outputYears.dataset.val = currentYear - parseInt(years.value);
        outputMonths.dataset.val = "0"
        outputDays.dataset.val = "0"
    } else if (
        years.value < currentYear &&
        months.value < currentMonth &&
        days.value < currentDay
    ) {
        outputYears.dataset.val = currentYear - parseInt(years.value);
        outputMonths.dataset.val = currentMonth - parseInt(months.value)
        outputDays.dataset.val = (currentDay - parseInt(days.value))
    } else if (
        years.value < currentYear &&
        months.value < currentMonth &&
        days.value > currentDay
    ) {
        outputYears.dataset.val = currentYear - parseInt(years.value);
        outputMonths.dataset.val = currentMonth - parseInt(months.value - 1)
        outputDays.dataset.val = (31 - (parseInt(days.value) - currentDay))
    } else if (
        years.value < currentYear &&
        months.value > currentMonth &&
        days.value < currentDay
    ) {
        outputYears.dataset.val = currentYear - parseInt(years.value - 1);
        outputMonths.dataset.val = 12 - (parseInt(months.value) - currentMonth)
        outputDays.dataset.val = (currentDay - parseInt(days.value))
    } else if (
        years.value < currentYear &&
        months.value > currentMonth &&
        days.value > currentDay
    ) {
        outputYears.dataset.val = currentYear - parseInt(years.value - 1);
        outputMonths.dataset.val = (11 - (parseInt(months.value) - currentMonth))
        outputDays.dataset.val = (31 - (parseInt(days.value) - currentDay))
    }  else if (
        years.value < currentYear &&
        months.value == currentMonth &&
        days.value < currentDay
    ) {
        outputYears.dataset.val = currentYear - parseInt(years.value);
        outputMonths.dataset.val = 0
        outputDays.dataset.val = currentDay - (parseInt(days.value))
    }   else if (
        years.value < currentYear &&
        months.value == currentMonth &&
        days.value > currentDay
    ) {
        outputYears.dataset.val = currentYear - parseInt(years.value - 1);
        outputMonths.dataset.val = 11
        outputDays.dataset.val = 31 - (parseInt(days.value) - currentDay)
    }

    let interval = 2000;

    displayValues.forEach((displayValue) => {
        let startValue = 0
        let endValue = parseInt(displayValue.getAttribute("data-val"));
        let duration = Math.floor(interval / endValue);
        console.log(endValue)
        let counter = setInterval(function () {
            startValue += 1;
            displayValue.textContent = startValue;
            if (endValue == 0) {
                displayValue.textContent = 0
            } else if (startValue == endValue) {
                clearInterval(counter);
            }
        }, duration);
    })
}

function getYears() {
    if (years.value > currentYear) {
        labelYear.classList.add('error');
        years.classList.add('empty');
        invalidYearSpan.classList.add('error-message');
        yearSpan.classList.remove('error-message');
        yearError = true;
    } else if (years.value == "") {
        labelYear.classList.add('error');
        years.classList.add('empty');
        yearSpan.classList.add('error-message');
        invalidYearSpan.classList.remove('error-message');
        yearError = true;
    } else {
        yearError = false;
        labelYear.classList.remove('error');
        years.classList.remove('empty');
        yearSpan.classList.remove('error-message');
        invalidYearSpan.classList.remove('error-message');
    }
}

function getMonth() {
    if (months.value > 12) {
        labelMonth.classList.add('error');
        months.classList.add('empty');
        invalidMonthSpan.classList.add('error-message');
        monthSpan.classList.remove('error-message');
        monthError = true;
    } else if (months.value === "") {
        labelMonth.classList.add('error');
        months.classList.add('empty');
        monthSpan.classList.add('error-message');
        invalidMonthSpan.classList.remove('error-message');
        monthError = true;
    } else {
        labelMonth.classList.remove('error');
        months.classList.remove('empty');
        monthSpan.classList.remove('error-message');
        invalidMonthSpan.classList.remove('error-message');
        monthError = false;
    }
}

function getDay() {
    if (days.value === "0" || days.value === "00") {
        labelDay.classList.add('error');
        days.classList.add('empty');
        invalidDaySpan.classList.add('error-message');
        daySpan.classList.remove('error-message');
        dayError = true;
    } else if (days.value == "") {
        labelDay.classList.add('error');
        days.classList.add('empty');
        daySpan.classList.add('error-message');
        invalidDaySpan.classList.remove('error-message');
        dayError = true;
    } else if (days.value > 28 && months.value === "2") {
        labelDay.classList.add('error');
        days.classList.add('empty');
        invalidDaySpan.classList.add('error-message');
        daySpan.classList.remove('error-message');
        dayError = true;
        
    } else if (
        days.value > 31 && months.value === "1" ||
        days.value > 31 && months.value === "3" ||
        days.value > 31 && months.value === "5" ||
        days.value > 31 && months.value === "7" ||
        days.value > 31 && months.value === "8" ||
        days.value > 31 && months.value === "10" ||
        days.value > 31 && months.value === "12"
    ) {
        labelDay.classList.add('error');
        days.classList.add('empty');
        invalidDaySpan.classList.add('error-message');
        daySpan.classList.remove('error-message');
        dayError = true;
    } else if (
        days.value > 30 && months.value === "4" ||
        days.value > 30 && months.value === "6" ||
        days.value > 30 && months.value === "9" ||
        days.value > 30 && months.value === "11"
    ) {
        labelDay.classList.add('error');
        days.classList.add('empty');
        invalidDaySpan.classList.add('error-message');
        daySpan.classList.remove('error-message');
        dayError = true;
    } else if (days.value > 31) {
        labelDay.classList.add('error');
        days.classList.add('empty');
        invalidDaySpan.classList.add('error-message');
        daySpan.classList.remove('error-message');
        dayError = true;
    } else {
        dayError = false;
        labelDay.classList.remove('error');
        days.classList.remove('empty');
        invalidDaySpan.classList.remove('error-message');
        daySpan.classList.remove('error-message');
    }
}