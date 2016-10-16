import * as models from '../../models';
import * as AWS from 'aws-sdk';
init();
console.log('Amazon config:');
// console.log(AWS.config);

export interface AWSResponse {
    err?: any;
    data?: any;
}

const client = new AWS.DynamoDB.DocumentClient();

export function uploadTicket(ticket: models.Ticket): Promise<AWSResponse> {
    return new Promise<AWSResponse>((resolve, reject) => {
        console.log('Importing tickets into DynamoDB. Please wait.');
        if (!ticket) return null;
        const params = {
            TableName: 'Reports',
            Item: {
                'url': ticket.getUrl(),
                'username': ticket.getUsername(),
                'timestamp': ticket.getTimestamp(),
                'image': ticket.getImage(),        // expects a base64 encoded image string
                'description': ticket.getDescription(),
                'category': ticket.getCategory(),
            }
        };

        client.put(params, (err: any, data: any) => {
            const res = {err, data};
            if (err) {
                console.error('Unable to add movie', ticket.getTimestamp(), '. Error JSON:', JSON.stringify(err, null, 2));
                reject(res);
                return;
            } else {
                console.log('PutItem succeeded:', ticket.getTimestamp());
                resolve(res);
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