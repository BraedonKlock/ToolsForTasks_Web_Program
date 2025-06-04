/*
 * - Braedon Klock -
 * This file handles all the adding, loading, deleting and editing of the jobList array.
 * It also handles the loading of different "windows" within the <section id="display"> of jobs.html 
 */

/*
 * Creates and displays the "Add Job" window.
 * Uses DOM manipulation to dynamically generate and inject HTML elements into the DOM for the job input form.
 */
function addJobWindow() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='add-edit-job-window'></div>";
    const addJobWindow = document.getElementById("add-edit-job-window");
    
    // Create the main container for the window
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "add-edit-job-window-container");
     
    // Create the add job window
    const label = document.createElement("p");
    label.textContent = "Add Job";
    
    // Create input for the name of the job to be added
    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "job-name");
    name.setAttribute("placeholder", "Enter job name");

    //creating input for the notes of the job to be added
    const notes = document.createElement("textarea");
    notes.setAttribute("rows", "10");
    notes.setAttribute("cols", "40");
    notes.setAttribute("name", "notes");
    notes.setAttribute("id", "job-notes");
    notes.setAttribute("placeholder", "Enter Job notes");

    // Creating add button and attaching an event listener to it which runs the addJob function
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", function(){
        addJob();
    });
    
    // Appending elements to the main the container
    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(notes);
    divContainer.appendChild(addBtn);

    // Injecting the main container into the window
    addJobWindow.appendChild(divContainer);
}

/*
 * This function saves jobs to local storage.
 * Gets the input elements in addJobWindow().
 * Assigns the value of the input elements to variables which then are assigned to a job object.
 * The job object is then pushed to the jobList array and that is saved in local storage.
 */
function addJob() {
    // getting input element values  for the job name and notes
    const name = document.getElementById("job-name").value.trim();
    const notes = document.getElementById("job-notes").value.trim();
        if(name ==="") {    // Job must have a name
            alert("Ivalid input");
            return;
        }
        
    const job = {   // creating job object
        name: name,
        notes: notes,
        tools: [],  // tools array stores list of tools for the job
        materials: []   // materials array stores list of materials for the job
    }
    
    // getting joblist array from storage
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobList.push(job);  // pushing job object to jobList array
    localStorage.setItem("jobList", JSON.stringify(jobList));   // saving Joblist array to local storage

    // clearing input fields 
    document.getElementById("job-name").value = "";
    document.getElementById("job-notes").value = "";

    alert("Job added!");    // job added confirmation
}

/*
 * This function loads and lists the jobs in the jobList array when "List Jobs" is clicked
 * Uses DOM manipulation to dynamically generate and inject HTML elements into the DOM for the list job form.
 */
function loadJobs() {
    const display = document.getElementById("display");
    display.innerHTML = "<div id='job-display'></div>";
    const jobDisplay = document.getElementById("job-display");
    const button = document.getElementById("load-jobs");

    // getting jobList array and assigning it to a variable
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    jobDisplay.innerHTML = "";  // clearing the HTML element so duplicates aren't displayed
    
    // using a for loop to iterate through jobList indexes to display each jobs name and notes and creating a container for each job 
    for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];
        
        const div = document.createElement("div");  //job container
        div.setAttribute("class", "list-jobs-window");
        
        const name = document.createElement("p");   // job name
        name.setAttribute("class", "jobs-names");
        name.textContent = job.name;

        const notes = document.createElement("p");  // job notes
        notes.setAttribute("class", "jobs-notes");
        notes.textContent = job.notes;

        /* creating a "view" button so the user can expand the job and view the tools and materials for that job.
         * Attached an event listener that runs the viewJob() function which displays the jobs properties.
         */
        const viewBtn = document.createElement("button");
        viewBtn.setAttribute("id", "view-btn");
        viewBtn.textContent = "View";
        viewBtn.addEventListener("click", function() {
            // this function displays the jobs properties. passing the current jobs index as an argument to be used to retrieve the current job
            viewJob(i); 
        });
        // appending job related elelments to the main job container
        div.appendChild(name);
        div.appendChild(notes);
        div.appendChild(viewBtn);
        
        // injecting main job container into the HTML element
        jobDisplay.appendChild(div);
    }
}

