import { Text, View, Pressable, StyleSheet } from "react-native";
import EndPoints from "../../constants/endPoints";

export default function CommentSubmitButton(props) {

    const commentProps = {
        comment: props.commentText,
        idStory: props.idStory
    }

    function submitCommentHandler() {
        fetch(EndPoints.addCommentToStory, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentProps)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    props.clearInput()
                },
                (error) => {
                    console.log(error)
                }
            )

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