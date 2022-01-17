# You Made the List (YMtL) - Remember the Milk clone
[YMtL](https://you-made-the-list.herokuapp.com/)

[Wiki](https://github.com/EricGartner47/FlaskGroupProject/wiki)

## At A Glance
YMtL is a full stack web application that allows logged in users to:
 - Create a task
 - Edit a created task only by the posting user
 - Delete a created task only by the posting user
 - View tasks by due date
 - Create a list of tasks
 - Edit a list of tasks only by the posting user
 - Delete a list of tasks only by the posting user
 - View a list of tasks by topic
 - View a summary list of task by total tasks, due tasks, and completed tasks
 - Search tasks by keyword

## Application Architecture
YMtL is built with Flask backend and React frontend. PostgreSQL is also used as a database.

## Frontend Technologies Used
YMtL uses React to generate the HTML elements, and then we use CSS to handling the styling of those elements.

## Backend Technologies Used
We used a Flask server to handle the backend communication. We used PostgreSQL because it is easy for us to use and manipulate with sequelize. Again, we used sequelize because of the ease of use as well as our familiarity with the language.

## Key Features
### User Authorization
User authorization is handled using Flask password hashing. When users log in, the password they provide is rehashed and checked against the original password.
![Log In Page](https://github.com/EricGartner47/FlaskGroupProject/blob/main/react-app/src/components/auth/images/login_page.png)
![Splash Page](https://github.com/EricGartner47/FlaskGroupProject/blob/main/react-app/src/components/auth/images/splash_page.png)

### Tasks
An authorized user can create a task under a list that can then be seen by any logged in user. Only the authorized user may then edit or delete the created task.
![Tasks](https://github.com/EricGartner47/FlaskGroupProject/blob/main/react-app/src/components/auth/images/tasks.png)

### Search Tasks
A user can search tasks by keyword in the search bar. The search will generate tasks found by keyword.
![Search Tasks](https://github.com/EricGartner47/FlaskGroupProject/blob/main/react-app/src/components/auth/images/search.png)

### List Summary
A user can view lists by topic . A user can click on a list that will generate the tasks within that list. A list summary will generate an indication of tasks within that list, tasks due, and tasks completed.
![List Summary](https://github.com/EricGartner47/FlaskGroupProject/blob/main/react-app/src/components/auth/images/list%20summary.png)

### Lists
An authorized user may create a list. Only the authorized user can then edit or delete a list.
![Lists](https://github.com/EricGartner47/FlaskGroupProject/blob/main/react-app/src/components/auth/images/lists.png)

## Conclusion and Next Steps
We are happy with the functionality and the styling. However, we would have like to implement the two bonus features of subtasks and an autocomplete.
