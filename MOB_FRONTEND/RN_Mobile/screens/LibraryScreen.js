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

const { width: windowWidth } = Dimensions.get('window');

const data = [
    {
        id: 'item2',
        image: 'https://i.imgur.com/N3nQ9CS.jpg',
        title: 'Peach tea Whiskey Lorem ipsum',
        url: 'https://github.com/lehoangnam97/react-native-anchor-carousel',
    },
    {
        id: 'item3',
        image: 'https://i.imgur.com/AzdYlDM.jpg',
        title: 'Camera lens Lorem ipsum dolor sit amet',
        url: 'https://www.npmjs.com/package/react-native-anchor-carousel',
    },
    {
        id: 'item1',
        image: 'https://i.imgur.com/s7GgEa8.jpg',
        title: 'Shoes Lorem ipsum dolor sit amet',
        url: 'https://www.npmjs.com/package/react-native-anchor-carousel',
    },
    {
        id: 'item6',
        image: 'https://i.imgur.com/1O1Kd6T.jpg',
        title: 'Bottle Opener Lorem ipsum dolor sit amet',
        url: 'https://github.com/lehoangnam97/react-native-anchor-carousel',
    },
    {
        id: 'item4',
        image: 'https://i.imgur.com/eNuhvpN.jpg',
        title: 'Modern sunglasses Lorem ipsum dolor sit amet',
        url: 'https://github.com/lehoangnam97/react-native-anchor-carousel',
    },

    {
        id: 'item5',
        image: 'https://i.imgur.com/jEiBmma.jpg',
        title: 'Cigarettes pipe Lorem ipsum dolor sit amet',
        url: 'https://www.npmjs.com/package/react-native-anchor-carousel',
    },
];

const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;
export default function LibraryScreen(props) {
    const { style } = props;
    const carouselRef = useRef(null);
    const [stories, setStores] = useState([])

    useEffect(() => {
        fetchlibrary();
    }, [])

    async function handleInstallNowClick(url) {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    const fetchlibrary = async () => {
        await fetch(EndPoints.getUserLibraryEndPoint, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setStores(result)
                    console.log()
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    function renderItem({ item, index }) {
        return (
            <Pressable
                activeOpacity={1}
                onPress={() => {
                    carouselRef.current.scrollToIndex(index);
                }}>
                <PostGridTile/>
            </Pressable>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{color:'white'}}>Blogs:</Text>
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
                <Text style={{color:'white', paddingTop: 80}}>Stories:</Text>
                <Carousel
                    keyExtractor={item => item?.IDStory}
                    style={[styles.carousel, style]}
                    ref={carouselRef}
                    data={data}
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
    container: {
        backgroundColor: 'black',
        alignItems: 'flex-start',
        borderColor: '#DADEE1',
        flex: 1
    },
    carousel: {
        width: windowWidth,
        height: ITEM_WIDTH + 100,
        flexGrow: 0,
    },
});