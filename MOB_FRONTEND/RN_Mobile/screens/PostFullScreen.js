import { StyleSheet, View, Text, Image, Button } from "react-native";
import { useLayoutEffect, useState } from 'react'
import EndPoints from "../constants/endPoints";

//useNavigation and useRoute hook - if you need access to navigation in a nested component whic is not registered as a screen
//useLayoutEffect executes code before or simultaneously components has been rendered
//useEffect executes code after the component has been rendered
export default function PostFullScreen({ route, navigation }) {
    const [postContent, setPostContent] = useState([])
    const idStory = route.params.idStory

    useLayoutEffect(() => {
        navigation.setOptions({
            title: idStory
        })
        //getPostDetails()
    }, [idStory, navigation])

    async function getPostDetails() {
        await fetch(EndPoints.getStoryByIdEndPoint, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setPostContent(result)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <View style={styles.postContainer}>
            <Image
                source={require('../assets/icon.png')}
                resizeMode="cover"
                style={styles.image} />
            <Text style={styles.text}>Here are the paragraphs!Here are the paragraphs!Here are the paragraphs!Here are the paragraphs!Here are the paragraphs!Here are the paragraphs!</Text>
            <View style={styles.btnContainer}>
                <View style={styles.button}>
                    <Button color={'#e0b78a'} title="Option 1" />
                </View>
                <View style={styles.button}>
                    <Button color={'#e0b78a'} title="Option 2" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 400,
    },
    text: {
        color: 'white'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        marginVertical: 20
    },
    button:{
        flex:1,
        padding: 5
    }
})