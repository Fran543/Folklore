import { StyleSheet, Text, View, Image, FlatList, ScrollView } from "react-native";
import { useLayoutEffect, useEffect, useState } from 'react'
import EndPoints from "../constants/endPoints";

import PostGridTile from "../components/home/PostGridTile";
import Button from '../components/ui/Button';



export default function UserProfileScreen({ navigation }) {
    const [user, setUser] = useState()

    useEffect(() => {
        getUser()
    }, [])

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
            username: itemData.item.Username
        }

        return <PostGridTile
            {...postItemProps}
            onPress={pressHandler} />

        function pressHandler() {
            navigation.navigate("PostFullScreen", { idStory: itemData.item.IDStory })
        }
    }

    async function getUser() {
        await fetch(EndPoints.getUserEndPoint, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setUser(result)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    async function LogoutUser() {

        console.log(document.cookie)
        fetch(EndPoints.getLogOutPoint, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }

    function submitHandler() {
        LogoutUser();
    }

    // _renderItem = ({ item, index }) => {
    //     return (
    //         <View style={styles.body}>
    //             <h1>{item.name}:</h1>
    //             <FlatList data={item.data} renderItem={renderPostItem}
    //                 keyExtractor={(item, index) => {
    //                     return item.IDStory
    //                 }}
    //             />
    //         </View>
    //     );
    // }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

                    <Text style={styles.name}>{user.username}</Text>
                    <Text style={styles.userInfo}>{user.email}</Text>
                    <Button onPress={submitHandler}>
                        Logout
                    </Button>
                </View>
            </View>

            <View style={styles.body}>
                <h1>Blogs:</h1>
                <FlatList data={user.blogs} renderItem={renderPostItem}
                    keyExtractor={(item, index) => {
                        return item.IDStory
                    }}
                />
            </View>

            <View style={styles.body}>
                <h1>Stories:</h1>
                <FlatList data={user.stories} renderItem={renderPostItem}
                    keyExtractor={(item, index) => {
                        return item.IDStory
                    }}
                />
            </View>

            {/* <Carousel
                ref={(c) => { this._carousel = c; }}
                data={[{ name: "Blogs", data: userBlogs }, { name: "Stories", data: userStories }]}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
            /> */}
        </ScrollView>
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