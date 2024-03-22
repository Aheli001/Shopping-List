//add-items
const form = document.getElementById('form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

//event-listener
function addItems(e) {
    e.preventDefault();
    const inputValue = itemInput.value;
    if (inputValue == '') {
        alert('Please add Items!');
        return;
    }
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputValue));

    const button = createButton('item-btn');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
}
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
form.addEventListener('submit', addItems);