import { View, Text, StyleSheet } from "react-native";

export default function LibraryScreen() {
    return (
        <View style={styles.container}>
            <Text>Library</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    }
})