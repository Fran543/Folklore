import { View, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CommentButton(props) {
    return (
        <View>
            <Pressable onPress={props.onPress} style={styles.reviewsContainer}>
                <MaterialCommunityIcons name="comment" color={'white'} size={26} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    reviewsContainer: {
        paddingHorizontal: 5
    }
})