import { View, Pressable, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CommentButton(props) {
    return (
        <View>
            <Pressable onPress={props.onPress} style={styles.reviewsContainer}>
                <MaterialCommunityIcons name="comment" color={'white'} size={26} />
                <Text style={styles.text}>{props.commentNbr}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
    reviewsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    }
})