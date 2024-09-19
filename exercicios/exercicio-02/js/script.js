function applyTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("dataTheme", savedTheme);
    }
    applyThemeIcons(savedTheme);
}

function applyThemeIcons(theme) {
    const sunDiv = document.getElementById("light");
    const moonDiv = document.getElementById("dark");
    if (theme == "dark") {
        moonDiv.classList.add("hidden");
        sunDiv.classList.remove("hidden");
    } else {
        moonDiv.classList.remove("hidden");
        sunDiv.classList.add("hidden");
    }
}

function switchTheme() {
    const currentTheme = document.documentElement.getAttribute("dataTheme");
    let newTheme;
    if (currentTheme === "dark") {
        newTheme = "";
    } else {
        newTheme = "dark";
    }
    applyThemeIcons(newTheme);
    // const newTheme = currentTheme === 'dark' ? '' : 'dark';
    document.documentElement.setAttribute("dataTheme", newTheme);
    localStorage.setItem("theme", newTheme); // Salva a preferência no localStorage
}

function removeItem(id, div) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const newItems = items.filter((item) => {
        return item.id !== id;
    });
    const father = document.getElementById("todoList");
    localStorage.setItem("items", JSON.stringify(newItems));
    father.removeChild(div);
}

function insertIntoHtmlItem(id, text, status) {
    const newItem = document.createElement("div");
    const newInput = document.createElement("input");
    const newText = document.createElement("p");
    const newTrashBtn = document.createElement("button");
    const newSvg = document.createElement("svg");

    newItem.classList.add("todoItem");
    newItem.setAttribute("value", id);
    newInput.type = "checkbox";
    if (1 == status) {
        newInput.checked = "checked";
    }
    newText.innerHTML = text;
    newTrashBtn.addEventListener("click", () => {
        removeItem(id, newItem);
    });
    newSvg.setAttribute("width", "1rem");
    newSvg.setAttribute("height", "1rem");
    newSvg.setAttribute("viewBox", "0 0 24 24");
    newSvg.setAttribute("fill", "none");

    newItem.appendChild(newInput);
    newItem.appendChild(newText);
    newItem.appendChild(newTrashBtn);
    newTrashBtn.innerHTML =
        "<svg width='1rem' height='1rem' viewBox='0 0 24 24' fill='none' > <path d='M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /> </svg>";
    document.getElementById("todoList").appendChild(newItem);
}

function insertIntoLocalStorage(text) {
    const id = Date.now();
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push({ id, text, status: 0 });
    localStorage.setItem("items", JSON.stringify(items));
    return items[items.length - 1];
}

function generateRandom() {
    const example = [
        "Wash the dishes",
        "Do the laundry",
        "Take out the trash",
        "Clean the room",
        "Buy groceries",
        "Walk the dog",
        "Read a book",
        "Study for exams",
        "Prepare dinner",
        "Exercise",
    ];
    let random = example[Math.floor(Math.random() * example.length)];
    let element2 = insertIntoLocalStorage(random);
    for (let i = 0; i < 5; i++) {
        random = example[Math.floor(Math.random() * example.length)];
        element2 = insertIntoLocalStorage(random);
        insertIntoHtmlItem(element2.id, element2.text, element2.status);
    }
}

function getToDoItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    if (items.length == 0) {
        console.log("random");
        generateRandom();
    }
    items.forEach((item) => {
        insertIntoHtmlItem(item.id, item.text, item.status);
    });
}

function insertNewToDo() {
    const text = document.getElementById("newToDoId").value;
    const element = insertIntoLocalStorage(text);
    if (!element) {
        console.error("Failed to insert new todo");
        return; // Pare a execução se element for indefinido
    }
    insertIntoHtmlItem(element.id, element.text, element.status);
}

function searchShow(items) {
    document.getElementById("todoList").innerHTML = "";
    items.forEach((item) => {
        insertIntoHtmlItem(item.id, item.text, item.status);
    });
}

function search() {
    const searchTerm = document.getElementById("inputSearch").value;
    const filtered = (JSON.parse(localStorage.getItem("items")) || []).filter(
        (item) => item.text.toLowerCase().includes(searchTerm)
    );
    searchShow(filtered);
}

applyTheme();
getToDoItems();
document.getElementById("inputSearch").addEventListener("input", search);
