import axios from "axios";

//This fn returns an axios instance.
//param context has req object as a property. Destructure the req based on requester (window/server) and use it to append cookie.
export default ({ req }) => {
    if (typeof window === 'undefined') {
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });

    } else {
        return axios.create({
            baseURL: '/'
        });
    }
}