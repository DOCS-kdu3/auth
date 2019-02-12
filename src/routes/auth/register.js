import * as api from '../_api.js';

export function post(req, res) {

    const userCredentials = req.body;
    const clientCredentials = {
        grant_type: 'client_credentials',
        client_id: process.env.id,
        client_secret: process.env.secret
    };

	api.post('/wp/?oauth=token', clientCredentials)
        .then(token => {

            if ( token.access_token ) {
                req.session.token = token;

                api.post('/wp-json/wp/v2/users', userCredentials, token.access_token)
                    .then(user => {

                		res.end(JSON.stringify(user));
                    })
                    .catch(response => {

                        res.send = send.bind(res, response.status);
                        res.end(response);
                    });
            }
        })
        .catch(response => {

            res.send = send.bind(res, response.status);
            res.end(response);
        });
}