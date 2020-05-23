
import json

print("Loading Lambda function")


def lambda_handler(event, context):
    try:
        print("Event passed to my handler: " + json.dumps(event))
        body = json.dumps(event['body'])
        print("Body = " + body)
        #name =
        #email = event['body']['Email']
        #msg = event['body']['Msg']
        #print("Received data: Name = " + name + ", email = " + email + "Msg = " + msg)

    except KeyError:
        print("No body found in event")

    finally:
        return {
            'statusCode': 200,
            'body': json.dumps('OK from Larry'),
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }