import React, { Component } from "react";

import {
    Text,
    Button,
    SafeAreaView,
} from 'react-native';

import Keychain from 'react-native-keychain';
import { CommonActions } from '@react-navigation/native';
import styles from "./styles";
export default class MainScreen extends Component {
    
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        let route = props.route;
        let params = route.params;
        this.credentials = params.credentials;
        this.userId = params.userId;
        this.state = {

        }
    }
    onLogout() {
        console.log("logout")
        Keychain.setGenericPassword(this.userId ? this.userId : "noname", "logout")
            .catch(e => console.log(e))
            .finally(() => {
                this.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{
                            name: 'loginScreen',
                        }],
                    })
                );
            });
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>Hello, {this.userId}</Text>
                <Text>You are now in MainScreen</Text>
                <Button onPress={() => this.onLogout()} title="Logout" />
            </SafeAreaView>
        )
    }
}
