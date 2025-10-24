const modal = document.getElementById('addTaskModal');
const addTaskBtn = document.getElementById('addTaskBtn');
const cancelBtn = document.getElementById('cancelBtn');
const taskForm = document.getElementById('taskForm');
const priorityOptions = document.querySelectorAll('.priority-option');
const tagsInput = document.getElementById('tags');
const tagsContainer = document.getElementById('tagsContainer');

let tags = [];
let selectedPriority = null;

addTaskBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    document.getElementById('dueDate').valueAsDate = new Date();
});

cancelBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    resetForm();
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        resetForm();
    }
});

priorityOptions.forEach(option => {
    option.addEventListener('click', function() {
        priorityOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        selectedPriority = this.getAttribute('data-value');
    });
});

tagsInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const tag = this.value.trim();
        if (tag && tags.length < 6) {
            tags.push(tag);
            renderTags();
            this.value = '';
        }
    }
});

function renderTags() {
    tagsContainer.innerHTML = '';
    tags.forEach((tag, index) => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.innerHTML = `${tag} <span class="remove-tag" data-index="${index}">×</span>`;
        tagsContainer.appendChild(tagElement);
    });
    
    document.querySelectorAll('.remove-tag').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            tags.splice(index, 1);
            renderTags();
        });
    });
}

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const status = document.getElementById('status').value;
    
    console.log({
        title,
        description,
        dueDate,
        priority: selectedPriority,
        tags,
        status
    });
    
    modal.style.display = 'none';
    resetForm();
    
    alert('Task added successfully!');
});

function resetForm() {
    taskForm.reset();
    priorityOptions.forEach(opt => opt.classList.remove('selected'));
    selectedPriority = null;
    tags = [];
    renderTags();
}