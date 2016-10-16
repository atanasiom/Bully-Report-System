import * as models from '../../models';
import * as AWS from 'aws-sdk';
init();

export interface AWSResponse {
    err?: any;
    data?: any;
}

const client = new AWS.DynamoDB.DocumentClient();

export function uploadTicket(ticket: models.Ticket): Promise<AWSResponse> {
    console.log('uploadTickets:');
    return new Promise<AWSResponse>((resolve, reject) => {
        console.log('Importing tickets into DynamoDB. Please wait.');
        if (!ticket) return null;
        const params: AWS.DynamoDB.PutParam = {
            TableName: 'Reports',
            Item: {
                '_id': ticket.getId(),
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
        let scan_params: any = {
            TableName: 'Reports',
            ProjectionExpression: '#url, email, image, description, category, #status, #timestamp',
            FilterExpression: 'email = :email',
            ExpressionAttributeNames: {
                '#status': 'status',
                '#url': 'url',
                '#timestamp': 'timestamp',
            },
            ExpressionAttributeValues: {
                ':email': email,
            }
        };

        client.scan(scan_params, onScan);

        let _scan_complete = 1;
        function onScan(err: any, data: any) {
            if (err) {
                reject({ err, data: undefined });
                console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                // data.Items.forEach((ticket: models.interfaces.Ticket) => console.log);

                // continue scanning if we have more movies
                if (typeof data.LastEvaluatedKey !== 'undefined') {
                    console.log('Scanning for more...');
                    scan_params.ExclusiveStartKey = data.LastEvaluatedKey;
                    client.scan(scan_params, onScan);
                }
                if (_scan_complete) {
                    resolve({ err: undefined, data: data.Items });
                }
            }
        }
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