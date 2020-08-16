import {createClient} from 'contentful';

// Returns a client object.
export default createClient({
    space: process.env.REACT_APP_API_SPACE,
    accessToken: process.env.REACT_APP_API_ACCESS_TOKEN
});