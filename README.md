# Checkbox Tech Challenge <!-- omit in toc -->

Project template for Checkbox's Tech Challenge, a React client and Express/Node server bootstrapped with [Vite](https://vitejs.dev/) and [Vite-Express](https://github.com/szymmis/vite-express).

## Table of contents <!-- omit in toc -->

- [Project scope](#project-scope)
    - [Your task](#your-task)
    - [Out of scope](#out-of-scope)
    - [What we’ll be looking for](#what-well-be-looking-for)
- [Getting started](#getting-started)
    - [Development server](#development-server)
        - [Prerequisites](#prerequisites)
        - [Installing and running](#installing-and-running)
    - [Docker Compose](#docker-compose)
        - [Prerequisites](#prerequisites-1)
        - [Installing and running](#installing-and-running-1)
- [Database configuration](#database-configuration)

## Project scope

You’ve been assigned to a team working on building out a new task
management software. Over the course of a few days, many customer
interviews & user mapping flows, you and your product manager arrive
together at the following set of user stories.

- User should be able to create a new task, including the following
  fields
    - Name
    - Description
    - Due date

- User should be able to view all tasks created in a list view, showing
  all the following details
    - Name
    - Description
    - Due date
    - Create date
    - Status
        - Not urgent
        - Due soon (Due date is within 7 days)
        - Overdue
- User should be able to edit task name, description and due date
- User should be able to search based on task name

### Your task

- Create a working solution that showcases the above user
  stories using the project template provided in this repository
- Please articulate and explain any design decisions you made in your
  readme.
- Feel free to use any libraries to help you
- Don’t worry too much about styling it perfectly!
- List any further improvements to your code that you would’ve made if
  you had time

### Out of scope

- Do not implement any authentication or authorisation
- Do not implement any user management.

### What we’ll be looking for

- Clean, manageable & well structured code
- Production quality code
- Git maturity. Please show your full git commit history (rather than
  pushing everything up in one commit).
- Understanding & effective implementation of fundamental software development principles
- Demonstrated understanding of other tasks you would do if you had time
  & how you would implement them

## Getting started

There are 2 ways to start the project out-of-the-box: [development server](#development-server) or [Docker Compose](#docker-compose). Please note that, for the purposes of the assessment, the final solution **_must_** work as intended via Docker Compose.

### Development server

#### Prerequisites

- [Node](https://nodejs.org/en/) _(see [`.nvmrc`](.nvmrc) for version number)_
- [Yarn 1](https://classic.yarnpkg.com/lang/en/)

#### Installing and running

Open a command line of your preference and do the following:

1. Run `yarn install` to install the dependencies.

2. Run `yarn dev` to start the development server.

3. Wait for a console message saying the app is ready, open the browser of your preference and navigate to http://localhost:3000.

### Docker Compose

#### Prerequisites

- [Node](https://nodejs.org/en/) _(see [`.nvmrc`](.nvmrc) for version number)_
- [Docker Desktop](https://docs.docker.com/desktop/): more convenient as it bundles Docker Compose as well

#### Installing and running

1. Duplicate `.env.sample` in the root folder, name it `.env` and configure all the empty `DB_POSTGRES_*` variables.

2. Run `docker compose up` on a terminal of your choice.

3. Wait for a console message saying the app is ready, open the browser of your preference and navigate to http://localhost:3000.

4. Run `docker compose down` on a separate terminal whenever you want to stop the services.

## Database configuration

The challenge assumes you will be storing and retrieving records from a database. The project contains an initial configuration for [PostgreSQL](https://www.postgresql.org/) to speed things up but you might pick your system of choice if you prefer. Either way, as mentioned before, the application should work as expected when running Docker Compose.
In case you are not using an ORM to manage and connect to the database and are sticking to the project's setup, you should populate the `init.sql` schema creation script at the root. It is run automatically as part of `docker compose up` the first time it gets executed to create your table(s).

## Design Decisions
### Navigation
In designing the navigation for the task management software, I aimed to look for a simple and easy to use setup which would be familiar to users, drawing inspiration from existing everyday websites that utilise a search feature. As such, having the search bar with the button to Create a Task on the left leaves that side to the user to search/create new tasks. Like many task viewing or even shopping websites, the right side is complemented by a filter and sort by functionality to potentially assist the user in narrowing down the types of tasks that they would like to search for.

### Tasks
As for the tasks themselves, I opted for gallery view of the tasks themselves, making it more appealing than just rows upon rows of tasks like an Excel sheet. The cards themselves are a simple design that include much of what the requirements detailed, highlighting the main parts - the name of the task and the status. This is followed by the respective creation and due dates and the description. I have also added in buttons to allow the user to add, edit or delete the respective tasks in 3 standard separate colours that correlate to their outcomes.

The Create/Add Task and Edit Task modals that open are the same in design and are according to the requirements whereby there are inputs for Name, Description and Due Date.
## Improvements
### Features
Further features that I would like to implement further include:
- Filter: the filter button would allow users to filter by a certain criteria such as status (Overdue, Due Soon or Not Urgent) so as to allow for prioritisation of work and possibly by completed tasks.
- Sort By: the sort by button would also allow users to better navigate the tasks that they have on hand. I have added stubs such as status, creation date and due date which could be implemented to help order tasks in a way that will help the user gain an overview of tasks allocated.
- Complete/Delete Task Button: this would add further functionality to the task management system to allow actions other than edit. This would reflect the proper workflow of the completion of tasks and allow for full functionality as intended by the software.

### Backend
- Pagination: assuming there will be larger datasets if the software were to continue growing, implementing pagination would be crucial to allow for better viewing of tasks instead of endless scrolling of tasks. This would be implemented through returning a portion of the tasks at a time (possibly by adding offsets and limits)
- Sorting: as mentioned above, this could benefit the user and could be implemented through extending queries to support other fields
- Caching: I am not too familiar with the implementation of this but caching would store frequently accessed queries to reduce database load and improve the time in which results are returned especially for a larger database.
- Refactoring of functions: some of the functions I have written are quite long and could be made more easily readable and maintainable through decomposition. The code could also be organised into modules based on functionality as well as separating into specific layers (business logic, data access and presentation)
- Error Handling: there is only basic error handling so far that encapsulates the many possible cases that could occur. There are also minimal logging sstatements which could potentially assist in debugging should the codebase become larger.
- Testing: there are no tests currently implemented which means that there is no indicator that once a new feature has been implemented that existing features will function.
### Frontend
- Refactoring and Reusability: despite separating components to their functionalities, these are still quite large and if I had more time I would spend time breaking these down into more focused components.
- Client Side Validation: in terms of the task name, description and due dates there is currently no validation for the inputs and therefore could potentially cause problems in the future.
- Error Handling: currently errors are not displayed to the user effectively and therefore should be implemented to give the user feedback as to what is happening with the software.
