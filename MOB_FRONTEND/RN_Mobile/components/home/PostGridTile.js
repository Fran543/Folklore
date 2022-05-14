import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react'
import StarsRating from "./StarsRating";
import CommentSection from "./CommentSection";
import StarButton from "../ui/StarButton";
import CommentButton from "../ui/CommentButton";
import EndPoints from '../../constants/endPoints'

export default function PostGridTile(props, { pubDate }) {
    const [starsToggle, setStarsToggle] = useState(false)
    const [commentsToggle, setCommentsToggle] = useState(false)
    const [user, setUser] = useState()
    Moment.locale('en');

    useEffect(() => {
        //getUser()
    }, [])

    async function getUser() {
        await fetch(EndPoints.getUserEndPoint + "?id=" + props.idUser, {
            include: "credentials"
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

    function starsToggleHandler() {
        if (starsToggle === false) {
            setStarsToggle(true)
        } else {
            setStarsToggle(false)
        }
    }

    function commentsToggleHandler() {
        if (commentsToggle === false) {
            setCommentsToggle(true)
        } else {
            setCommentsToggle(false)
        }
    }

    return (
        <View style={styles.postContainer}>
            <Pressable
                style={({ pressed }) => pressed ? [styles.innerContainer, styles.postContainerPressed] : styles.innerContainer}
                android_ripple={{ color: 'gray' }}
                onPress={props.onPress}>
                <View>
                    <Image
                        // source={{uri: props.imageBlob}}
                        source={require("../../assets/icon.png")}
                        resizeMode="cover"
                        style={styles.image} />
                </View>
                <View style={styles.metadataContainer}>
                    <Text style={[styles.titleContainer, styles.text]}>{props.title}</Text>
                    <Text style={[styles.text, styles.text]}>Warnings</Text>
                    <Text style={[styles.summaryContainer, styles.text]}>{props.summary}</Text>
                    <View style={styles.iconsContainer}>
                        <StarButton onPress={starsToggleHandler} />
                        <View style={styles.reviewsContainer}>
                            <MaterialCommunityIcons name="account" color={'white'} size={26} />
                            <Text style={styles.text}>User</Text>
                        </View>
                        <View style={styles.reviewsContainer}>
                            <MaterialCommunityIcons name="calendar" color={'white'} size={26} />
                            <Text style={styles.text}>{Moment({ pubDate }).format('d,MMM,YY')}</Text>
                        </View>
                        <CommentButton onPress={commentsToggleHandler} />
                    </View>
                </View>
            </Pressable>
            {starsToggle && <StarsRating />}
            {commentsToggle && <CommentSection />}
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        borderRadius: 10,
        marginVertical: 10,
        flex: 1,
        backgroundColor: '#333333'
    },
    innerContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200,
    },
    metadataContainer: {
        padding: 20,
        flex: 2,
    },
    titleContainer: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    summaryContainer: {
        paddingVertical: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    postContainerPressed: {
        opacity: 0.5
    },
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