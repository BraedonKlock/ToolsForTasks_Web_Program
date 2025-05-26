/*
This file handles all the adding, loading, deleting and editing of the jobList array.
It also handles the loading of different "windows" within the <section id="display"> of jobs.html 
*/

// This function creates the add job window
function addJobWindow() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='add-edit-job-window'></div>";
    const addJobWindow = document.getElementById("add-edit-job-window");
    
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "add-edit-job-window-container");
     
    const label = document.createElement("p");
    label.textContent = "Add Job";

    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "job-name");
    name.setAttribute("placeholder", "Enter job name");

    const notes = document.createElement("textarea");
    notes.setAttribute("rows", "10");
    notes.setAttribute("cols", "40");
    notes.setAttribute("name", "notes");
    notes.setAttribute("id", "job-notes");
    notes.setAttribute("placeholder", "Enter Job notes");

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", function(){
        addJob();
    });

    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(notes);
    divContainer.appendChild(addBtn);
    addJobWindow.appendChild(divContainer);
}

// This function saves jobs to local storage
function addJob() {
    const name = document.getElementById("job-name").value.trim();
    const notes = document.getElementById("job-notes").value.trim();
        if(name ==="") {
            alert("Ivalid input");
            return;
        }
        
    const job = {
        name: name,
        notes: notes,
        tools: [],
        materials: []
    }
    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobList.push(job);
    localStorage.setItem("jobList", JSON.stringify(jobList));

    document.getElementById("job-name").value = "";
    document.getElementById("job-notes").value = "";

    alert("Job added!");
}

//Loads jobs for viewing window
function loadJobs() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='job-display'></div>";
    const jobDisplay = document.getElementById("job-display");
    const button = document.getElementById("load-jobs");

    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobDisplay.innerHTML = "";
    
    for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-jobs-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "jobs-names");
        name.textContent = job.name;

        const notes = document.createElement("p");
        notes.setAttribute("class", "jobs-notes");

        notes.textContent = job.notes;

        const viewBtn = document.createElement("button");
        viewBtn.setAttribute("id", "view-btn");
        viewBtn.textContent = "View";
        viewBtn.addEventListener("click", function() {
        viewJob(i);
        });
        
        div.appendChild(name);
        div.appendChild(notes);
        div.appendChild(viewBtn);
        
        jobDisplay.appendChild(div);
    }
}

// This function loads jobs from local storage and displays it when you click "delete job"
function deleteJobsWindow() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='job-display'></div>";
    const jobDisplay = document.getElementById("job-display");
    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobDisplay.innerHTML = "";
    
    for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-jobs-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "jobs-names");
        name.textContent = job.name;

        const notes = document.createElement("p");
        notes.setAttribute("class", "jobs-notes");
        notes.textContent = job.notes;

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
        deleteJob(i, "delete");
        });
        
        div.appendChild(name);
        div.appendChild(notes);
        div.appendChild(deleteBtn);
        
        jobDisplay.appendChild(div);
    }
}

// This functions loads jobs from storage for viewing
function viewJob(index) {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='view-job-display'></div>";
    const viewJobDisplay = document.getElementById("view-job-display");
    const button = document.getElementById("load-jobs");
    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];

    const job = jobList[index];

    // name and notes displayed in elements
    const div = document.createElement("div");
    div.setAttribute("id", "view-job-delete");

    const name = document.createElement("p");
    name.setAttribute("class", "jobs-names");
    name.textContent = job.name;

    const notes = document.createElement("p");
    notes.setAttribute("class", "jobs-notes");
    notes.textContent = job.notes;

    //displaying tools and materials
    const resourceDiv = document.createElement("section");
    resourceDiv.setAttribute("id", "view-resource-container");

    const toolDiv = document.createElement("div");
    toolDiv.setAttribute("id", "view-tool-container");

    const toolTitle = document.createElement("p");
    toolTitle.setAttribute("id", "tool-title")
    toolTitle.textContent = "Tools";

    toolDiv.appendChild(toolTitle);
    
    if (Array.isArray(job.tools)) {
        for (let i = 0; i < job.tools.length; i++) {
            const tool = job.tools[i];
            const toolP = document.createElement("p");
            toolP.textContent = `${tool.name} — ${tool.qty}`;
            toolDiv.appendChild(toolP);
        }
    }

    resourceDiv.appendChild(toolDiv);

    // material container
    const materialDiv = document.createElement("div");
    materialDiv.setAttribute("id", "view-material-container");

    const materialTitle = document.createElement("p");
    materialTitle.setAttribute("id", "material-title")
    materialTitle.textContent = "Materials";

    materialDiv.appendChild(materialTitle);
    
    if (Array.isArray(job.materials)) {
        for (let i = 0; i < job.materials.length; i++) {
            const material = job.materials[i];
            const materialP = document.createElement("p");
            materialP.textContent = `${material.name} — ${material.qty}`;
            materialDiv.appendChild(materialP);
        }
    }

    resourceDiv.appendChild(materialDiv);

    div.appendChild(name);
    div.appendChild(notes);
    div.appendChild(resourceDiv);
    viewJobDisplay.appendChild(div);
}

