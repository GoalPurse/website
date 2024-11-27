document.addEventListener("DOMContentLoaded", () => {
    let timer;
    const task = {
        link: "https://example.com/task-video", // Simulated task link
        correctCode: "12345", // Correct code for validation
        duration: 30 * 60, // Task duration in seconds (30 minutes)
    };

    const taskDescription = "Watch the video and enter the code displayed.";
    const taskLink = document.getElementById("taskLink");
    const codeInput = document.getElementById("codeInput");
    const submitCodeButton = document.getElementById("submitCode");
    const taskContainer = document.getElementById("taskContainer");
    const taskStatus = document.getElementById("taskStatus");
    const timeRemaining = document.getElementById("timeRemaining");

    // Function to start the task
    const startTask = () => {
        taskLink.href = task.link;
        document.getElementById("taskDescription").innerText = taskDescription;
        taskLink.classList.remove("hidden");
        document.getElementById("codeInputGroup").classList.remove("hidden");
        taskStatus.innerText = "";
        timeRemaining.innerText = formatTime(task.duration);
        startTimer(task.duration);
    };

    // Timer function
    const startTimer = (duration) => {
        let timeLeft = duration;
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                disableTask();
            } else {
                timeLeft--;
                timeRemaining.innerText = formatTime(timeLeft);
            }
        }, 1000);
    };

    // Disable task after time runs out
    const disableTask = () => {
        taskLink.classList.add("hidden");
        document.getElementById("codeInputGroup").classList.add("hidden");
        taskStatus.innerText = "Task expired!";
        taskStatus.style.color = "red";
    };

    // Format time in MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
    };

    // Code validation
    submitCodeButton.addEventListener("click", () => {
        const userCode = codeInput.value.trim();
        if (userCode === task.correctCode) {
            clearInterval(timer);
            document.getElementById("codeInputGroup").classList.add("hidden");
            taskStatus.innerText = "Completed!";
            taskStatus.style.color = "green";
        } else {
            codeInput.classList.add("invalid");
            taskStatus.innerText = "Incorrect code!";
            taskStatus.style.color = "red";
        }
    });

    // Initialize task
    startTask();
});
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle"); // The menu toggle button
    const sidebar = document.querySelector(".sidebar"); // The sidebar

    // Check if both elements exist before adding event listeners
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the event from bubbling up
            sidebar.classList.toggle("open"); // Toggle the "open" class on the sidebar
        });

        // Close the sidebar if clicking anywhere outside it
        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove("open");
            }
        });
    } else {
        console.error("Menu toggle button or sidebar is missing in the DOM.");
    }
});
