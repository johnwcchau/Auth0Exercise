import React, { Component } from 'react';
import {
    Text,
    SafeAreaView,
} from 'react-native';
import Keychain from 'react-native-keychain';
import styles from './styles';
import auth0, {routines} from './auth0';
export default class SplashScreen extends Component {
    
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }

    componentDidMount() {
        Keychain.getGenericPassword().then(credentials => {
            
            let userId = credentials.username;
            let refreshToken = credentials.password;
            if (!userId || userId == "noname" || !refreshToken || refreshToken == "logout") {
                routines.goLogin(this);
                return;
            }
            auth0.auth
                .refreshToken({
                    refreshToken: refreshToken
                })
                .then(credentials => {
                    routines.goMain(this, credentials, userId);
                })
                .catch(e => {
                    console.error("at refreshToken");
                    console.error(e);
                    routines.goLogin(this);
                })

        }).catch(e => {
            console.error("at getGenericPassword");
            console.error(e);
            routines.goLogin(this);
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>Auth0Exercise</Text>
            </SafeAreaView>
        )
    }
}