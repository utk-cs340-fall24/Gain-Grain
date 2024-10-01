# Sprint 1
Brodie Kovach, brodiekovach, Gain-Grain

### What I planned to do:
* Functionality to add and remove exercises from the user calendar
  * [gh-10](https://github.com/utk-cs340-fall24/Gain-Grain/issues/10) 
* Functionality to add and remove meals from the user calendar
  * [gh-12](https://github.com/utk-cs340-fall24/Gain-Grain/issues/12)
* Save user meals and exercises to database
  * [gh-13](https://github.com/utk-cs340-fall24/Gain-Grain/issues/13)
* Update frontend code for new calendar(switched calendars half way through)
  * [gh-17](https://github.com/utk-cs340-fall24/Gain-Grain/issues/17)

### What I did not accomplish
* Adding in full support for saving meals and exercises to the user profile/database
* html parsing for recipe URLs

### What problems were encountered

* Problem with fetching userId and using it to store things in the database
* CSS styles being overwritten or just changing seemingly upon full reload
* Issue with how the URL was being parsed for recipe links
* Trouble inegrating old calendar logic with new design

### Issues I worked on
* [gh-10](https://github.com/utk-cs340-fall24/Gain-Grain/issues/10)
* [gh-12](https://github.com/utk-cs340-fall24/Gain-Grain/issues/12)
* [gh-13](https://github.com/utk-cs340-fall24/Gain-Grain/issues/13)(not completed)
* [gh-17](https://github.com/utk-cs340-fall24/Gain-Grain/issues/17)

### Files I worked on
* gain-grain/src/app/dashboard/calendar/page.js (before combining with new calendar)
* gain-grain/src/app/dashboard/calendar/page.js (after combining with new calendar)
* gain-grain/src/app/dashboard/calendar/exerciseSearch.js
* gain-grain/src/app/dashboard/calendar/custom_calendar.css
* gain-grain/src/utils/userWorkout.js
* gain-grain/src/utils/userMeal.js
* gain-grain/src/controllers/saveMealController.js
* gain-grain/src/controllers/saveExerciseController.js
* gain-grain/src/utils/mongodb.js
* gain-grain/src/app/api/meals/recipes/route.js:

### What I accomplished

At the begining, we were just using the imported React Calendar. I Then added buttons to add exercises and meals to a day.

I used an open source exercise database to allow the user to search through those exercises and add them to each day. In the future, the user will also be able to add with saved exercises.

For the meals, it is just a manual process but plan for URL parsing and importing from saved or the user can manually create a meal.

On the UI side, I made these meals and exercises save locally so even if the site is exited or refreshed, the data persists. I also added toggling for the buttons

Once Trevor Eisenbacher made our new calendar, I update my functionality to work with that one and made the UI look better with a "+" that pulls up the add buttons and displays the meals and exercises under the day.





