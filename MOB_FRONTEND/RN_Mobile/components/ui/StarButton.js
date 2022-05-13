import { View, Pressable, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function StarButton(props) {

    return (
        <View>
            <Pressable onPress={props.onPress}  style={styles.reviewsContainer}>
                <MaterialCommunityIcons name="star" color={'white'} size={26} />
                <Text style={styles.text}>1234</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    reviewsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    }
})