/*
 * This function displays a window of the list of jobs in the jobList array when the "Delete Job" option is clicked
 * It functions like the viewJob() function display job objects name and notes but has a delete button
 */
function deleteJobsWindow() {
    const display = document.getElementById("display"); // getting element to display deletejob window
    display.innerHTML = "<div id='job-display'></div>"; // clearing element display by creating a new element
    const jobDisplay = document.getElementById("job-display");  // getting the new element to display jobs
    
    const jobList = JSON.parse(localStorage.getItem("jobList")) || []; // getting jobList array from local storage
    jobDisplay.innerHTML = "";
    
    /*using for loop to iterate through jobList array and display each job properties by inserting them into      created elements. button created for job deletion
    */
    for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];
        
        const div = document.createElement("div");  // job container
        div.setAttribute("class", "list-jobs-window");
        
        const name = document.createElement("p");   // element displays job name
        name.setAttribute("class", "jobs-names");
        name.textContent = job.name;

        const notes = document.createElement("p");  // element displays job notes
        notes.setAttribute("class", "jobs-notes");
        notes.textContent = job.notes;
        // creating delete button and attaching event listener that calls deleteJob() function. passing in current index of jobList as an argument to use to find the job and delete it
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
        deleteJob(i);
        });
        
        // appending job elements to the job container
        div.appendChild(name);
        div.appendChild(notes);
        div.appendChild(deleteBtn);
        
        // injecting job container into the HTML element to be displayed
        jobDisplay.appendChild(div);
    }
}

/*
 * This function is called in loadJobs(). it displays the job at the index that is passed in as an argument
 * It displays job's name, notes, tools, and materials associated with the job
 */
function viewJob(index) {
    const display = document.getElementById("display"); // getting element to inject job properties for display
    display.innerHTML = "<div id='view-job-display'></div>"; // clearing the element by creating a new <div>
    const viewJobDisplay = document.getElementById("view-job-display"); // getting that <div> to inject job 
    const button = document.getElementById("load-jobs");
    
    // getting JobList array from storage to display tp user by injecting it into the elements elow 
    const jobList = JSON.parse(localStorage.getItem("jobList")) || []; 
    // creating job object to store job from array list at index passed in from the argument in loadJobs()
    const job = jobList[index]; 

    // Creating container to hold all elements that hold the job's properties
    const div = document.createElement("div");
    div.setAttribute("id", "view-job-delete");

    const name = document.createElement("p"); // job name
    name.setAttribute("class", "jobs-names");
    name.textContent = job.name;

    const notes = document.createElement("p");  // job notes
    notes.setAttribute("class", "jobs-notes");
    notes.textContent = job.notes;

    // creating a container to hold all the elements that hold that job's tools & matierisals, and the tool's an material's properties
    const resourceDiv = document.createElement("section"); // container
    resourceDiv.setAttribute("id", "view-resource-container");
    
    // creating a container to hold tools
    const toolDiv = document.createElement("div"); 
    toolDiv.setAttribute("id", "view-tool-container");

    const toolTitle = document.createElement("p"); // container title
    toolTitle.setAttribute("id", "tool-title")
    toolTitle.textContent = "Tools";

    toolDiv.appendChild(toolTitle); // appending tool container title to its container
    
    // using a for loop to handle edge case of tool not being an array. 
    if (Array.isArray(job.tools)) {

        // looping through tools array in job and creating elements in DOM to store tool's properties
        for (let i = 0; i < job.tools.length; i++) {
            const tool = job.tools[i];  // storing tool in variable
            const toolP = document.createElement("p");  // creating element to store tool properties 
            toolP.textContent = `${tool.name} — ${tool.qty}`;
            toolDiv.appendChild(toolP); //appending element <p> to the tools conatiner
        }
    }
    // appending tool container to section container that holds both tools and materials
    resourceDiv.appendChild(toolDiv)

    // creating a container for materials
    const materialDiv = document.createElement("div");
    materialDiv.setAttribute("id", "view-material-container");

    const materialTitle = document.createElement("p"); // creating title for material container
    materialTitle.setAttribute("id", "material-title")
    materialTitle.textContent = "Materials";

    materialDiv.appendChild(materialTitle); // appending title to the material container
    
    // handling edge case of materials not being initialized  as an array.
    if (Array.isArray(job.materials)) {

        // for loop used to loop through materials array and creating elements in DOM to store the materials properties
        for (let i = 0; i < job.materials.length; i++) {
            const material = job.materials[i]; // storing material in material array in a variable
            const materialP = document.createElement("p"); // creating element to hold material's properties
            materialP.textContent = `${material.name} — ${material.qty}`;
            materialDiv.appendChild(materialP); // appending material properties to material container
        }
    }

    resourceDiv.appendChild(materialDiv); // appending material container to section container

    div.appendChild(name); // apppending job name to top most container
    div.appendChild(notes); // appending job's notes to top most container
    div.appendChild(resourceDiv); // appending tool's and material's container to top most  container
    viewJobDisplay.appendChild(div); // injecting top most container into element for display
}

