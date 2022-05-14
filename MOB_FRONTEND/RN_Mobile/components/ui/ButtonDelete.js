import { View, Pressable, StyleSheet, Alert } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ButtonDelete(props) {

    const showAlert = () =>
    Alert.alert(
      "Are you sure you want to delete this post?",
      "By deleting all progress will be lost!",
      [
        {
          text: "Cancel",
          onPress: () => console.log('Canceled'),
          style: "cancel"
        },
        { text: "OK", onPress: props.onPress }
      ]
    );

    return (
        <View style={styles.buttonOutterContainer}>
            <Pressable onPress={showAlert} style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}>
                <MaterialCommunityIcons name="delete" color={'white'} size={26} />
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