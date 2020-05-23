import json
import os
import sys

#This code adds the Lib path needed to resolve the boto3 dependency
#Lib folder will be uploaded from an S3 bucket to Lambda
print("Loading Lambda function")
CWD = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(0, os.path.join(CWD, "lib"))
print("Loaded path")
import boto3


def lambda_handler(event, context):
    s = json.dumps(event)
    print("Event passed to my handler: " + s)

    #Check to ensure the body was sent from the client. Will skip all processing, if no body
    if s.find("body") > 0:
        #parse out the items from the body tag
        body = event['body']
        print("Body = " + body)
        jbody = json.loads(body)
        print(jbody)
        name = jbody['Name']
        email = jbody['Email']
        msg = jbody['Msg']
        print("Received data: Name = " + name + ", email = " + email + "Msg = " + msg)

        # send email
        client = boto3.client('ses',
                              region_name='us-west-2',
                              aws_access_key_id='AKIAVEF35TYJOSIRIGVF',
                              aws_secret_access_key='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')

        print("Boto3 client created")
        response = client.send_email(
            Destination={
                'ToAddresses': [email]
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': msg,
                    },
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': name,
                },
            },
            Source='larry.heminger@gmail.com',
        )
        print("Email Sent")

        # Insert to DynamoDB
        print("Creating DynamoDB client")
        dbclient = boto3.client('dynamodb',
                                region_name='us-west-2',
                                aws_access_key_id='AKIAVEF35TYJOSIRIGVF',
                                aws_secret_access_key='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')

        print("Inserting to DynamoDB")
        dbclient.put_item(TableName='Messages',
                          Item={
                              'Name': {'S': name},
                              'Email': {'S': email},
                              'Msg': {'S': msg},
                          })
        print("Insert Complete")
        return {
            'statusCode': 200,
            'body': json.dumps('OK from Larry'),
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }

    else:
        return {
            'statusCode': 422,
            'body': json.dumps('Missing Body'),
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }
