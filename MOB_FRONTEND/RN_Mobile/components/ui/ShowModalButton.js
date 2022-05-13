import { StyleSheet, Text, Pressable } from "react-native";

export function ShowModalButton(props) {
    return (
        <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={props.showModal}
        >
            <Text style={styles.textStyle}>{props.children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});