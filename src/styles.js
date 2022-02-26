import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',        
    },
    textinput: {
        width: '90%',
        textAlign: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        margin: 8,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingBottom: 32,
    },
    button: {
        padding: 24,
    },
    register: {
        color: '#888'
    },
});
 
 