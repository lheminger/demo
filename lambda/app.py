import json
import os
import sys

print("Loading Lambda function")
CWD = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(0, os.path.join(CWD, "lib"))
print("Loaded path")
import boto3


def lambda_handler(event, context):
    s = json.dumps(event)
    print("Event passed to my handler: " + s)
    if s.find("body") > 0:
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
                              aws_access_key_id='AKIAVEF35TYJMOUNK7IM',
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
                                aws_access_key_id='AKIAVEF35TYJMOUNK7IM',
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
