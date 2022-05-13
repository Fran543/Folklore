import { TextInput, StyleSheet } from "react-native";

export default function CommentTextInput(props) {

    return (
        <TextInput
            placeholder="Enter your comment here..."
            keyboardType="default"
            maxLength={500}
            multiline={true}
            textAlign="left"
            style={styles.userInput}
            value={props.commentText}
            onChangeText={props.onChangeText}
        />
    );
}
const styles = StyleSheet.create({
    userInput: {
        borderWidth: 1,
        borderColor: "#808080",
        padding: 12,
        color: 'white',
        borderRadius: 5,
        height: 100
    },
});