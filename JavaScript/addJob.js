
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

function loadJobs() {
    const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
    const jobDisplay = document.getElementById("jobDisplay");
    jobDisplay.innerHTML = "";
    
    for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];

        const div = document.createElement("div");
        div.setAttribute("class", "job");

        const name = document.createElement("p");
        name.setAttribute("class", "JobInfo");
        name.textContent = job.name;

        const notes = document.createElement("p");
        notes.setAttribute("class", "jobInfo");
        notes.textContent = job.notes;

        div.appendChild(name);
        div.appendChild(notes);

        jobDisplay.appendChild(div);

    }
}