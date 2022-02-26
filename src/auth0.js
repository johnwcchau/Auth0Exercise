import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Auth0 from 'react-native-auth0';
import Keychain from 'react-native-keychain';

import credential from './auth0Credential.js';
let auth0 = new Auth0(credential);
export default auth0;

export let routines = {
    
    isEmail: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    },
    goLogin: (thiz) => {
        setTimeout(()=>{
            thiz.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: 'loginScreen',
                    }],
                })
            );
        }, 1000);
    },
    goMain: (thiz, credentials, userId) => {
        thiz.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'mainScreen',
                    params: {
                        credentials: credentials,
                        userId: userId,
                    }
                }],
            })
        );
    },
    onSuccess: (thiz, credentials, userId) => {
        Keychain
            .setGenericPassword(userId, credentials.refreshToken)
            .catch(e => {
                console.error("at setGenericPassword");
                console.error(e);
            }).finally(() => {
                routines.goMain(thiz, credentials, userId);
            });
    },
    onLogin: (thiz, userId, pass) => {
        auth0.auth
            .passwordRealm({
                username: userId,
                password: pass,
                realm: 'Username-Password-Authentication',
                scope: 'openid profile email offline_access',
            })
            .then(credentials => {
                //console.log(credentials);
                routines.onSuccess(thiz, credentials, userId);
            })
            .catch(e => {
                console.error("at passwordRealm")
                console.error(e);
                Alert.alert('Error', e.error_description);
            });
    },
    onRegister: (thiz, userId, pass) => {
        auth0.auth.createUser({
            email: userId,
            password: pass,
            connection: 'Username-Password-Authentication',
        }).then(success => {
            routines.onLogin(thiz, userId, pass);
        }).catch(e => {
            console.error("at createUser")
            console.error(e);
            Alert.alert('Error', "" + e);
        });
    }
}
