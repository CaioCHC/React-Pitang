<h1> Scheduling system for Covid-19 treatment. </h1>
<i> A React project proposed by Pitang.</i>

### The project aims to create a scheduling form and a consultation tab, where nurses can save / check information about patients.

![imaegm0](https://user-images.githubusercontent.com/54983425/115833065-036bc000-a3ea-11eb-892e-2cd35c01e700.png)

## Rules of use:
+ Scheduling must be done on a page using a form. 
+ 20 vacancies will be made available for consultation.
+ Limit of 2 places for the same time. 
+ A page must be created to consult the schedules. 
+ Scheduling results should be grouped by day and hour. 
+ If an elderly patient chooses the same time as a younger patient, he will have priority.  

## Business rules:
+ The patient must inform his name, date of birth and day and time of the appointment. 
+ The form fields must be validated, all are mandatory. 
+ Patient data / schedules must be stored in memory. 
+ The nurse must be able to inform in the list of consultations whether the patient was seen or not and what the result was.
+ When the user gives F5 or reloads the page the data cannot be lost. 

## Execution Rules:
+ Portal written in React, use react-datepicker to manage dates; 
+ Build a Node API to receive portal data. 
+ Axios as an http client. 
+ Use Formik to validate data in the view. 
+ IDE is your choice. 

![Imagem 1](https://user-images.githubusercontent.com/54983425/115833335-4f1e6980-a3ea-11eb-9f30-75aeabc9da4b.png)


![im2](https://user-images.githubusercontent.com/54983425/115833820-de2b8180-a3ea-11eb-90c1-eeb7d97eb229.png)

## How to test:

1) Download the files
2) Execute <b>yarn</b> or <b>npm install</b> to install the dependencies
3) At the project terminal execute: <b>json-server --watch db.json --port 3004</b> to start the json server. (<b>npm i json-server</b> if you don't have)
4) Open another terminal and run <b>yarn start</b>

## Auxiliaries dependencies:
 + axios
 + react-router-dom
 + react-bootstrap
 + react-toastify
 + react-icons
 + react-datepicker
 + date-fns
 + formik 
 + yup
 
 ## Comments
 1) Tests have not been implemented
 2) A default behavior of the react datepicker causes the date to be set to the current date if only the time is selected. I was unable to avoid this behavior. Validation handles this, but there is still a visual problem in this specific case.
 3) Some ESlint rules have been disabled.
 4) If you encounter any kind of problem, please let me know. Thanks!
 
 
