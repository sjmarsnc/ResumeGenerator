const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

var totalStars = 0;

const htmlpdf = require('html-pdf');


const writeFileAsynch = util.promisify(fs.writeFile);


inquirer.prompt([
    {
        type: "input",
        message: "What is your github username?",
        name: "githubname"
    },
    {
        type: "list",
        message: "Pick your favorite color from this list:", 
        name: "color", 
        choices: [ "midnightblue", "cadetblue", "crimson", "salmon", "palevioletred", 
                   "tomato", "darkkhaki", "mediumorchid", "rebeccapurple", "seagreen", "teal" ]

    }
]).then(function (answer) {
    const queryRepos = `https://api.github.com/users/${answer.githubname}/repos`;
    const queryUser = `https://api.github.com/users/${answer.githubname}`;



    axios.get(queryRepos)
    .then(function (repos) {

        for (const repo of repos.data) {
            totalStars += repo.stargazers_count;
        }
        console.log("totalStars: ", totalStars);
    })
    .catch(function (error) {
        console.log("Error:" , error);
        if (error.data.message === 'Not Found') {
            console.log(`Name ${anwer.githubname} is not a valid github user.`);
            process.exit(1);
        }

    });

    axios.get(queryUser)
    .then(function (userinfo) {
        console.log(userinfo.data);
        const { name, avatar_url, company, blog, location, bio, public_repos, public_gists, followers, following } = userinfo.data;

        var resumeContent = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./resume.css">
    <title>Resume for ${name}</title>
</head>

<style>

body { 
    color: white;
}

a {
    color: #dddddd !important;  
}

.iconlink:hover { 
    cursor: pointer !important; 
}

.mycards { 
    background-color: ${answer.color}; 
    color: white;
}

.jumbotron {
    position: relative;
    background-color: ${answer.color};
}

#headshot { 
    position: bottom 20%;  
    width: 400px; 
    height: 400px; 

}

</style>

<body>
    <div class="container text-center">
        <div class="jumbotron">
            <h1>Hello! I'm ${name}</h1>
            <img src="${avatar_url}" id="headshot">`;
        if (company !== null) {
            resumeContent = resumeContent + `
            <h3 class="m-3" id="job">Currently working at ${company}</h3>`;
        }
        resumeContent = resumeContent + `
            <div class="row justify-content-around mt-2">`;
        if (location !== null) {
            resumeContent = resumeContent + `
            <span class="col col-2 col-md-3 justify-content-center iconlink">
            <a href="https://google.com/maps/place/${location}" target="_blank">
            <i class="fa fa-2x fa-location-arrow"></i>  ${location}</a>
            </span>`;
        }
        resumeContent = resumeContent + `    
                <span class="col col-2 col-md-3 justify-content-center iconlink">
                <a href="https://github.com/${answer.githubname}" target="_blank">
                <i class="fa fa-2x fa-github"></i> ${answer.githubname}</a>
                </span>`;
        if (blog !== "") {
            resumeContent = resumeContent + `
            <span class="col col-2 col-md-3 justify-content-center iconlink" >
                <a href="${blog}" target="_blank">
                <i class="fa fa-2x fa-desktop"></i> Website</a>                    
                </span>`;
        }
        resumeContent = resumeContent +
            `    </div>
        </div>
    </div>
    <div class="container w-75 ">
    `;
        if (bio !== null) {
            resumeContent = resumeContent + `
        <div class="row justify-content-center"> 
            <h3 class="col-12 text-center" id = "bio"> ${bio}</h3>
        </div>`;
        }
        resumeContent = resumeContent + `    
          <div class="row justify-content-center">
            <div class="col-xs-4">
                <div class="card m-3 mycards">
                    <div class="card-body text-center">
                        <span class="h3">Public Repositories</span>
                        <br>
                        <span class="h3" id="numRepos">${public_repos}</span>
                    </div>
                </div>
            </div>
            <div class="col-xs-4">
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
            <div class="col-xs-4">
                <div class="card m-3  mycards">
                    <div class="card-body text-center">
                        <span class="h3">GitHub Stars</span>
                        <br>
                        <span class="h3" id="numStars">${totalStars}</span>
                    </div>
                </div>
            </div>
            <div class="col-xs-4">
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
        const htmlname = answer.githubname + ".html";
        writeFileAsynch(htmlname, resumeContent).then(function () {
            console.log(`File ${htmlname} successfully written`);
        });

        const pdfname = "./" + answer.githubname + ".pdf";

        var options = {
            format: 'A3',
            orientation: 'portrait',
        };
        htmlpdf.create(resumeContent, options).toFile(pdfname, function (err, res) {
            if (err) return console.log(err);
            //  console.log(res); 
        })

    });   
});

