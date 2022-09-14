# Employee Salary Management
# Introduction
This repository is part of my submission for GovTech's ESTL TAP Assessment. This repository is not to be
executed alone as it requires the backend server to work. The backend server can be found 
[here](https://github.com/durianpancakes/esm-server).

# Setting Up
Disclaimer: The instructions provided assumes that the user is running on Windows.

This project is built with the following:
* React 18.2.0 

To avoid any potential problems, please install the above version of React.

Instructions to install React can be found [here](https://www.geeksforgeeks.org/how-to-install-reactjs-on-windows/). 


1. Install React 18.2.0
2. Clone the repository into a directory of your choice
3. Run `npm ci` from the root of the project

# Running the Application
1. Ensure that the [server](https://github.com/durianpancakes/esm-server) is set up and running accordingly
2. Run `npm start` from the root of the project. The web application should appear in your default web browser. If not, 
access the page through [http://localhost:3000/](http://localhost:3000/)

# Assumptions
The following assumptions are made:
* While the endpoint to obtain the employee list has many request parameters for sorting and filtering, I am allowed to 
get the whole list of employees from the same endpoint using arbitrarily large numbers, then, performing sorting and 
filtering with the `DataGrid` class from MaterialUI.