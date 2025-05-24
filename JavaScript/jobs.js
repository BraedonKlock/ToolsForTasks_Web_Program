/*
This file handles all the adding, loading, deleting and editing of the jobList array.
It also handles the loading of different "windows" within the <section id="display"> of jobs.html 
*/

// This function creates the add job window
function addJobWindow() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='addEditJobWindow'></div>";
    const addJobWindow = document.getElementById("addEditJobWindow");
    
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "addEditJobWindowContainer");
     
    const label = document.createElement("p");
    label.textContent = "Add Job";

    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "jobName");
    name.setAttribute("placeholder", "Enter job name");

    const notes = document.createElement("textarea");
    notes.setAttribute("rows", "10");
    notes.setAttribute("cols", "40");
    notes.setAttribute("name", "notes");
    notes.setAttribute("id", "jobNotes");
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
    const name = document.getElementById("jobName").value.trim();
    const notes = document.getElementById("jobNotes").value.trim();
        if(name ==="") {
            alert("Ivalid input");
            return;
        }
        
    const job = {
        name: name,
        notes: notes
    }
    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobList.push(job);
    localStorage.setItem("jobList", JSON.stringify(jobList));

    document.getElementById("jobName").value = "";
    document.getElementById("jobNotes").value = "";

    alert("Job added!");
}

//Loads jobs for viewing window
function loadJobs() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='jobDisplay'></div";
    const jobDisplay = document.getElementById("jobDisplay");
    const button = document.getElementById("loadJobs");

    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobDisplay.innerHTML = "";
    
    for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];
        
        const div = document.createElement("div");
        div.setAttribute("id", "listJobsWindow");
        
        const name = document.createElement("p");
        name.setAttribute("class", "jobsNames");
        name.textContent = job.name;

        const notes = document.createElement("p");
        notes.setAttribute("class", "jobsNotes");

        notes.textContent = job.notes;

        const viewBtn = document.createElement("button");
        viewBtn.setAttribute("id", "viewBtn");
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
    display.innerHTML = "<div id='jobDisplay'></div";
    const jobDisplay = document.getElementById("jobDisplay");
    const button = document.getElementById("loadJobs");
    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobDisplay.innerHTML = "";
    
    for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];
        
        const div = document.createElement("div");
        div.setAttribute("id", "listJobsWindow");
        
        const name = document.createElement("p");
        name.setAttribute("class", "jobsNames");
        name.textContent = job.name;

        const notes = document.createElement("p");
        notes.setAttribute("class", "jobsNotes");
        notes.textContent = job.notes;

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "deleteBtn");
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

// This functions loads jobs from storage for deletion
function viewJob(index) {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='viewJobDisplay'></div";
    const viewJobDisplay = document.getElementById("viewJobDisplay");
    const button = document.getElementById("loadJobs");
    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];

    const job = jobList[index];

    const div = document.createElement("div");
    div.setAttribute("id", "viewJobDelete");

    const name = document.createElement("p");
    name.setAttribute("class", "jobsNames");
    name.textContent = job.name;

    const notes = document.createElement("p");
    notes.setAttribute("class", "jobsNotes");
    notes.textContent = job.notes;

    div.appendChild(name);
    div.appendChild(notes);
    viewJobDisplay.appendChild(div);
}
// This function deletes jobs from local storage
function deleteJob(index, call) {
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    if (index >=  0 && index < jobList.length) {
        jobList.splice(index, 1);

        localStorage.setItem("jobList", JSON.stringify(jobList));
        const jobDisplay = document.getElementById("jobDisplay");

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

// This function displays the window when the job option "edit job" is choosen
function editJobWindow() {
    const display = document.getElementById("display");
    display.innerHTML = '<div id="jobDisplay"></div>';

    const jobDisplay = document.getElementById("jobDisplay");

    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];

    for (let i = 0; i < jobList.length; i++) {
    const job = jobList[i];
        
        const div = document.createElement("div");
        div.setAttribute("id", "listJobsWindow");
        
        const name = document.createElement("p");
        name.setAttribute("class", "jobsNames");
        name.textContent = job.name;

        const notes = document.createElement("p");
        notes.setAttribute("class", "jobsNotes");
        notes.textContent = job.notes;

        const editBtn = document.createElement("button");
        editBtn.setAttribute("id", "editBtn");
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
    const display = document.getElementById("display");
    display.innerHTML = "<div id='addEditJobWindow'></div>";
    const editJobWindow = document.getElementById("addEditJobWindow");
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    const job = jobList[index];
    
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "addEditJobWindowContainer");
    const label = document.createElement("p");
    label.textContent = "Edit Job";

    const name = document.createElement("input");
    name.value = job.name;
    name.setAttribute("type", "text");
    name.setAttribute("id", "jobName");
    name.setAttribute("placeholder", "Enter job name");

    const notes = document.createElement("textarea");
    notes.value = job.notes;
    notes.setAttribute("rows", "10");
    notes.setAttribute("cols", "40");
    notes.setAttribute("name", "notes");
    notes.setAttribute("id", "jobNotes");
    notes.setAttribute("placeholder", "Enter Job notes");

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", function(){
    saveJob(index);
    });

    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(notes);
    divContainer.appendChild(saveBtn);
    editJobWindow.appendChild(divContainer);
} 

// This function is used in editJob() to save the edited job into local storage
function saveJob(index) {
    const name = document.getElementById("jobName").value.trim();
    const notes = document.getElementById("jobNotes").value.trim();

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