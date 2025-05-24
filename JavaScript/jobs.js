// This function creates the add job window
function addJobWindow() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='addJobWindow'></div>";
    const addJobWindow = document.getElementById("addJobWindow");
    
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "addJobWindowContainer");
     
    const label = document.createElement("p");
    label.textContent = "Add Job";

    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "jobName");
    name.setAttribute("placeholder", "Enter job name");

    const notes = document.createElement("textarea");
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
        name.textContent = job.name;
        
        const notes = document.createElement("p");
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

// This functions loads jobs from storage for deletion
function viewJob(index) {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='jobDisplay'></div";
    const jobDisplay = document.getElementById("jobDisplay");
    const button = document.getElementById("loadJobs");
    jobDisplay.innerHTML = "";
    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];

    const job = jobList[index];

    const div = document.createElement("div");
    div.setAttribute("id", "listJobsWindow");

    const name = document.createElement("p");
    name.textContent = job.name;

    const notes = document.createElement("p");
    notes.textContent = job.notes;

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("id", "removeBtn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function() {
        deleteJob(index);
    });

    div.appendChild(name);
    div.appendChild(notes);
    div.appendChild(removeBtn);

    jobDisplay.appendChild(div);
}
// This function deletes jobs from local storage
function deleteJob(index) {
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    if (index >=  0 && index < jobList.length) {
        jobList.splice(index, 1);

        localStorage.setItem("jobList", JSON.stringify(jobList));
        const jobDisplay = document.getElementById("jobDisplay");

        jobDisplay.style.display = "none";
        loadJobs();
    }
}