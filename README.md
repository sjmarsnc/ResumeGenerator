# ResumeGenerator Program 

This application for node.js dynamically generates a PDF profile when given a GitHub username and a favorite color.  

You invoke the application with the command 

node index.js 

The program will generate a useable HTML file with the name {username}.html, and a PDF file with the name {username}.pdf.  
in the same directory as the application.  

The PDF and HTML pages contain the following (if they exist in the GitHub account): 

* Profile image 
* User name 
* Links to: 
  * User location via Google Maps 
  * User GitHub profile 
  * User blog / website 
* User bio 
* Number of public repositories 
* Number of followers 
* Number of GitHub stars other developers have placed on this user's repositories 
* Number of users following 

## Business Context 

When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

## Usage Notes 

You will need to run "npm install" before using the project. 

## Implementation notes 

The program uses a set list of darker colors so that the white text will be legible.  One enhancement would be to analyze the color given and use black or white text according to which would contrast better. 

