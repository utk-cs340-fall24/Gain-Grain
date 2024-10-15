# Sprint 2
bkovach, brodiekovach, Gain & Grain

### What I planned to do
* Implementing functionality to save meals and workouts to the database [gh-24](https://github.com/utk-cs340-fall24/Gain-Grain/issues/24)
* Implementation of URL parsing recipes for meal data [gh-27](https://github.com/utk-cs340-fall24/Gain-Grain/issues/27)
* Import saved meals and workouts from the database for use in calendar [gh-34](https://github.com/utk-cs340-fall24/Gain-Grain/issues/34)

### What I did not do
* extracting ingredients list from the recipe URL data

### Problems I encountered
* The problem with extracting ingredients is figuring out how to properly split the elements into amount and name

### Issues I worked on
* [gh-24](https://github.com/utk-cs340-fall24/Gain-Grain/issues/24)
* [gh-27](https://github.com/utk-cs340-fall24/Gain-Grain/issues/27)
* [gh-34](https://github.com/utk-cs340-fall24/Gain-Grain/issues/34)

### files in the Repo

* Saving meals and workouts
    * gain-grain\src\utils\userMeal.js
    * gain-grain\src\utils\userWorkout.js
    * gain-grain\src\app\api\workouts\saveToProfile\route.js
    * gain-grain\src\app\api\meals\saveToProfile\route.js
* URL parsing
    * gain-grain\src\app\api\meals\recipes\route.js
* Importing from saved
    * gain-grain\src\app\api\meals\getSavedMeals\route.js
    * gain-grain\src\app\api\workouts\getSavedWorkouts\route.js
* Calendar implementation of issues
    * gain-grain\src\app\dashboard\calendar\page.js
    * gain-grain\src\app\dashboard\calendar\style.css
    * gain-grain\src\app\dashboard\calendar\titleModal.js
    * gain-grain\src\app\dashboard\calendar\modal.js

### What I accomplished
In the backend, I created schema for our database for user meals and workouts. By saving the userId (which is different for each logged in user), I used this to allow the user to save an entire workout (set of exercises) or a meal to the database for later access. Then I made it so that the user can access what they have saved based on that same userId. This allows the user to be able to import from saved and add a meal or workout to another day much easier. I also worked on some frontend implementation to make sure these features are reactive.