import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react'
import StarsRating from "./StarsRating";
import CommentSection from "./CommentSection";
import StarButton from "../ui/StarButton";
import CommentButton from "../ui/CommentButton";
import AddToLibraryButton from "../ui/AddToLibraryButton";

export default function PostGridTile(props, { pubDate }) {



    const [starsToggle, setStarsToggle] = useState(false)
    const [commentsToggle, setCommentsToggle] = useState(false)
    Moment.locale('en');

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
                        source={{ uri: props.imageBlob ? props.imageBlob : require("../../assets/icon.png") }}
                        resizeMode="cover"
                        style={styles.image} />
                </View>
                <View style={styles.metadataContainer}>
                    <Text style={[styles.titleContainer, styles.text]}>{props.title}</Text>
                    {props.warnings.length > 0 && <Text style={[styles.text]}>Warnings</Text>}
                    <View style={styles.warningsHolder}>
                        {props.warnings.map((warning, i) => (
                            <Text style={styles.warning} key={i}>{warning.WarningName} | </Text>
                        ))}
                    </View>
                    <Text style={[styles.summaryContainer, styles.text]}>{props.summary}</Text>
                    <View style={styles.iconsContainer}>
                        <StarButton onPress={starsToggleHandler} score={props.score} />
                        <View style={styles.reviewsContainer}>
                            <MaterialCommunityIcons name="account" color={'white'} size={26} />
                            <Text style={styles.text}>{props.username}</Text>
                        </View>
                        <View style={styles.reviewsContainer}>
                            <MaterialCommunityIcons name="calendar" color={'white'} size={26} />
                            <Text style={styles.text}>{Moment({ pubDate }).format('ddd,MMM,YY')}</Text>
                        </View>
                        <CommentButton onPress={commentsToggleHandler} commentNbr={props.commentNbr} />
                        <AddToLibraryButton idStory={props.idStory} />
                    </View>
                </View>
            </Pressable>
            {starsToggle && <StarsRating idStory={props.idStory} />}
            {commentsToggle && <CommentSection idStory={props.idStory} />}
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
    },
    warningsHolder: {
        flexDirection: 'row'
    },
    warning: {
        color: "#c4c4c4"
    }
})