// This function deletes jobs from local storage is is called from the deleteJobsWindow(). index of job being deleted is passed in as an argument.
function deleteJob(index) {

    // loading jobList array from local storage and storing it in a variable
    const jobList = JSON.parse(localStorage.getItem("jobList")) || []; 

    // using if statement to handle edge case of array out of bounds
    if (index >=  0 && index < jobList.length) {
        jobList.splice(index, 1); // deleting one job at index passed into function

        localStorage.setItem("jobList", JSON.stringify(jobList)); // saving updating jobList to storage

        // displaying window again to give an update delete job window list without having to reload the page
        deleteJobsWindow(); 
    }
}

/*
 * This function displays the window when the job option "edit job" is chosen
 * It loads jobs from storage and displays them with an edit button.
 * The edit button takes the user to a new window where they can edit job name and notes
 * and add or delete tools and materials associated with the job
 */ 
function editJobWindow() {
    const display = document.getElementById("display"); // getting element where containers will be displayed
    display.innerHTML = "<div id='job-display'></div>"; // clearing anything within the element by using innerHTML

    const jobDisplay = document.getElementById("job-display");

    // loading jobsList array from storage and putting it in a variable
    const jobList = JSON.parse(localStorage.getItem("jobList")) || []; 

    // using a for loop to loop through jobList array and create the container that will hold the elements and the job's properties
    for (let i = 0; i < jobList.length; i++) {
    const job = jobList[i];
        
        const div = document.createElement("div"); // creating container that holds the job
        div.setAttribute("class", "list-jobs-window");
        
        const name = document.createElement("p"); // creating element that holds job's name
        name.setAttribute("class", "jobs-names");
        name.textContent = job.name;

        const notes = document.createElement("p"); // creating element that holds job's notes
        notes.setAttribute("class", "jobs-notes");
        notes.textContent = job.notes;

        const editBtn = document.createElement("button"); // creating button that takes the user to the edit window
        editBtn.setAttribute("id", "edit-btn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function() { // attached event listener
        editJob(i);
        });
        
        // appeding job's properties and edid button to the job's container
        div.appendChild(name); 
        div.appendChild(notes);
        div.appendChild(editBtn);
        
        jobDisplay.appendChild(div); // injecting job container into element to be displayed
    }
}

/*
 * This function displays the window that allows the user to edit their job.
 * This function creates a container that holds the job at the index thats passed through as an argument.
 * The job's name and notes properties are pre-loaded into the input elements for editing
 * Another container is created that allows for tools and materials to be added to the job
 * One last container is created at the bottom that shows current list of tools and materials with delete buttons
 * this list updates dynamically after something is either deleted or added.
 */ 
