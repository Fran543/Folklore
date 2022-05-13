import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { useLayoutEffect, useEffect, useState } from 'react'
import { EndPoints } from "../constants/endPoints";
import PostGridTile from "../components/home/PostGridTile";

export default function UserProfileScreen() {
    const [user, setUser] = useState({ username: "Pero", email: "pero@gmail.com" })
    const [userBlogs, setUserBlogs] = useState([])
    const [userStories, setUserStories] = useState([{ IDStory: 1, StoryName: "Ivica i marica", Summary: "kdsjhfksjdfhksdhfkshfkhfksdf" },
    { IDStory: 2, StoryName: "Druzba Pere Kvrzice", Summary: "kdsjhfksjdfhksdhfkshfkhfksdf" },
    { IDStory: 3, StoryName: "Zlocin i kazna", Summary: "kdsjhfksjdfhksdhfkshfkhfksdf" }])

    useEffect(() => {
        //getUser()
    }, [user, userBlogs, userStories])

    async function getUser() {
        // await fetch(EndPoints.getUserEndPoint, {
        //     credentials: "include",
        // })
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             setUser(result)
        //             console.log(result)
        //         },
        //         (error) => {
        //             console.log(error)
        //         }
        //     )
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
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

                    <Text style={styles.name}>{user.username}</Text>
                    <Text style={styles.userInfo}>{user.email}</Text>
                </View>
            </View>

            <View style={styles.body}>
                <FlatList data={userStories} renderItem={renderPostItem}
                    keyExtractor={(item, index) => {
                        return item.IDStory
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#DCDCDC",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },
    body: {
        backgroundColor: "#778899",
        height: 500,
        alignItems: 'center',
        padding: 20
    },

})