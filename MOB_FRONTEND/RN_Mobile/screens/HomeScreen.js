import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, RefreshControl, ActivityIndicator, Text } from "react-native";
import PostGridTile from "../components/home/PostGridTile";
import EndPoints from '../constants/endPoints'
import SearchBar from "../components/home/SearchBar";

export default function HomeScreen({ navigation }) {
    const [postItems, setPostItems] = useState([])
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        getAllPosts()
        return () => {
            setPostItems([]);
        };
    }, [])



    async function getAllPosts() {
        await fetch(EndPoints.getStoriesEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("refreshed")
                    setRefreshing(false);
                    setPostItems(result)
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
            idUser: itemData.item.UserID,
            commentNbr: itemData.item.CommentNbr,
            score: itemData.item.Score,
            username: itemData.item.Username,
            warnings: itemData.item.warnings
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
            <SearchBar style={styles.searchBar} />
            {refreshing ? <ActivityIndicator /> : null}
            <FlatList
                style={styles.flatList}
                data={postItems}
                renderItem={renderPostItem}
                keyExtractor={(item, index) => {
                    return item.IDStory
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing}
                        onRefresh={getAllPosts}
                        enabled={true} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 5
    },
    searchBar: {
        flex: 1,
    },
    flatList: {
        flex: 2
    },
})