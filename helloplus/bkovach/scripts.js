// Store workouts posted by others and My Workouts
let myWorkouts = [];

// Fetch posted workouts on page load
window.onload = () => {
    fetchPostedWorkouts();
};

// Function to fetch posted workouts from the server
function fetchPostedWorkouts() {
    fetch('/workouts')
    .then(response => response.json())
    .then(data => {
        const postedWorkoutsList = document.getElementById('posted-workouts');
        postedWorkoutsList.innerHTML = ''; // Clear previous list
        data.forEach(workout => {
            const li = document.createElement('li');
            li.textContent = workout;
            const button = document.createElement('button');
            button.textContent = 'Add to My Workouts';
            button.onclick = () => addToMyWorkouts(workout);
            li.appendChild(button);
            postedWorkoutsList.appendChild(li);
        });
    });
}

// Add workout to My Workouts list
function addToMyWorkouts(workout) {
    if (!myWorkouts.includes(workout)) {
        myWorkouts.push(workout);
        updateMyWorkouts();
    } else {
        alert(`${workout} is already in your list!`);
    }
}

function updateMyWorkouts() {
    const myWorkoutsList = document.getElementById('my-workouts');
    myWorkoutsList.innerHTML = ''; // Clear previous list
    myWorkouts.forEach(workout => {
        const li = document.createElement('li');
        li.textContent = workout;
        myWorkoutsList.appendChild(li);
    });
}

