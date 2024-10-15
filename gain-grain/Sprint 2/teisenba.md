# Sprint 2

Trevor Eisenbacher
trevorbacher
Gain-Grain

### What you planned to do
* Create a hamburger-style options menu on the right side of the navbar
* [gh-28](https://github.com/utk-cs340-fall24/Gain-Grain/issues/28)
* Add the navbar to the top of each major page for navigation of the website
* [gh-29](https://github.com/utk-cs340-fall24/Gain-Grain/issues/29)
* Host Gain & Grain
* [gh-30](https://github.com/utk-cs340-fall24/Gain-Grain/issues/30)
* Fix incorrect formatting when the back button is pressed in the browser
* [gh-31](https://github.com/utk-cs340-fall24/Gain-Grain/issues/31)
* Add functionality for the navbar to scale horozontally
* [gh-33](https://github.com/utk-cs340-fall24/Gain-Grain/issues/33)

### What you did not do
* Host the app on Vercel. We decided to not go through with this yet 
* because of the high cost that comes along with it. We will host
* once we reach a later state of development.

### What problems you encountered
* The pages we have set up would often inherit the properties defined in a global.css file
* on pressing the back button, and I couldn't figure out what was causing the issues until
* I finally found that file.
* Many of the ideas I had come up with to do for this sprint (comments, likes, sharing) 
* rely on the backend to exist first.
* We had one large rebasing issue and a smaller one as well. These both led to the deletion
* of some new code and the reintroduction of structures and code we had deleted weeks ago. 
* I believe someone pushed to the repo before pulling, and the group has since met and ironed
* out the issue. We are planning on using branches for the upcoming sprints.

### Issues you worked on
[gh-28](https://github.com/utk-cs340-fall24/Gain-Grain/issues/28)

[gh-29](https://github.com/utk-cs340-fall24/Gain-Grain/issues/29)

[gh-30](https://github.com/utk-cs340-fall24/Gain-Grain/issues/30)

[gh-31](https://github.com/utk-cs340-fall24/Gain-Grain/issues/31)

[gh-33](https://github.com/utk-cs340-fall24/Gain-Grain/issues/33)

### Files you worked on
* gain-grain/src/app/page.js
* gain-grain/src/components/Comments.js
* gain-grain/src/components/Feed.js
* gain-grain/src/components/Navbar.js
* gain-grain/src/components/navbar.module.css
* gain-grain/src/app/post/page.js:
* gain-grain/src/app/profile/page.js
* gain-grain/src/app/profile/profile.module.css:
* gain-grain/src/app/dashboard/calendar/style.css
* gain-grain/src/app/dashboard/calendar/page.js
* gain-grain/src/app/login/page.js
* gain-grain/src/app/app.css
* gain-grain/src/app/homepage.css

### What you accomplished
Overall for this sprint, I improved the user interface and corrected a few visual bugs we were experiencing while
navigating through the app. I did this by extracting several components on the homepage from the homepage file into 
their own .js files and by taking a closer look at the global variables we set at the beginning of the project.I 
also added documentation to a few files so that they are easier to comprehend on an initial look-through. Lastly, I 
helped fix our codebase when we experienced both rebasing issues during this sprint.