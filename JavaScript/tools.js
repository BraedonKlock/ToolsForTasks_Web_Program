/*
This file handles all the adding, loading, deleting and editing of the toolList array.
It also handles the loading of different "windows" within the <section id="display"> of tools.html 
*/

// This function creates the add tool window
function addItemWindow(item) {
const display = document.getElementById("display");
    display.innerHTML = "<div id='add-edit-item-window'></div>";
    const addItemWindow = document.getElementById("add-edit-item-window");
    
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "add-edit-item-window-container");
     
    const label = document.createElement("p");
    label.textContent = `Add ${item}`;

    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "item-name");
    name.setAttribute("placeholder", `Enter ${item} name`);

    const select = document.createElement("select");
    select.setAttribute("id", "item-qty");
    for (let i = 1; i <= 10; i ++) {
        const qty = document.createElement("option");
        qty.value = i;
        qty.textContent = i;

        select.appendChild(qty);
    }

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", function(){
        addItem();
    });

    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(select);
    divContainer.appendChild(addBtn);
    addItemWindow.appendChild(divContainer);    
}

// This function saves tools to local storage
function addItem() {
    const name = document.getElementById("item-name").value.trim();
    const quantity = parseInt(document.getElementById("item-qty").value.trim(), 10);
    
    if (name === "") {
        alert("Invalid Input!");
        return;
    }

    const tool = {
        name:name,
        qty:quantity
    }
    
    const toolList = JSON.parse(localStorage.getItem("toolList")) || [];
    toolList.push(tool);
    localStorage.setItem("toolList", JSON.stringify(toolList));

     document.getElementById("item-name").value = "";
     document.getElementById("item-qty").selectedIndex = 0;

     alert("Tool added!");
}

//Loads tools for viewing window
function loadItem() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='item-display'></div";
    const itemDisplay = document.getElementById("item-display");
    const button = document.getElementById("load-item");

    
    const toolList = JSON.parse(localStorage.getItem("toolList")) || [];
    itemDisplay.innerHTML = "";
    
    for (let i = 0; i < toolList.length; i++) {
        const tool = toolList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-item-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "item-names");
        name.textContent = tool.name;

        const quantity = document.createElement("p");
        quantity.setAttribute("class", "item-qty");
        quantity.innerHTML = "Qty:<b> " + tool.qty + "</b>";
             
        div.appendChild(name);
        div.appendChild(quantity);

        itemDisplay.appendChild(div);
    }
}

// This function loads tools from local storage and displays it when you click "delete Tool"
function deleteItemWindow() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='item-display'></div";
    const itemDisplay = document.getElementById("item-display");

    
    const toolList = JSON.parse(localStorage.getItem("toolList")) || [];
    itemDisplay.innerHTML = "";
    
    for (let i = 0; i < toolList.length; i++) {
        const tool = toolList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-item-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "item-names");
        name.textContent = tool.name;

        const quantity = document.createElement("p");
        quantity.setAttribute("class", "item-qty");
        quantity.innerHTML = "Qty:<b> " + tool.qty + "</b>";

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "deleteBtn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
        deleteItem(i, "delete");
        });
             
        div.appendChild(name);
        div.appendChild(quantity);
        div.appendChild(deleteBtn);

        itemDisplay.appendChild(div);
    }
}

// This function deletes tools from local storage
function deleteItem(index, call) {
    const toolList = JSON.parse(localStorage.getItem("toolList")) || [];
    if (index >=  0 && index < toolList.length) {
        toolList.splice(index, 1);

        localStorage.setItem("toolList", JSON.stringify(toolList));
        const itemDisplay = document.getElementById("item-display");

        itemDisplay.style.display = "none";
        if (call === "delete"){
            deleteItemWindow();
        } else if (call === "edit") {
            editItemWindow();
        } else {
            loadItem();
        }
    }
}

// This function displays the window when the tool option "edit tool" is chosen
function editItemWindow() {
    const display = document.getElementById("display");
    display.innerHTML = '<div id="item-display"></div>';

    const itemDisplay = document.getElementById("item-display");

    const toolList = JSON.parse(localStorage.getItem("toolList")) || [];

    for (let i = 0; i < toolList.length; i++) {
        const tool = toolList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-item-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "item-names");
        name.textContent = tool.name;

        const quantity = document.createElement("p");
        quantity.setAttribute("class", "item-qty");
        quantity.innerHTML = "Qty:<b> " + tool.qty + "</b>";

        const editBtn = document.createElement("button");
        editBtn.setAttribute("id", "editBtn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function() {
        editItem(i);
        });
        
        div.appendChild(name);
        div.appendChild(quantity);
        div.appendChild(editBtn);
        
        itemDisplay.appendChild(div);
    }
}

// This function displays the window that allows the user to edit their tool
function editItem(index) {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='add-edit-item-window'></div>";
    const editItemWindow = document.getElementById("add-edit-item-window");
    const toolList = JSON.parse(localStorage.getItem("toolList")) || [];
    const tool = toolList[index];
    
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "add-edit-item-window-container");
    const label = document.createElement("p");
    label.textContent = "Edit Tool";

    const name = document.createElement("input");
    name.value = tool.name;
    name.setAttribute("type", "text");
    name.setAttribute("id", "item-name");
    name.setAttribute("placeholder", "Enter job name");

    const select = document.createElement("select");
    select.setAttribute("id", "item-qty");

    for (let i = 1; i <= 10; i ++) {
        const qty = document.createElement("option");
        qty.value = i;
        qty.textContent = i;

        select.appendChild(qty);
    }
    select.value = String(tool.qty);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", function(){
    saveJob(index);
    });

    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(select);
    divContainer.appendChild(saveBtn);
    editItemWindow.appendChild(divContainer);
} 

// This function is used in editTool() to save the edited tool into local storage
function saveJob(index) {
    const name = document.getElementById("item-name").value.trim();
    const qty = parseInt(document.getElementById("item-qty").value.trim(), 10);

    if (name === "") {
        alert("Invalid input");
        return;
    }

    const toolList = JSON.parse(localStorage.getItem("toolList")) || [];
    toolList[index] = {name, qty};
    localStorage.setItem("toolList", JSON.stringify(toolList));

    alert("Tool updated!");
    editItemWindow();
}