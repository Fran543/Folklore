import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, StatusBar } from "react-native";
import PostGridTile from "../components/home/PostGridTile";
import EndPoints from '../constants/endPoints'

export default function HomeScreen({ navigation }) {
    const [postItems, setPostItems] = useState([{ IDStory: 1, StoryName: 'ajhsask', Summary: 'asdsadd', PubDate: '2000-10-31T01:30:00.000-05:00', UserID: 2 },
    { IDStory: 2, StoryName: 'ajhsask', Summary: 'asdsadd', PubDate: '2000-10-31T01:30:00.000-05:00', UserID: 2 }])

    useEffect(() => {
        getAllPosts()
    }, [])

    async function getAllPosts() {
        await fetch(EndPoints.getStoriesEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    setPostItems(result)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    function renderPostItem(itemData) {
        const postItemProps = {
            idStory: itemData.item.IDStory,
            title: itemData.item.StoryName,
            summary: itemData.item.Summary,
            pubDate: itemData.item.PubDate,
            imageBlob: itemData.item.ImageBlob,
            idUser: itemData.item.UserID
        }

        return <PostGridTile
            {...postItemProps}
            onPress={pressHandler} />

        function pressHandler() {
            navigation.navigate("PostFullScreen", { idStory: itemData.item.IDStory })
        }
    }



    return (
            <View style={styles.rootContainer}>
                <FlatList data={postItems} renderItem={renderPostItem}
                    keyExtractor={(item, index) => {
                        return item.IDStory
                    }}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
})