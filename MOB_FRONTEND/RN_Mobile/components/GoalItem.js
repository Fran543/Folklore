import { StyleSheet, Text } from "react-native"

export default function GoalItem(props) {
    return (
        <Text style={styles.goalItem}>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
    goalItem: {
        backgroundColor: '#FFD5FA',
        color: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }
})