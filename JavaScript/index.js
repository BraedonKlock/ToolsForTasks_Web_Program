document.addEventListener('DOMContentLoaded', domReady);

function domReady() {
  const addJobBtn = document.getElementById('addJobBtn');
  addJobBtn.addEventListener('click', goToAddJob);
}

function goToAddJob() {
  window.location.href = 'html/addJob.html';
}

document.addEventListener('DOMContentLoaded', editReady);
function editReady() {
    const editJobBtn = document.getElementById('editJobBtn');
    editJobBtn.addEventListener('click', goToEditJob);
}
    function goToEditJob() {
        window.location.href = 'html/editJob.html';
    }
