const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  let items = getItemsFromStorage();
  items.forEach((item) => addItemToDOM(item));
  resetState();
}

function addItem(event) {
  event.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please enter the item");
    return;
  }

  //Check for edit mode.
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
  } else {
    if (checkIfItemExist(newItem)) {
      alert("Item already exist");
    }
  }

  addItemToDOM(newItem);
  // Add item to local storage
  addItemToStorage(newItem);
  resetState();

  itemInput.value = "";
}

function addItemToDOM(item) {
  //Create list item
  const li = document.createElement("li");

  li.appendChild(document.createTextNode(item)); // It can be done using li.textContent = newItem; or li.innerText = newItem;

  const button = createButton("remove-item btn-link text-red");
  li.append(button);

  itemList.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromLocalStorage = getItemsFromStorage();

  itemsFromLocalStorage.push(item);

  //convert json to string
  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
}

function getItemsFromStorage() {
  let itemsFromLocalStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromLocalStorage;
}

// Create button
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// Create Icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// Remove Item from the list.
function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();
    resetState();
    removeItemFromStorage(item.textContent);
  }
}

function removeItemFromStorage(item) {
  let items = getItemsFromStorage();
  items = items.filter((i) => i != item);
  localStorage.setItem("items", JSON.stringify(items));
}

function onClickItem(event) {
  if (event.target.parentElement.classList.contains("remove-item")) {
    removeItem(event.target.parentElement.parentElement);
  } else {
    setItemToEdit(event.target);
  }
}

function checkIfItemExist(item) {
  const items = getItemsFromStorage();
  return items.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  itemInput.value = item.textContent;
  formBtn.style.backgroundColor = "#228b22";
}

// Clear all items
function clearItems() {
  // itemList.innerHTML = "";
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  resetState();

  //clear all from localstrage
  localStorage.clear();
}

// Filter item
function filterItems(event) {
  const text = event.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase(); // or item.innerText
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// to hide filter items and clear all button when all items are cleared
function resetState() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");
  if (items.length == 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
  isEditMode = false;
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
}

// Initialize app
function init() {
  // Add listeners
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  resetState();
}

init();
