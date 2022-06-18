import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import FlatButton from '../ui/FlatButton';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Colors } from '../../constants/styles';

export default function AuthContent(props) {

    // const [credentialsInvalid, setCredentialsInvalid] = useState({
    //     username: false,
    //     email: false,
    //     password: false,
    //     confirmEmail: false,
    //     confirmPassword: false
    // });
    const [isLogin, setIsLogin] = useState(false);

    function switchAuthModeHandler() {
        setIsLogin(isLogin ? false : true)
    }

    // function submitHandler(credentials) {
    //     let { email, confirmEmail, password, confirmPassword } = credentials;

    //     email = email.trim();
    //     password = password.trim();

    //     const emailIsValid = email.includes('@');
    //     const passwordIsValid = password.length > 6;
    //     const emailsAreEqual = email === confirmEmail;
    //     const passwordsAreEqual = password === confirmPassword;

    //     if (
    //         !emailIsValid ||
    //         !passwordIsValid ||
    //         (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    //     ) {
    //         Alert.alert('Invalid input', 'Please check your entered credentials.');
    //         setCredentialsInvalid({
    //             email: !emailIsValid,
    //             confirmEmail: !emailIsValid || !emailsAreEqual,
    //             password: !passwordIsValid,
    //             confirmPassword: !passwordIsValid || !passwordsAreEqual,
    //         });
    //         return;
    //     }
    //     onAuthenticate({ email, password });
    // }

    return (
        <View style={styles.authContent}>
            {isLogin ? <LoginForm logInUser={props.logInUser} message={props.message} setMessage={(e) => props.setMessage(e)} onToggleSnackBar={props.onToggleSnackBar} /> : <SignupForm message={props.message} setMessage={(e) => props.setMessage(e)} onToggleSnackBar={props.onToggleSnackBar} />}
            <View style={styles.buttons}>
                <FlatButton onPress={switchAuthModeHandler}>
                    {isLogin ? 'Create a new user' : 'Log in instead'}
                </FlatButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
});


