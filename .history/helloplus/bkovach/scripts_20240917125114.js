console.log('Script loaded');

// Fetch posted workouts on page load
window.onload = () => {
    console.log('Fetching posted workouts...');
    fetchPostedWorkouts();
};

// Function to fetch posted workouts from the server
function fetchPostedWorkouts() {
    fetch('/workouts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched workouts:', data); // Log the fetched workouts
        updatePostedWorkouts(data);
    })
    .catch(error => {
        console.error('Fetch error:', error); // Log any fetch errors
    });
}

// Function to update the DOM with posted workouts
function updatePostedWorkouts(data) {
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
}

let myWorkouts = [];

// Add workout to My Workouts list
function addToMyWorkouts(workout) {
    if (!myWorkouts.includes(workout)) {
        myWorkouts.push(workout);
        updateMyWorkouts();
    } else {
        alert(`${workout} is already in your list!`);
    }
}

// Function to update the "My Workouts" list and add a "Remove" button
function updateMyWorkouts() {
    const myWorkoutsList = document.getElementById('my-workouts');
    myWorkoutsList.innerHTML = ''; // Clear previous list
    myWorkouts.forEach((workout, index) => {
        const li = document.createElement('li');
        li.textContent = workout;

        // Create a Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeWorkout(index);
        
        li.appendChild(removeButton);
        myWorkoutsList.appendChild(li);
    });
}

// Function to remove workout from "My Workouts" list
function removeWorkout(index) {
    myWorkouts.splice(index, 1); // Remove the workout by index
    updateMyWorkouts(); // Update the list after removal
}
