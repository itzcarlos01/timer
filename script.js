let timerInterval;
let remainingTime;
let isTimerRunning = false;

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("resumeBtn").addEventListener("click", resumeTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

function startTimer() {
    let minutes = document.getElementById("minutes").value;
    if (minutes && !isTimerRunning) {
        remainingTime = minutes * 60;
        isTimerRunning = true;
        updateTimerDisplay();
        timerInterval = setInterval(updateTimer, 1000);
        toggleButtons();
    }
}

function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        updateTimerDisplay();
    } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        toggleButtons();
    }
}

function updateTimerDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    document.getElementById("timer").textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    toggleButtons();
}

function resumeTimer() {
    if (!isTimerRunning && remainingTime > 0) {
        isTimerRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
        toggleButtons();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    remainingTime = 0;
    document.getElementById("timer").textContent = "00:00";
    document.getElementById("minutes").value = "";
    toggleButtons();
}

function toggleButtons() {
    document.getElementById("startBtn").disabled = isTimerRunning;
    document.getElementById("resumeBtn").disabled = !isTimerRunning || remainingTime === 0;
    document.getElementById("pauseBtn").disabled = !isTimerRunning;
    document.getElementById("resetBtn").disabled = isTimerRunning && remainingTime > 0;
}
