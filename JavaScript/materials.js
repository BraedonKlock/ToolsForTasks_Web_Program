/*
This file handles all the adding, loading, deleting and editing of the materialList array.
It also handles the loading of different "windows" within the <section id="display"> of material.html 
*/

// This function creates the add material window
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
    name.setAttribute("placeholder", `Enter ${item}`);

    const quantity = document.createElement("input");
    quantity.setAttribute("id", "item-quantity");
    quantity.setAttribute("placeholder", "Enter quantity");

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", function(){
    addItem();
    });

    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(quantity);
    divContainer.appendChild(addBtn);
    addItemWindow.appendChild(divContainer);    
}

// This function saves material to local storage
function addItem() {
    const name = document.getElementById("item-name").value.trim();
    const quantity = document.getElementById("item-quantity").value.trim();
    
    if (name === "") {
        alert("Invalid Input!");
        return;
    }

    const material = {
        name:name,
        qty:quantity
    }
    
    const materialList = JSON.parse(localStorage.getItem("materialList")) || [];
    materialList.push(material);
    localStorage.setItem("materialList", JSON.stringify(materialList));

     document.getElementById("item-name").value = "";
     document.getElementById("item-quantity").value = "";

     alert("Material added!");
}

//Loads materials for list materials window
function loadItem() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='item-display'></div";
    const itemDisplay = document.getElementById("item-display");
    const button = document.getElementById("load-item");

    
    const materialList = JSON.parse(localStorage.getItem("materialList")) || [];
    itemDisplay.innerHTML = "";
    
    for (let i = 0; i < materialList.length; i++) {
        const material = materialList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-item-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "item-names");
        name.textContent = material.name;

        const quantity = document.createElement("p");
        quantity.setAttribute("class", "item-quantity");
        quantity.innerHTML = "Qty:<b> " + material.qty + "</b>";
             
        div.appendChild(name);
        div.appendChild(quantity);

        itemDisplay.appendChild(div);
    }
}

// This function loads materials from local storage and displays it when you click "delete Material"
function deleteItemWindow() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='item-display'></div";
    const itemDisplay = document.getElementById("item-display");

    
    const materialList = JSON.parse(localStorage.getItem("materialList")) || [];
    itemDisplay.innerHTML = "";
    
    for (let i = 0; i < materialList.length; i++) {
        const material = materialList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-item-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "item-names");
        name.textContent = material.name;

        const quantity = document.createElement("p");
        quantity.setAttribute("class", "item-qty");
        quantity.innerHTML = "Qty:<b> " + material.qty + "</b>";

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

// This function deletes material from local storage
function deleteItem(index, call) {
    const materialList = JSON.parse(localStorage.getItem("materialList")) || [];
    if (index >=  0 && index < materialList.length) {
        materialList.splice(index, 1);

        localStorage.setItem("materialList", JSON.stringify(materialList));
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

// This function displays the window when the material option "edit material" is chosen
function editItemWindow() {
    const display = document.getElementById("display");
    display.innerHTML = '<div id="item-display"></div>';

    const itemDisplay = document.getElementById("item-display");

    const materialList = JSON.parse(localStorage.getItem("materialList")) || [];

    for (let i = 0; i < materialList.length; i++) {
        const material = materialList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-item-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "item-names");
        name.textContent = material.name;

        const quantity = document.createElement("p");
        quantity.setAttribute("class", "item-qty");
        quantity.innerHTML = "Qty:<b> " + material.qty + "</b>";

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

// This function displays the window that allows the user to edit their material
function editItem(index) {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='add-edit-item-window'></div>";
    const editItemWindow = document.getElementById("add-edit-item-window");
    const materialList = JSON.parse(localStorage.getItem("materialList")) || [];
    const material = materialList[index];
    
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "add-edit-item-window-container");
    const label = document.createElement("p");
    label.textContent = "Edit Tool";

    const name = document.createElement("input");
    name.value = material.name;
    name.setAttribute("type", "text");
    name.setAttribute("id", "item-name");
    name.setAttribute("placeholder", "Enter job name");

    const quantity = document.createElement("input");
    quantity.setAttribute("id", "item-quantity");
    quantity.setAttribute("placeholder", "Enter quantity");
    quantity.value = material.qty;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", function(){
    saveJob(index);
    });

    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(quantity);
    divContainer.appendChild(saveBtn);
    editItemWindow.appendChild(divContainer);
} 

// This function is used in editMaterial() to save the edited material into local storage
function saveJob(index) {
    const name = document.getElementById("item-name").value.trim();
    const qty = document.getElementById("item-quantity").value.trim();

    if (name === "") {
        alert("Invalid input");
        return;
    }

    const materialList = JSON.parse(localStorage.getItem("materialList")) || [];
    materialList[index] = {name, qty};
    localStorage.setItem("materialList", JSON.stringify(materialList));

    alert("material updated!");
    editItemWindow();
}