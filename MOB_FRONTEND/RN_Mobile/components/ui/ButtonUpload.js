import { View, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EndPoints from "../../constants/endPoints";

export default function ButtonUpload(props) {

    const blogItemProps = {
        title: props.title,
        summary: props.summary,
        imageBlob: props.image,
        warnings: props.value,
        posts: [{ content: props.content }]
    }

    async function uploadPost() {
        fetch(EndPoints.createStoryEndPoint, {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(blogItemProps),
          })
            .then(async (response) => {
              var msg = await response.text();
              if (!response.ok) throw new Error(msg);
              else return msg;
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
    }

    return (
        <View style={styles.buttonOutterContainer}>
            <Pressable onPress={uploadPost} style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}>
                <MaterialCommunityIcons name="upload" color={'white'} size={26} />
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