// This function deletes jobs from local storage
function deleteJob(index, call) {
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    if (index >=  0 && index < jobList.length) {
        jobList.splice(index, 1);

        localStorage.setItem("jobList", JSON.stringify(jobList));
        const jobDisplay = document.getElementById("job-display");

        jobDisplay.style.display = "none";
        if (call === "delete"){
            deleteJobsWindow();
        } else if (call === "edit") {
            editJobWindow();
        } else {
            loadJobs();
        }
    }
}

// This function displays the window when the job option "edit job" is chosen
function editJobWindow() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='job-display'></div>";

    const jobDisplay = document.getElementById("job-display");

    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];

    for (let i = 0; i < jobList.length; i++) {
    const job = jobList[i];
        
        const div = document.createElement("div");
        div.setAttribute("class", "list-jobs-window");
        
        const name = document.createElement("p");
        name.setAttribute("class", "jobs-names");
        name.textContent = job.name;

        const notes = document.createElement("p");
        notes.setAttribute("class", "jobs-notes");
        notes.textContent = job.notes;

        const editBtn = document.createElement("button");
        editBtn.setAttribute("id", "edit-btn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function() {
        editJob(i);
        });
        
        div.appendChild(name);
        div.appendChild(notes);
        div.appendChild(editBtn);
        
        jobDisplay.appendChild(div);
    }
}

// This function displays the window that allows the user to edit their job
function editJob(index) {
    // Edit job form
    const display = document.getElementById("display");
    display.innerHTML = "<div id='add-edit-job-window'></div>";
    const editJobWindow = document.getElementById("add-edit-job-window");
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    const job = jobList[index];
    
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "add-edit-job-window-container");
    const label = document.createElement("p");
    label.textContent = "Edit Job";

    const name = document.createElement("input");
    name.value = job.name;
    name.setAttribute("type", "text");
    name.setAttribute("id", "job-name");
    name.setAttribute("placeholder", "Enter job name");

    const notes = document.createElement("textarea");
    notes.value = job.notes;
    notes.setAttribute("rows", "10");
    notes.setAttribute("cols", "40");
    notes.setAttribute("name", "notes");
    notes.setAttribute("id", "job-notes");
    notes.setAttribute("placeholder", "Enter Job notes");

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", function(){
    saveJob(index);
    });

    // creating a container to hold addtool and addmaterial
    const resourceDiv = document.createElement("section");
    resourceDiv.setAttribute("id", "resource-container");

    // "Add tool" form
    const toolDiv = document.createElement("div");
    toolDiv.setAttribute("id", "tool-container");

    const toolTitle = document.createElement("p");
    toolTitle.textContent = "Add Tool";

    const toolName = document.createElement("input");
    toolName.setAttribute("id", "tool-name")
    toolName.setAttribute("type", "text");
    toolName.setAttribute("list", "Tool-options");
    toolName.setAttribute("placeholder", "Enter tool");
    
    const toolList = JSON.parse(localStorage.getItem("toolList")) || [];
    const toolNames = [];

    const select = document.createElement("select");
    select.setAttribute("id", "tool-qty");
    for (let i = 1; i <= 10; i ++) {
        const qty = document.createElement("option");
        qty.value = i;
        qty.textContent = i;

        select.appendChild(qty);
    }

    const addToolBtn = document.createElement("button");
    addToolBtn.textContent = "Add";
    addToolBtn.addEventListener("click", function() {
        addToolToJob(index);
        const updatedJobList = JSON.parse(localStorage.getItem("jobList")) || [];
        const updatedJob = updatedJobList[index];
        displayRes(updatedJob, editJobWindow);
    });

    // "add material" form 
    const materialDiv = document.createElement("div");
    materialDiv.setAttribute("id", "material-container");

    const materialTitle = document.createElement("p");
    materialTitle.textContent = "Add Material";

    const materialName = document.createElement("input");
    materialName.setAttribute("id", "material-name");
    materialName.setAttribute("type", "text");
    materialName.setAttribute("placeholder", "Enter material");
    
    const materialList = JSON.parse(localStorage.getItem("materialList")) || [];
    const materialNames = [];

    const materialQty = document.createElement("input");
    materialQty.setAttribute("id", "material-qty");
    materialQty.setAttribute("placeholder", "Enter qty");


    const addMaterialBtn = document.createElement("button");
    addMaterialBtn.textContent = "Add";
    addMaterialBtn.addEventListener("click", function() {
        addMaterialToJob(index);
        const updatedJobList = JSON.parse(localStorage.getItem("jobList")) || [];
        const updatedJob = updatedJobList[index];
        displayRes(updatedJob, editJobWindow);
    });

    toolDiv.appendChild(toolTitle);
    toolDiv.appendChild(toolName);
    toolDiv.appendChild(select);
    toolDiv.appendChild(addToolBtn);
    
    materialDiv.appendChild(materialTitle);
    materialDiv.appendChild(materialName);
    materialDiv.appendChild(materialQty);
    materialDiv.appendChild(addMaterialBtn);

    resourceDiv.appendChild(toolDiv);
    resourceDiv.appendChild(materialDiv);

    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(notes);
    divContainer.appendChild(saveBtn);
    divContainer.appendChild(resourceDiv);
    editJobWindow.appendChild(divContainer);

    displayRes(job, editJobWindow);
} 

