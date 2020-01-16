const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
// const github = require("github"); 

const writeFileAsynch = util.promisify(fs.writeFile);  

// if no location in git hub will need to prompt, perhaps for other values 
// as well 

inquirer.prompt([
    {
        type: "input",
        message: "What is your github username?",
        name: "githubname"
    }
]).then( function (answer) {
    // const queryRepos= `https://api.github.com/users/${githubname}/repos?per_page=100`;
    const queryUser = `https://api.github.com/users/${answer.githubname}`;  
     axios.get(queryUser).then(function (userinfo) {
        console.log(userinfo); 
        const { name, avatar_url, company, blog, location, bio, public_repos, public_gists, followers, following } = userinfo;

        var resumeContent = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./resume.css">
    <title>Resume for ${name}</title>
</head>

<body>
    <div class="container text-center">
        <div class="jumbotron">
            <h1>Hello! I'm ${name}</h1>
            <img src="${avatar_url}" id="headshot">`; 
        if (company !== null) {
            resumeContent = resumeContent + `<h3 id="job">${company}</h3>`;
        }
        resumeContent = resumeContent + `
            <div class="row">
                <span class="col col-2 col-md-3 justify-content-center">
                    <i class="fa fa-2x fa-location-arrow"></i>
                    <span id="location">${location}</span>
                </span>
                <span class="col col-2 col-md-3">
                    <i class="fa fa-2x fa-github"></i>
                    <span id="github"><a href="https://github.com/${name}">${name}</a></span>
                </span>
                <span class="col col-2 col-md-3 justify-content-center">
                    <i class="fa fa-2x fa-desktop"></i>
                    <span id="website">
                        <a href="www.linkedin.com/in/susan-marshall-11367715">Susan-Marshall</a>
                    </span>
                </span>
            </div>
        </div>
    </div>`;
    if (bio !== null) {
        resumeContent = resumeContent +
   `    <div class="container w-75 ">
        <div class="row justify-content-center"> 
            <h3 class="col-12 text-center" id = "bio"> ${bio}</h3>
        </div>`; 
    }
    resumeContent = resumeContent + 
    `    <div class="row justify-content-center">
            <div class="col-12 col-md-5">
                <div class="card m-3 mycards">
                    <div class="card-body text-center">
                        <span class="h3">Public Repositories</span>
                        <br>
                        <span class="h3" id="numRepos">${public_repos}</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-5">
                <div class="card m-3  mycards">
                    <div class="card-body text-center">
                        <span class="h3">Followers</span>
                        <br>
                        <span class="h3" id="numFollowers">${followers}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-md-5">
                <div class="card m-3  mycards">
                    <div class="card-body text-center">
                        <span class="h3">GitHub Stars</span>
                        <br>
                        <span class="h3" id="numStars">${public_gists}</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-5">
                <div class="card m-3  mycards">
                    <div class="card-body text-center">
                        <span class="h3">Following</span>
                        <br>
                        <span class="h3" id="numFollowing">${following}</span>
                    </div>
                </div>
            </div>
        </div>
</body>

</html>
        `; 
        writeFileAsynch("resume.html", resumeContent).then (function () { 
            console.log("File successfully written"); 
        });  
   
});  // end of prompt answer function 
}); 
//do something with the writeFileAsynch? 
