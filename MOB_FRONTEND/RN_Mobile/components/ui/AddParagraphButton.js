import { View, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddParagraphButton(props) {
    return (
        <View style={styles.buttonOutterContainer}>
            <Pressable onPress={() => props.addParagraphToCanvas()} style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}>
                <MaterialCommunityIcons name="plus" color={'white'} size={26} />
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
    pressed: {
        opacity: 0.75
    }
})