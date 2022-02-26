import React, { Component } from 'react';
import {
   Text,
   TextInput,
   Button,
   SafeAreaView,
   View,
   StatusBar,
   Alert,
   TouchableHighlight,
   Image,
} from 'react-native';

import auth0, {routines} from './auth0';
import Keychain from 'react-native-keychain';
import styles from './styles';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.route = props.route;
        this.params = this.route.params;
        this.state = {
            email: "",
            pass: "",
            cannotLogin: true,
        }
        Keychain.getGenericPassword().then(credentials => {
            if (routines.isEmail(credentials.username))
                this.setState({email: credentials.username});
        });
    }
    checkCanLogin() {
        this.setState({cannotLogin: !(routines.isEmail(this.state.email) && this.state.pass != '')});
    }
    
    webAuth(connection) {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email offline_access',
                connection: connection,
            })
            .then(credentials => {
                routines.onSuccess(this, credentials, `${credentials.idToken.substring(0,8)}`);
            })
            .catch(e => {
                console.log(e);
                if (e.error != "a0.session.user_cancelled")
                    Alert.alert('Error', e.error_description);
            });
    }
    onRegister() {
        this.navigation.navigate('registerScreen', {
            email: this.state.email,
            pass: this.state.pass,
        })
    }
    onLogin() {
        routines.onLogin(this, this.state.email, this.state.pass);
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar />
                <Text style={styles.header}>Welcome to Auth0Exercise</Text>
                <TextInput 
                    style={styles.textinput}
                    placeholder='Email' 
                    keyboardType='email-address'
                    onChangeText={text => {
                        this.state.email = text;
                        this.checkCanLogin();
                    }}
                    defaultValue={this.state.email}
                     />
                <TextInput 
                    style={styles.textinput}
                    placeholder='Password' 
                    secureTextEntry={true}
                    keyboardType='default'
                    onChangeText={text => {
                        this.state.pass = text;
                        this.checkCanLogin();
                    }}
                    defaultValue='' />
                <View style={styles.row}>
                    <View style={{padding: 8, minWidth: 128}}>
                        <Button onPress={() => this.onLogin()} disabled={this.state.cannotLogin} title="Login" />
                    </View>
                    <View style={{padding: 8, minWidth: 128}}>
                        <Button color="#888" onPress={() => this.onRegister()} title='Register' />
                    </View>
                </View>
                <TouchableHighlight onPress={() => this.webAuth('facebook')}>
                    <Image style={styles.button} resizeMode='contain' source={require('../img/facebook_light.png')} />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.webAuth('google-oauth2')}>
                    <Image style={styles.button} resizeMode='contain' source={require('../img/google_light.png')} />
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
 };
