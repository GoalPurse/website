document.addEventListener('DOMContentLoaded', () => {
    fetchUserInfo();
    fetchTasks();
    fetchPackages();
  });
  
  function fetchUserInfo() {
    fetch('fetch-user-info.php')
      .then(response => response.json())
      .then(data => {
        document.getElementById('total-earnings').textContent = data.total_earnings;
        document.getElementById('tasks-completed').textContent = data.tasks_completed;
      })
      .catch(err => console.error('Error fetching user info:', err));
  }
  
  function fetchTasks() {
    fetch('fetch-tasks.php')
      .then(response => response.json())
      .then(tasks => {
        const taskList = document.getElementById('task-list');
        tasks.forEach(task => {
          const taskItem = document.createElement('li');
          taskItem.textContent = `${task.title} - ${task.status}`;
          taskList.appendChild(taskItem);
        });
      })
      .catch(err => console.error('Error fetching tasks:', err));
  }
  
  function fetchPackages() {
    fetch('fetch-packages.php')
      .then(response => response.json())
      .then(packages => {
        const packageList = document.getElementById('package-list');
        packages.forEach(pkg => {
          const packageItem = document.createElement('div');
          packageItem.classList.add('package');
          packageItem.innerHTML = `
            <h4>${pkg.name}</h4>
            <p>${pkg.description}</p>
            <p>Price: ${pkg.price} Naira</p>
          `;
          packageList.appendChild(packageItem);
        });
      })
      .catch(err => console.error('Error fetching packages:', err));
  }
  