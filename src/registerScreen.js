import React, { Component } from 'react';
import {
   Text,
   TextInput,
   Button,
   SafeAreaView,
   View,
   StatusBar,
} from 'react-native';

import { routines } from './auth0';
import styles from './styles';

export default class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.route = props.route;
        this.params = this.route.params;
        this.state = {
            email: this.params.email || '',
            pass: this.params.pass || '',
            confirmPass: "",
            notReady: true,
            warning: '',
        }
    }
    checkReady() {
        if (!routines.isEmail(this.state.email)) {
            this.setState({notReady: true, warning: "Invalid email address"});
        } else if (this.state.pass.length < 7) {
            this.setState({notReady: true, warning: "Short password"});
        } else if (this.state.confirmPass != this.state.pass) {
            this.setState({notReady: true, warning: "Password mismatch"});
        } else {
            this.setState({notReady: false, warning: ''});
        }
    }

    onRegister() {
        routines.onRegister(this, this.state.email, this.state.pass);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar />
                <Text style={styles.header}>Create your own account</Text>
                <TextInput 
                    style={styles.textinput}
                    placeholder='Email' 
                    keyboardType='email-address'
                    onChangeText={text => {
                        this.state.email = text;
                        this.checkReady();
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
                        this.checkReady();
                    }}
                    defaultValue={this.state.pass} />
                <TextInput 
                    style={styles.textinput}
                    placeholder='Confirm Password' 
                    secureTextEntry={true}
                    keyboardType='default'
                    onChangeText={text => {
                        this.state.confirmPass = text;
                        this.checkReady();
                    }}
                    defaultValue='' />
                <Text style={{color: 'red'}}>{this.state.warning}</Text>
                <View style={styles.row}>
                    <View style={{padding: 8, minWidth: 128}}>
                        <Button disabled={this.state.notReady} onPress={() => this.onRegister()} title='Register' />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
 };
