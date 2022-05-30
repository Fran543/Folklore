import { View, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EndPoints from "../../constants/endPoints";

export default function AddToLibraryButton({ idStory }) {


    const addToLibrary = () => {
        console.log(idStory)
        fetch(EndPoints.addStoryToUserLibraryEndPoint + "?storyID=" + idStory, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
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
        <View>
            <Pressable onPress={() => addToLibrary()} style={styles.reviewsContainer}>
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