function editJob(index) {
    const display = document.getElementById("display"); // getting display element to inject editJobWindow
    display.innerHTML = "<div id='add-edit-job-window'></div>"; // clearing display element by using innerHTML
    const editJobWindow = document.getElementById("add-edit-job-window"); // creating editJobWindow
    const jobList = JSON.parse(localStorage.getItem("jobList")) || []; // loading jobList array int oa variable
    const job = jobList[index]; // getting job from array and assigning it to a variable
    
    const divContainer = document.createElement("div"); // creatign container to hold job edit 
    divContainer.setAttribute("id", "add-edit-job-window-container");
    const label = document.createElement("p"); 
    label.textContent = "Edit Job"; // title for container 

    const name = document.createElement("input"); // input element created to be able to edit job's name
    name.value = job.name; // pre loading job's name for easy editing
    name.setAttribute("type", "text");
    name.setAttribute("id", "job-name");
    name.setAttribute("placeholder", "Enter job name");

    const notes = document.createElement("textarea"); // creating text area element to be able to edit job's notes
    notes.value = job.notes; // pre loading job's note for easy editing
    notes.setAttribute("rows", "10");
    notes.setAttribute("cols", "40");
    notes.setAttribute("name", "notes");
    notes.setAttribute("id", "job-notes");
    notes.setAttribute("placeholder", "Enter Job notes");

    const saveBtn = document.createElement("button"); // creating save button to save job to local storage
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", function(){ // attached event listener that runes the function saveJob() when clicked
    saveJob(index);
    });

    // creating a container to hold addtool and addmaterial containers
    const resourceDiv = document.createElement("section");
    resourceDiv.setAttribute("id", "resource-container");

    // creating container to hold add tool elements
    const toolDiv = document.createElement("div");
    toolDiv.setAttribute("id", "tool-container");

    const toolTitle = document.createElement("p");
    toolTitle.textContent = "Add Tool"; // add tools containers title

    const toolName = document.createElement("input"); // creating input element to add tool's name
    toolName.setAttribute("id", "tool-name")
    toolName.setAttribute("type", "text");
    toolName.setAttribute("list", "Tool-options");
    toolName.setAttribute("placeholder", "Enter tool");

    const select = document.createElement("select"); // creating select element for drop down qty option
    select.setAttribute("id", "tool-qty");

    // using for loop to create option elements with qty 1 - 10
    for (let i = 1; i <= 10; i ++) {
        const qty = document.createElement("option");
        qty.value = i;
        qty.textContent = i;

        select.appendChild(qty); // appending qty option elements to select element 
    }

    // creating add tool button that adds the tool to job in the JobList array
    const addToolBtn = document.createElement("button"); 
    addToolBtn.textContent = "Add";

    // attached an event listener that runs the addToolToJob() function and saves updated joblist array to local storage then calls displayRes passing through updated arr.....
    addToolBtn.addEventListener("click", function() { 
        addToolToJob(index);
        const updatedJobList = JSON.parse(localStorage.getItem("jobList")) || [];
        const updatedJob = updatedJobList[index];
        displayRes(updatedJob, editJobWindow);
    });

    // Creating a container to hold the add material elements
    const materialDiv = document.createElement("div");
    materialDiv.setAttribute("id", "material-container");

    const materialTitle = document.createElement("p");
    materialTitle.textContent = "Add Material"; // add material title

    const materialName = document.createElement("input"); // input element for material name
    materialName.setAttribute("id", "material-name");
    materialName.setAttribute("type", "text");
    materialName.setAttribute("placeholder", "Enter material");
    
    // input for material quantity
    const materialQty = document.createElement("input");
    materialQty.setAttribute("id", "material-qty");
    materialQty.setAttribute("placeholder", "Enter qty");

    // creating add material button that calls add materialToJob function then jobList is loaded from local storage
    const addMaterialBtn = document.createElement("button");
    addMaterialBtn.textContent = "Add";
    addMaterialBtn.addEventListener("click", function() {
        addMaterialToJob(index);
        const updatedJobList = JSON.parse(localStorage.getItem("jobList")) || [];
        const updatedJob = updatedJobList[index];
        displayRes(updatedJob, editJobWindow);
    });

    // appending tool elements to their container
    toolDiv.appendChild(toolTitle);
    toolDiv.appendChild(toolName);
    toolDiv.appendChild(select);
    toolDiv.appendChild(addToolBtn);
    
    // appending material elements to their container
    materialDiv.appendChild(materialTitle);
    materialDiv.appendChild(materialName);
    materialDiv.appendChild(materialQty);
    materialDiv.appendChild(addMaterialBtn);

    // appending tool and material container to their container
    resourceDiv.appendChild(toolDiv);
    resourceDiv.appendChild(materialDiv);

    // appending edit job elements and tools/materials container to window container
    divContainer.appendChild(label);
    divContainer.appendChild(name);
    divContainer.appendChild(notes);
    divContainer.appendChild(saveBtn);
    divContainer.appendChild(resourceDiv);

    // appending container for all containers in window to one final div
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
