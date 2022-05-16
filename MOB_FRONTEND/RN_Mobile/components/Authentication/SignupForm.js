import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EndPoints from "../../constants/endPoints";

import Button from '../ui/Button';
import Input from './Input';

export default function AuthForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // const {
    //     email: emailIsInvalid,
    //     password: passwordIsInvalid
    // } = credentialsInvalid;

    async function registerUser(credentials) {

        fetch(EndPoints.registerEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(async (response) => {
                var msg = await response.text()
                if (!response.ok) throw new Error(msg);
                else return msg;
            })
            .then((data) => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }


    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'username':
                setUsername(enteredValue);
                break;
            case 'email':
                setEmail(enteredValue);
                break;
            case 'password':
                setPassword(enteredValue);
                break;
            case 'passwordConfirm':
                setPasswordConfirm(enteredValue);
                break;
        }
    }

    function submitHandler() {
        registerUser({
            username,
            email,
            password,
            passwordConfirm
        });
    }

    return (
        <View style={styles.form}>
            <View>
                <Input
                    label="Username"
                    onUpdateValue={updateInputValueHandler.bind(this, 'username')}
                    value={username}
                    keyboardType="default"
                />

                <Input
                    label="Email Address"
                    onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                    value={email}
                    keyboardType="email-address"
                />

                <Input
                    label="Password"
                    onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                    secure
                    value={password}
                />

                <Input
                    label="Confirm Password"
                    onUpdateValue={updateInputValueHandler.bind(this, 'passwordConfirm')}
                    secure
                    value={passwordConfirm}
                />

                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        Sign up
                    </Button>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
});