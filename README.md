# AuthoWrite Front-End

*Created for the COMP30022 IT Project subject*

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

### <u>Members</u>

[`Adrian Podiono`](https://www.linkedin.com/in/adrian-podiono-787367246)  [`Hanizam Zaharyudin`](https://www.linkedin.com/in/hanizam-zaharyudin-1a5124198)  [`Jia Jie Zheng`](https://www.linkedin.com/in/thomas-zheng-7622a2190/)  [`Lin Xin Xie`](https://www.linkedin.com/in/linxx/)  [`Saaiq Ahmed`](https://www.linkedin.com/in/saaiq-ahmed-364b5a219/)

## Description

The front end repository for the AuthoWrite website created for the client [Eduardo Oliveira](https://www.eduoliveira.com/). The site allows a user to input or upload texts that are known to be written by someone to then help determine whether another text is written by that same author. We determine this through a model that can be found in our back-end which outputs an **Authorship Score** which is a percentage on the likelihood of the unknown text being written by that author. Alongside the score we are also given a list of other statistics comparing the known and unknown text for the user's insight.

## How To Use

The website can be accessed using the link: [AuthoWrite](http://authowrite-front-end-bucket.s3-website-ap-southeast-2.amazonaws.com/)

Which comes with a tutorial on how to use the app by clicking the **(?)** button on the bottom right when you enter the site's compare page.

For anyone trying to run a clone of the website, please install Angular and node.js to run the website properly. To ensure the processing is functional, make sure the deployment of the [Back-End](https://github.com/Re-Roll/AuthoWrite-back-end) is publically available, where the [AuthoWrite Back-End Documentation](http://3.26.213.177:5000/docs) should be available to view.  

## Deployment Method

The front end was deployed using **CodePipeline** which was connected with the GitHub repository. The CodePipeline then included a Build phase which used **CodeBuild** to build the Angular app with the Buildspec:

    version: 0.2

    env:
        variables:
            CACHE_CONTROL: "86400"
            S3_BUCKET: "{{S3_BUCKET}}"
    phases:
        install:
            runtime-versions:
            nodejs: 18
            commands:
            - npm install
            - npm install -g @angular/cli
        build:
            commands:
            - ng build --configuration production
    artifacts:
        files:
            - '**/*'
        discard-paths: yes
        base-directory: 'dist*'

The final built Angular app is then pipelined to an **S3 Bucket** which publically hosts the website.