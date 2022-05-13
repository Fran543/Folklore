import { View, StyleSheet, Text } from "react-native";

export default function Comment(props) {
    return (
        <View>
            <View style={styles.contentHeader}>
                <Text style={styles.name}>{props.Username}</Text>
                <Text style={styles.time}>
                    9:58 am
                </Text>
            </View>
            <Text style={styles.text}>{props.Content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#C2A695'
    },
    text: {
        color: '#808080'
    }
});