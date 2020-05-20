import Vue from 'vue'
import VueResource from "vue-resource"
Vue.use(VueResource);

export default {
    login (email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            return
        }
        pretendRequest(email, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true);
                this.onChange(true)
            } else {
                if (cb) cb(false);
                this.onChange(false)
            }
        })
    },

    getToken () {
        return localStorage.token
    },

    logout (cb) {
        delete localStorage.token;
        if (cb) cb();
        this.onChange(false)
    },

    loggedIn () {
        return !!localStorage.token
    },

    onChange () {}
}

function pretendRequest (email, pass, cb) {
    Vue.http.post('api/login', {
        'email': email,
        'password': pass
    }).then(
        (response) => {
            console.log(response.body);
            cb({
                authenticated: true,
                token: response.body.access_token
            })
        },
        (response) => {
            cb({ authenticated: false })
        }
    );
}
