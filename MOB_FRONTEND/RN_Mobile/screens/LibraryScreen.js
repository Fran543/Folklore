import React, { useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    Pressable,
    View
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import PostGridTile from '../components/home/PostGridTile';
import { useState, useEffect } from 'react';
import EndPoints from '../constants/endPoints';
import { useNavigation } from '@react-navigation/native';


const { width: windowWidth } = Dimensions.get('window');

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