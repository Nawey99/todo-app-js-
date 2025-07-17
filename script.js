let taskList = [];

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    taskList.forEach((task, index) => {
        const li = document.createElement('li');

        if (task.editing) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = task.text;
            input.onchange = (e) => {
                taskList[index].text = e.target.value;
            };

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.onclick = () => {
                taskList[index].editing = false;
                renderTasks();
            };

            li.appendChild(input);
            li.appendChild(saveBtn);
        } else {
            li.textContent = task.text;

            const actions = document.createElement('div');
            actions.className = 'actions';

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => {
                taskList[index].editing = true;
                renderTasks();
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                taskList.splice(index, 1);
                renderTasks();
            };

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(actions);
        }

        list.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        taskList.push({ text: taskText, editing: false });
        taskInput.value = '';
        renderTasks();
    }
}
