# Sample project
This project demonstrates a simple static contact web form hosted on AWS S3 (static web hosting), with the ability to save a message, and then email the message to a user-specific email addres on the backend. The project will demonstrate use of API-Gateway and Lamda fuction to send the email, using AWS SES. The backend also saves the message to an AWS DynamoDB database. 

# Web-based Contact Form App
The live web contact-form app is deployed here: 
      **http://heminger-demo1-app.s3-website-us-west-2.amazonaws.com/**

The web app was built using React + Material UI.  It was created using the Node Package Manager (npn) and used the create-react-app as a template which installed all the node modules.

The code for the main form is located in this repo, here:  **demoapp/src/Components/App/App.js**

The axios library is used to interact with the backend web service API (defined by AWS API Gateway)

The web app is deployed to AWS using the "npn run-script deploy" command, which uses the deploy keyword in the package.json file.  Deployment uses AWS CLI, and assumes AWS CLI was installed and configured using the correct AWS credentials. The site is deployed to the S3 bucket called: s3://heminger-demo1-app

# Lambda Function
The backend for the site is implemented using an AWS Lambda function developed in Python, connected to an AWS API Gateway API. The Python Lambda function takes the form inputs (name, email, message), emails the message to the given address, and then inserts the message to a DynamoDB table.  AWS's boto3 SDK package is used to interact with AWS Simple Email Service (SES) to send the email, and save the message in the DynamoDB table.

The Lambda function was developed using the community edition of PyCharm, and tested locally using a local Python interpter.  The main function is located in the repo here:  **lambda/app.py**.   

To deploy the function:
First, Zip the contents of the lambda folder to lambda.zip.  NOTE: This must include the venv folder, which contains the required dependencies.  We do not have control of the Python enviroment when using AWS Lambda, so all dependencies must be self contained.

Second, Upload the .zip file to an S3 bucket called  "heminger-lamba".  Overwrite the .zip file that's already there. Select the lambda.zip file on the bucket file list page, and copy its URL.

Lastly, On the Lambda console, navigate to the "DemoProcessor" function, select "Upload a file from Amazon S3" as the code entry type, and paste the URL to the .zip file.  Click the Save button at the top.  Also click the Test button, and make sure it was successful.  This means the deployment was successful.  

# AWS Infrastructure
The frontend and backend portions of this project highly depend on the AWS infrastructure that was established for the project.  This includes the two S3 buckets, AWS Lambda function called "DemoProcessor", API Gateway API called "DemoApi", DynamoDB tablename "Messages", SES, and IAM user.   Note: the IAM user credentials in this repo are not the correct ones.

AWS Cloudwatch is also enabled, and can be used to view detailed logs of the Lambda function.  Just navigate to Cloudwatch->Logs.  View the log called: **/aws/lambda/DemoProcessor**.



