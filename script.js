//global variables
const form = document.getElementById('form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear-btn');
const itemFilter = document.getElementById('filter');
const formBtn = form.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUi();
}


function addItems(e) {
    e.preventDefault();
    const inputValue = itemInput.value;
    if (inputValue == '') {
        alert('Please add an Item!');
        return;
    }
    
    addItemToDOM(inputValue);
    //add item to local storage
    addItemToStorage(inputValue);
    checkUi();
    itemInput.value = '';
}

function addItemToDOM(inputValue) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputValue));

    const button = createButton('item-btn');
    li.appendChild(button);
    itemList.appendChild(li);
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

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    //add new item to array
    itemsFromStorage.push(item);

    //convert to JSON string
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItems(e) {
    if(e.target.parentElement.classList.contains('item-btn')){
        removeItems(e.target.parentElement.parentElement);
    }
    else{
        setItemToedit(e.target);
    }
}

function setItemToedit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#75c52b';
    itemInput.value = item.textContent;
}
//function to remove items
function removeItems(item) {
    if (confirm(`Are you sure to remove ${item.textContent}?`)) {
        //remove item from DOM
        item.remove();

        //remove item from storage
        removeItemFromStorage(item.textContent);

        checkUi();
    }
    
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    
    //re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//function to clear items
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    
    //clear from storage
    localStorage.removeItem('items');
    // or localStorage.clear();
    checkUi();
}

function checkUi() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}
checkUi();

//function to filter items
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const inputText = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(inputText) !== -1) {
            item.style.display = 'flex';
        }
        else{
            item.style.display = 'none';
        }
    });
}

//initialize app
function init() {
    //event listener
    form.addEventListener('submit', addItems);
    itemList.addEventListener('click', onClickItems);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
}
init();