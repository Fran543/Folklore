import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EndPoints from "../../constants/endPoints";

import Button from '../ui/Button';
import Input from './Input';

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const {
    //     email: emailIsInvalid,
    //     password: passwordIsInvalid
    // } = credentialsInvalid;


    function loginUser(credentials) {
        fetch(EndPoints.loginEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message.message;
            })
            .then(async (data) => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEmail(enteredValue);
                break;
            case 'password':
                setPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        loginUser({
            email,
            password
        });
    }

    return (
        <View style={styles.form}>
            <View>
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

                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        Login
                    </Button>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
});