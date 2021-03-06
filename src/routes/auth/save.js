import * as api from '../_api.js';

export function post(req, res) {

	const user = req.body;

	api.put('user', { user }, req.session && req.session.token && req.session.token.access_token)
        .then(response => {

    		if (response.user) {

    			req.session.user = response.user;
    		}

    		res.set({ 'Content-Type': 'application/json' });

    		res.end(JSON.stringify(response));
    	});
}