# Interview Scheduler

Interview Scheduler is a simple, single-page, React-based application which permits you to create, edit, and delete appointments across various days (Mon - Fri). The use of PSQL also ensures that the appointments you generate persist across various sessions. On this topic, note that you will need to run both the PSQL server and the React-application concurrently in order for this app to function correctly. This is my first take at building a React-based project and I hope you enjoy my work!

!["Screenshot of main view"](https://github.com/FaezCat/scheduler/blob/master/docs/mainDisplay.png?raw=true)

!["Screenshot of creating/editing an appointment"](https://github.com/FaezCat/scheduler/blob/master/docs/createAndEdit.png?raw=true)

!["Screenshot of deleting an appointment"](https://github.com/FaezCat/scheduler/blob/master/docs/delete.png?raw=true)

## Setup

Install dependencies with `npm install`.

## You will need to follow the set of instructions contained in the link below (in the README file specifically) in order to create and run the db server required for this application:

https://github.com/lighthouse-labs/scheduler-api

Please note that both the scheduler-api and interview scheduler applications will need to be running concurrently in order for the scheduler to function correctly

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
