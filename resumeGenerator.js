const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

// if no location in git hub will need to prompt, perhaps for other values 
// as well 

inquirer.prompt([
    {
        type: "input",
        message: "What is your github username?",
        name: "name"
    }
]).then( function (answer) {
    const queryRepos= `https://api.github.com/users/${githubname}/repos?per_page=100`;
    const queryUser = `https://api.github.com/users/` 
   axios.
})  // end of prompt answer function 


