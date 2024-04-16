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
