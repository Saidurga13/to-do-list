const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        const allTasks = document.querySelectorAll("#list-container li");
        const allChecked = Array.from(allTasks).every(task => task.classList.contains("checked"));

        // If all are checked, trigger confetti
        if (allTasks.length > 0 && allChecked) {
            addConfetti();
        }
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function addConfetti(){
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
}
window.addEventListener("load", function(){
    listContainer.innerHTML = localStorage.getItem("data");
})