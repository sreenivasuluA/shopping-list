const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(event) {
  event.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please enter the item");
    return;
  }

  //Create list item
  const li = document.createElement("li");

  li.appendChild(document.createTextNode(newItem)); // It can be done using li.textContent = newItem; or li.innerText = newItem;

  const button = createButton("remove-item btn-link text-red");
  li.append(button);

  itemList.appendChild(li);

  itemInput.value = "";
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

// Add listeners
itemForm.addEventListener("submit", addItem);
