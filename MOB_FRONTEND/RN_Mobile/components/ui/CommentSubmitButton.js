import { Text, View, Pressable, StyleSheet } from "react-native";

export default function CommentSubmitButton(props) {
    function submitCommentHandler() {
        console.log(props.commentText)
    }

    return (
        <View style={styles.buttonOutterContainer}>
            <Pressable onPress={submitCommentHandler} style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOutterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: '#72063C',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        letterSpacing: 3,
        textTransform: "uppercase"
    },
    pressed: {
        opacity: 0.75
    }

})