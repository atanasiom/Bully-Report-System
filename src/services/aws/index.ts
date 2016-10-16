import * as models from '../../models';
import * as AWS from 'aws-sdk';
init();

export interface AWSResponse {
    err?: any;
    data?: any;
}

const client = new AWS.DynamoDB.DocumentClient();

export function uploadTicket(ticket: models.Ticket): Promise<AWSResponse> {
    return new Promise<AWSResponse>((resolve, reject) => {
        console.log('Importing tickets into DynamoDB. Please wait.');
        if (!ticket) return null;
        const params: AWS.DynamoDB.PutParam = {
            TableName: 'Reports',
            Item: {
                'tickets_': ticket.getId(),
                'url': ticket.getUrl(),
                'email': ticket.getEmail(),
                'timestamp': ticket.getTimestamp(),
                'image': ticket.getImage(),
                'description': ticket.getDescription(),
                'category': ticket.getCategory(),
                'status': ticket.getStatus(),
            }
        };

        client.put(params, (err: any, data: any) => {
            const res = { err, data };
            if (err) {
                console.error('AWS Error:', JSON.stringify(err, null, 2));
                return reject(res);
            } else {
                return resolve(res);
            }
        });
    });
}

export function retrieveTickets(email: any): Promise<AWSResponse> {
    return new Promise<AWSResponse>((resolve, reject) => {
        console.log('Querying for movies from 1985.');
        const params: AWS.DynamoDB.QueryParam = {
            TableName: 'Reports',
            // FilterExpression: 'tickets_',
            ProjectionExpression: 'email',
            KeyConditionExpression: 'email = :email',
            // ExpressionAttributeNames: {

            // },
            ExpressionAttributeValues: {
                ':email': 'email'
            }
        };

        client.query(params, (err: any, data: any) => {
            const res = { err, data };
            if (err) {
                console.error('AWS Error:', JSON.stringify(err, null, 2));
                return reject(res);
            } else {
                return resolve(res);
            }
        });
    });
}


function init() {
    // load config
    try {
        AWS.config.loadFromPath('./localconfig.json');
    } catch (e) {
        console.log('Could not load Amazon DynamoDB config from filesystem; attempting app data');
        try {
            AWS.config.update({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,

            });
        } catch (e) {
            console.log('Could not load Amazon DynamoDB config');
        }
    }
}