# Sprint 2
* Name: Ethan Crall
* Github ID: ethancrall
* Group Name: Gain & Grain

### What I planned to do
* Complete backend for login page ([Issue #18](https://github.com/utk-cs340-fall24/Gain-Grain/issues/18))
* Complete backend for register page ([Issue #20](https://github.com/utk-cs340-fall24/Gain-Grain/issues/20))
* Complete backend for forgot password page ([Issue #21](https://github.com/utk-cs340-fall24/Gain-Grain/issues/21))

### What I did not do
* I completed all the goals I set for myself.

### What problems I encountered
* It took me a while to learn JS backend and the file structure for Next.js (pages, routes, etc.)
but I ultimately figured it out and successfully fulfilled the goals I set for this sprint.

### Issues I worked on
* [Issue #18](https://github.com/utk-cs340-fall24/Gain-Grain/issues/18)
* [Issue #20](https://github.com/utk-cs340-fall24/Gain-Grain/issues/20)
* [Issue #21](https://github.com/utk-cs340-fall24/Gain-Grain/issues/21)

### Files I worked on
* Login backend
    * gain-grain/src/app/api/login/find-user/route.js
    * gain-grain/src/app/login/page.js
    * gain-grain/src/app/login/login.module.css
* Register backend
    * gain-grain/src/app/api/register/create-user/route.js
    * gain-grain/src/app/register/page.js
    * gain-grain/src/app/register/register.module.css
* Forgot password backend
    * gain-grain/src/app/api/forgot-password/send-email/route.js
    * gain-grain/src/app/api/reset-password/remove-token/route.js
    * gain-grain/src/app/api/reset-password/validate-token/route.js
    * gain-grain/src/app/api/reset-password/reset-password-api/route.js
    * gain-grain/src/app/login/forgot-password/page.js
    * gain-grain/src/app/login/forgot-password/forgot.module.css
    * gain-grain/src/app/login/forgot-password/LockClosedIcon/LockClosedIcon.js
    * gain-grain/src/app/reset-password/page.js
    * gain-grain/src/app/reset-password/reset.module.css
* User Model for backend for all three pages (user schema and functions used in APIs)
    * gain-grain/src/utils/userModel.js

### What I accomplished
In Sprint 2, I created the backend for the login, register, and forgot password pages. For the login page, I authenticated user login info with database entries (if exists) to ensure the username and password were valid. For the register page, I posted user profile information (such as the user's name, mail, username, and password) to the database. For the forgot password page, I added an automatic email process that sends a forgot password link (with a valid token) to the user-inputted email. Then, I made the "reset password" page frontend and the backend that updated the user's profile in the database with their new password. After the password is reset, the token is deleted (or expires after an hour). 