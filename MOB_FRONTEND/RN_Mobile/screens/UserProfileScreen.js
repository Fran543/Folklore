import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from 'react'
import EndPoints from "../constants/endPoints";

import PostGridTile from "../components/home/PostGridTile";
import Button from '../components/ui/Button';

import Carousel from 'react-native-anchor-carousel';


const { width: windowWidth } = Dimensions.get('window');

const ITEM_WIDTH = 0.9 * windowWidth;
const SEPARATOR_WIDTH = 10;

export default function UserProfileScreen({ navigation, logOutUser }) {

    const [user, setUser] = useState({ username: "", email: "" })
    const carouselRef = useRef(null);

    useEffect(() => {
        getUser()
        return () => {
            setUser({ username: "", email: "" });
        };
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

    function renderItem({ item, index }) {
        const postItemProps = {
            idStory: item.IDStory,
            title: item.StoryName,
            summary: item.Summary,
            pubDate: item.PubDate,
            imageBlob: item.ImageBlob,
            idUser: item.UserID,
            commentNbr: item.CommentNbr,
            score: item.Score,
            username: item.Username,
            warnings: item.warnings
        }

        function pressHandler() {
            navigation.navigate("PostFullScreen", { idStory: item.IDStory })
        }
        return (
            <Pressable
                activeOpacity={1}
                onPress={() => {
                    carouselRef.current.scrollToIndex(index);
                }}>
                <PostGridTile
                    {...postItemProps}
                    onPress={pressHandler} />
            </Pressable>
        );
    }

    async function getUser() {
        await fetch(EndPoints.getUserEndPoint, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setUser(result)
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
                    logOutUser();
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    function submitHandler() {
        LogoutUser();
    }

    function deleteUserProfile() {
        fetch(EndPoints.deleteUserEndPoint, {
            credentials: 'include'
        })
            .then(async (response) => {
                let message = await response.json()
                if (!response.ok) throw new Error(message.message);
                else return message.message;
            })
            .then(async (result) => {
                console.log(result)
                logOutUser();
            })
            .catch(error => {
                console.log(error);
            })
    }

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
                    <Button onPress={deleteUserProfile}>
                        Delete Profile
                    </Button>
                </View>
            </View>

            <View style={styles.body}>
                <h1>Blogs:</h1>
                {/* <FlatList data={user.blogs} renderItem={renderPostItem}
                    keyExtractor={(item, index) => {
                        return item.IDStory
                    }}
                /> */}
                <Carousel style={styles.carousel}
                    keyExtractor={item => item?.IDStory}
                    ref={carouselRef}
                    data={user.blogs}
                    renderItem={renderItem}
                    itemWidth={ITEM_WIDTH}
                    separatorWidth={SEPARATOR_WIDTH}
                    inActiveScale={1}
                    inActiveOpacity={1}
                    containerWidth={windowWidth}
                />
            </View>

            <View style={styles.body}>
                <h1>Stories:</h1>
                {/* <FlatList data={user.stories} renderItem={renderPostItem}
                    keyExtractor={(item, index) => {
                        return item.IDStory
                    }}
                /> */}
                <Carousel style={styles.carousel}
                    keyExtractor={item => item?.IDStory}
                    ref={carouselRef}
                    data={user.stories}
                    renderItem={renderItem}
                    itemWidth={ITEM_WIDTH}
                    separatorWidth={SEPARATOR_WIDTH}
                    inActiveScale={1}
                    inActiveOpacity={1}
                    containerWidth={windowWidth}
                />
            </View>
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
        // height: 500,
        alignItems: 'center',
        padding: 20,
    },
    carousel: {
        width: windowWidth,
        height: "100%",
        flexGrow: 0,
        paddingLeft: 20,
        paddingRight: 20
    },
})