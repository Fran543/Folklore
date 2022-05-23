import { View, StyleSheet } from 'react-native';
import AuthContent from '../components/Authentication/AuthContent';
import { Button, Snackbar } from 'react-native-paper';
import * as React from 'react';


export default function LoginScreen() {

    const [visible, setVisible] = React.useState(false);

    const [message, setMessage] = React.useState('');

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <AuthContent
                message={message}
                setMessage={(e) => setMessage(e)}
                onToggleSnackBar={onToggleSnackBar} />
            <View style={styles.snackContainer}>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    {message}
                </Snackbar>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    snackContainer: {
        justifyContent: 'space-between',
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})