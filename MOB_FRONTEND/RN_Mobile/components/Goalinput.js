import { View, Button, TextInput } from 'react-native';
import { StyleSheet } from "react-native"

export default function GoalInput() {
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder='Your course goal!' onChangeText={goalinputHandler} />
            <Button title='Add Goal' onPress={addGoalHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        flex: 1,
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: '80%',
        marginRight: 8,
        padding: 8,
    },
})