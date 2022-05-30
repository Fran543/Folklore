import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Pressable,
    Linking,
    Alert,
    View
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import PostGridTile from '../components/home/PostGridTile';
import { useState, useEffect } from 'react';
import EndPoints from '../constants/endPoints';
import { useNavigation } from '@react-navigation/native';


const { width: windowWidth } = Dimensions.get('window');

// const data = [
//     {
//         id: 'item2',
//         image: 'https://i.imgur.com/N3nQ9CS.jpg',
//         title: 'Peach tea Whiskey Lorem ipsum',
//         url: 'https://github.com/lehoangnam97/react-native-anchor-carousel',
//     },
//     {
//         id: 'item3',
//         image: 'https://i.imgur.com/AzdYlDM.jpg',
//         title: 'Camera lens Lorem ipsum dolor sit amet',
//         url: 'https://www.npmjs.com/package/react-native-anchor-carousel',
//     },
//     {
//         id: 'item1',
//         image: 'https://i.imgur.com/s7GgEa8.jpg',
//         title: 'Shoes Lorem ipsum dolor sit amet',
//         url: 'https://www.npmjs.com/package/react-native-anchor-carousel',
//     },
//     {
//         id: 'item6',
//         image: 'https://i.imgur.com/1O1Kd6T.jpg',
//         title: 'Bottle Opener Lorem ipsum dolor sit amet',
//         url: 'https://github.com/lehoangnam97/react-native-anchor-carousel',
//     },
//     {
//         id: 'item4',
//         image: 'https://i.imgur.com/eNuhvpN.jpg',
//         title: 'Modern sunglasses Lorem ipsum dolor sit amet',
//         url: 'https://github.com/lehoangnam97/react-native-anchor-carousel',
//     },

//     {
//         id: 'item5',
//         image: 'https://i.imgur.com/jEiBmma.jpg',
//         title: 'Cigarettes pipe Lorem ipsum dolor sit amet',
//         url: 'https://www.npmjs.com/package/react-native-anchor-carousel',
//     },
// ];

const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;

export default function LibraryScreen(props) {
    const { style } = props;
    const carouselRef = useRef(null);
    const [stories, setStores] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        fetchlibrary();
        return () => {
            setStores([]);
        };
    }, [])



    // async function handleInstallNowClick(url) {
    //     const supported = await Linking.canOpenURL(url);
    //     if (supported) {
    //         await Linking.openURL(url);
    //     } else {
    //         Alert.alert(`Don't know how to open this URL: ${url}`);
    //     }
    // }

    const fetchlibrary = async () => {
        await fetch(EndPoints.getUserLibraryEndPoint, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setStores(result)
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
            username: item.Username
        }

        function pressHandler() {
            navigation.navigate("PostFullScreen", { idStory: item.IDStory })
        }
        console.log(item)
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

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Stories:</Text>
            <Carousel
                keyExtractor={item => item?.IDStory}
                style={[styles.carousel, style]}
                ref={carouselRef}
                data={stories}
                renderItem={renderItem}
                itemWidth={ITEM_WIDTH}
                separatorWidth={SEPARATOR_WIDTH}
                inActiveScale={1}
                inActiveOpacity={1}
                containerWidth={windowWidth}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'flex-start',
        borderColor: '#DADEE1',
        flex: 1
    },
    carousel: {
        width: windowWidth,
        height: "100%",
        flexGrow: 0,
    },
});