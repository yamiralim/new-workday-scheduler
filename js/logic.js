const currentDayElement = document.querySelector("#currentDay");
const timeBlockElements = document.querySelectorAll(".time-block");
const scheduleAreaElement = document.querySelector(".schedule");

const toDoItems = [];
// each object has an hour property and a text property

const currentDate = moment().format("dddd, MMMM Do");
const currentHour = moment().format("H");

// if we don't have any todos set up, let's set up the array of objects
function initializeSchedule() {
  timeBlockElements.forEach((timeBlockElement) => {
    const thisBlockHr = parseInt(timeBlockElement.getAttribute("data-hour"));

    const todoObj = {
      // set related todo hour to same as data-hour
      hour: thisBlockHr,
      // get text ready to accept string input
      text: "",
    };
    // add this todo object to toDoItems array
    toDoItems.push(todoObj);
  });

  // once we have looped through time blocks, save this array of objects to local storage by stringifying it first
  localStorage.setItem("todos", JSON.stringify(toDoItems));
}

// format time block colors depending on time
function setUpTimeBlocks() {
  timeBlockElements.forEach((timeBlockElement) => {
    const thisBlockHr = parseInt(timeBlockElement.getAttribute("data-hour"));

    // add style to time blocks to show where we are in the day
    if (thisBlockHr == currentHour) {
      timeBlockElement.classList.add("present");
      timeBlockElement.classList.remove("past", "future");
    }
    if (thisBlockHr < currentHour) {
      timeBlockElement.classList.add("past");
      timeBlockElement.classList.remove("present", "future");
    }
    if (thisBlockHr > currentHour) {
      timeBlockElement.classList.add("future");
      timeBlockElement.classList.remove("past", "present");
    }
  });
}

function renderSchedule() {
  const toDoItemsString = localStorage.getItem("todos");
  const parsedToDoItems = JSON.parse(toDoItemsString);

  // loop through the array then assign the text to the time block with data-hour equal to hour.
  // make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
  parsedToDoItems.forEach((toDoItem) => {
    const itemHour = toDoItem.hour;
    const itemText = toDoItem.text;

    const timeBlockElement = document.querySelector(`[data-hour="${itemHour}"]`);
    const textAreaElement = timeBlockElement.querySelector("textarea");
    textAreaElement.value = itemText;
  });
}

function saveHandler(event) {
  const buttonElement = event.target;
  const timeBlockElement = buttonElement.closest(".time-block");

  const hourToUpdate = timeBlockElement.getAttribute("data-hour");
  const itemToAdd = timeBlockElement.querySelector("textarea").value;

  // see which item we need to update based on the hour of the button clicked matching
  toDoItems.forEach((toDoItem) => {
    if (toDoItem.hour == hourToUpdate) {
      // set its text to what was added to textarea
      toDoItem.text = itemToAdd;
    }
  });
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

// when the document loads
window.addEventListener("DOMContentLoaded", () => {
  // format the time blocks depending on time
  setUpTimeBlocks();


  // if there's nothing for the todos in local storage, initialize the array of objects
  if (!localStorage.getItem("todos")) {
    initializeSchedule();
  }

  // display current date
//    currentDayElement
   currentDayElement.innerHTML = currentDate;

 
})