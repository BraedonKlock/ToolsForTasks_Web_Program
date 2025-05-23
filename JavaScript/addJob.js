
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
    const jobDisplay = document.getElementById("jobDisplay");
    const button = document.getElementById("loadJobs");
    
    if (jobDisplay.style.display === "none" || jobDisplay.innerHTML === "") {
        const jobList = JSON.parse(localStorage.getItem("jobList")) || [];
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

            const removeBtn = document.createElement("button");
            removeBtn.setAttribute("id", "removeBtn");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", function() {
                deleteJob(i);
            });

            div.appendChild(name);
            div.appendChild(notes);
            div.appendChild(removeBtn);

            jobDisplay.appendChild(div);

        }
        jobDisplay.style.display = "";
        button.textContent = "Close Job List";
    } else {
        jobDisplay.style.display = "none";
        button.textContent = "List Jobs";
    }
}

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