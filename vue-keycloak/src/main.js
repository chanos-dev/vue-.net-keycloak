import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Keycloak from 'keycloak-js'

const initOptions = {
    url: 'http://127.0.0.1:8080/auth',
    realm: 'keycloak-demo',
    clientId: 'app-vue',
    onLoad: 'login-required',
    pkceMethod: 'S256'
}

const keycloak = new Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad, pkceMethod: initOptions.pkceMethod }).then(auth => {

    if (!auth) {
        window.location.reload()
    }

    console.log('success login')

    localStorage.setItem('access-token', keycloak.token)
    localStorage.setItem('refresh-token', keycloak.refreshToken)

    createApp(App)
    .provide('keycloak', keycloak)    
    .mount('#app')
}).catch(err => {

})