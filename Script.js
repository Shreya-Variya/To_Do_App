document.addEventListener("DOMContentLoaded", () =>{
    const  storeTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storeTasks)
    {
        storeTasks.forEach((task) => tasks.push(task));
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTask = () =>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = () => {
    let input = document.getElementById("input");
    const text = input.value.trim();

    if(text)
    {
        tasks.push({ text:text, completed:false });
        input.value = "";
        updateTaskList();
        updateStats();
        saveTask();
    }
}

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTask();
}

const deleteTask = (index) =>{
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTask();
}

const editTask = (index) =>{
    const input = document.getElementById("input");
    input.value =tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTask();
}

const updateStats = () =>{
    const completeTasks = tasks.filter(task=> task.completed).length;
    const totalTask = tasks.length;
    const progress = (completeTasks/totalTask)*100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerHTML = `${completeTasks} / ${totalTask}`;
    
    if(tasks.length && completeTasks == totalTask)
    {
        blastConfetti();
    }
}

const updateTaskList = () =>{
    const tasklist = document.getElementById("task-list");
    tasklist.innerHTML = "";

    tasks.forEach((task,index) =>{
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ''}">
                <input type="checkbox" class="checkbox"  ${task.completed ? "checked" : ''}>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="/Edit_icon.png" onClick = "editTask(${index})" />
                <img src="/Bin_icon.webp" onClick = "deleteTask(${index})" />
            </div>
        </div>
        `;
        listItem.addEventListener('change', ()=> toggleTaskComplete(index))
        tasklist.appendChild(listItem);
    })
}

let btn = document.getElementById("btn");

btn.addEventListener('click', function(e){
    e.preventDefault();
    addTask();
})


const blastConfetti = () =>{
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
}