// This function is used in editJob() to save the edited job into local storage
function saveJob(index) {
    const name = document.getElementById("job-name").value.trim();
    const notes = document.getElementById("job-notes").value.trim();

    if (name === "" || notes === "") {
        alert("Invalid input");
        return;
    }

    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobList[index] = { name, notes };
    localStorage.setItem("jobList", JSON.stringify(jobList));
    
    alert("Job updated!");
    editJobWindow();
}

// This function adds tools to job objects
function addToolToJob(index) {
    const toolName = document.getElementById("tool-name").value.trim();
    const quantity = parseInt(document.getElementById("tool-qty").value.trim(), 10);

    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    
    const job = jobList[index];

  if (!Array.isArray(job.tools)) {
        job.tools = [];
    }

    const tool = {
        name: toolName,
        qty: quantity
    };

    job.tools.push(tool);

    localStorage.setItem("jobList", JSON.stringify(jobList));

    document.getElementById("tool-name"). value = "";
    document.getElementById("tool-qty").selectedIndex = 0;

    alert("Tool added!");
}

// This function adds materials to job objects
function addMaterialToJob(index) {
    const materialName = document.getElementById("material-name").value.trim();
    const quantity = document.getElementById("material-qty").value.trim();

    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    
    const job = jobList[index];

  if (!Array.isArray(job.materials)) {
        job.materials = [];
    }

    const material = {
        name: materialName,
        qty: quantity
    };

    job.materials.push(material);

    localStorage.setItem("jobList", JSON.stringify(jobList));

    document.getElementById("material-name"). value = "";
    document.getElementById("material-qty").value = "";

    alert("Material added!");
}

    // Used in edit job to display resource list
    function displayRes(job, editJobWindow) {
     //displaying tools and materials

    const oldResDiv = editJobWindow.querySelector("#view-resource-container");
    if (oldResDiv) oldResDiv.remove();
    const resDiv = document.createElement("section");
    resDiv.setAttribute("id", "view-resource-container");
    
    // Tool container
    const tDiv = document.createElement("div");
    tDiv.setAttribute("id", "view-tool-container");

    const tTitle = document.createElement("p");
    tTitle.setAttribute("id", "tool-title")
    tTitle.textContent = "Tools";

    tDiv.appendChild(tTitle);
    
    for(let i = 0; i <job.tools.length; i ++) {
        const tool = job.tools[i];

        const toolP = document.createElement("p")
        toolP.textContent = `${tool.name} — ${tool.qty}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            deleteTool(i, job);
        });

        tDiv.appendChild(toolP);
        tDiv.appendChild(deleteBtn);
    }

    resDiv.appendChild(tDiv);

    // material container
    const matDiv = document.createElement("div");
    matDiv.setAttribute("id", "view-material-container");

    const matTitle = document.createElement("p");
    matTitle.setAttribute("id", "material-title")
    matTitle.textContent = "Materials";

    matDiv.appendChild(matTitle);
    
    for(let i = 0; i <job.materials.length; i ++) {
        const material = job.materials[i];

        const materialP = document.createElement("p")
        materialP.textContent = `${material.name} — ${material.qty}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            deleteMaterial(i, job);
        });

        matDiv.appendChild(materialP);
        matDiv.appendChild(deleteBtn);
    }

    resDiv.appendChild(matDiv);

    editJobWindow.appendChild(resDiv);
}

function deleteTool(toolIndex, job) {
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];

    // Find the actual job in the jobList by matching name and notes (or some unique ID if you add one)
const targetIndex = jobList.findIndex(function(j) {
    return j.name === job.name && j.notes === job.notes;
});
    if (targetIndex !== -1) {
        const targetJob = jobList[targetIndex];

        if (Array.isArray(targetJob.tools)) {
            targetJob.tools.splice(toolIndex, 1); // Remove the tool
        }

        localStorage.setItem("jobList", JSON.stringify(jobList)); // Save updated jobList

        // Refresh display
        const editJobWindow = document.getElementById("add-edit-job-window");
        displayRes(targetJob, editJobWindow);
    }
}
// used to delete material in editJob()
function deleteMaterial(materialIndex, job) {
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];

    // Find the job to update (based on name + notes)
    const targetIndex = jobList.findIndex(function(j) {
        return j.name === job.name && j.notes === job.notes;
        });

    if (targetIndex !== -1) {
        const targetJob = jobList[targetIndex];

        if (Array.isArray(targetJob.materials)) {
            targetJob.materials.splice(materialIndex, 1); // Remove the material
        }

        localStorage.setItem("jobList", JSON.stringify(jobList)); // Save changes

        // Refresh the resource list
        const editJobWindow = document.getElementById("add-edit-job-window");
        displayRes(targetJob, editJobWindow);
    }
}
