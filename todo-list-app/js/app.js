// JavaScript code for the TO-DO list app

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    addTaskButton.classList.add('add-task'); // for icon styling
    const taskList = document.getElementById('task-list');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    let emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No tasks yet. Add your first task!';
    if (taskList.children.length === 0) {
        taskList.parentNode.insertBefore(emptyState, taskList.nextSibling);
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
            updateProgress();
        }
    });

    function addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = '✓';
        completeButton.setAttribute('aria-label', 'Mark as complete');
        completeButton.style.background = 'linear-gradient(90deg, #4ade80 0%, #22d3ee 100%)';
        completeButton.style.marginLeft = '0';
        completeButton.style.fontWeight = 'bold';
        completeButton.style.color = '#fff';
        completeButton.style.borderRadius = '7px';
        completeButton.style.padding = '7px 14px';
        completeButton.style.cursor = 'pointer';
        completeButton.style.border = 'none';
        completeButton.style.boxShadow = '0 2px 8px rgba(34, 211, 238, 0.08)';
        completeButton.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            updateProgress();
        });

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.addEventListener('click', function() {
            // Fade out animation before removing
            listItem.classList.add('removing');
            setTimeout(() => {
                if (listItem.parentNode) {
                    taskList.removeChild(listItem);
                    updateProgress();
                }
            }, 300); // match fadeOut duration in CSS
        });

        listItem.appendChild(completeButton);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        updateProgress();
        updateEmptyState();
    }

    function updateProgress() {
        const tasks = taskList.getElementsByTagName('li');
        const total = tasks.length;
        let completed = 0;
        for (let task of tasks) {
            if (task.classList.contains('completed')) {
                completed++;
            }
        }
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
        progressBar.style.width = percent + '%';
        progressText.textContent = `${percent}% completed`;
        updateEmptyState();
    }

    function updateEmptyState() {
        const tasks = taskList.getElementsByTagName('li');
        if (tasks.length === 0) {
            if (!emptyState.parentNode) {
                taskList.parentNode.insertBefore(emptyState, taskList.nextSibling);
            }
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }

    // Initial check for empty state
    updateEmptyState();
});