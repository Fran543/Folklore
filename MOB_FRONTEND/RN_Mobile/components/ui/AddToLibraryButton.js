import { View, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddToLibraryButton() {

    return (
        <View>
            <Pressable style={styles.reviewsContainer}>
                <MaterialCommunityIcons name="notebook-plus" color={'black'} size={26} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    reviewsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    }
})