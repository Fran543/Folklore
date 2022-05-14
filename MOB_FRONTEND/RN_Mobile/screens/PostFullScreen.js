import { StyleSheet, View, Text, Image, Button, FlatList } from "react-native";
import { useLayoutEffect, useState, useEffect } from 'react'
import EndPoints from "../constants/endPoints";

//useNavigation and useRoute hook - if you need access to navigation in a nested component whic is not registered as a screen
//useLayoutEffect executes code before or simultaneously components has been rendered
//useEffect executes code after the component has been rendered
export default function PostFullScreen({ route, navigation }) {
    const [story, setStory] = useState(null);
    const [posts, setPosts] = useState([]);
    const [choices, setChoices] = useState(null);
    const idStory = route.params.idStory

    useLayoutEffect(() => {
        navigation.setOptions({
            title: idStory
        })
    }, [idStory, navigation])

    useEffect(() => {
        getPostDetails()
    }, [])

    async function getPostDetails() {
        await fetch(EndPoints.getStoryByIdEndPoint + "?idStory=" + idStory)
            .then(res => res.json())
            .then(
                (result) => {
                    setStory(result.story);
                    setPosts(posts => [...posts, result.firstPost]);
                    if (result.choices.length !== 0) setChoices(result.choices)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    function renderPostItem(itemData) {
        return <Text style={styles.text}>{itemData.item.Content}</Text>
    }

    async function renderNextPost(choiceID){
        await fetch(EndPoints.getPostByChoiceIdEndPoint + "?idChoice=" + choiceID)
            .then((res) => res.json())
            .then(
              (result) => {
                if (result.post) {
                  setPosts(posts => [...posts, result.post]);
                  setChoices(result.choices)
                } else {
                  setChoices(null)
                }
              },
              (error) => {
                console.log(error);
              }
            );
    }

    return (
        <View style={styles.postContainer}>
            <Image
                source={require('../assets/icon.png')}
                resizeMode="cover"
                style={styles.image} />
            <FlatList data={posts} renderItem={renderPostItem}
                keyExtractor={(item, index) => {
                    return item.IDPost
                }}
            />
            {choices !== null ? 
                <View style={styles.btnContainer}>
                    <View style={styles.button}>
                        <Button color={'#C2A695'} title={choices && choices[0].Content} onPress={renderNextPost(choices[0].IDChoice)}/>
                    </View>
                    <View style={styles.button}>
                        <Button color={'#C2A695'} title={choices && choices[1].Content} onPress={renderNextPost(choices[1].IDChoice)}/>
                    </View>
                </View>
                :
                <View style={styles.btnTheEnd}>
                    <Button title="The end" color={"#C2A695"}/>
                </View>
            }
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
    button: {
        flex: 1,
        padding: 5
    },
    btnTheEnd: {
        justifyContent: 'center',
        flex: 1,
        marginVertical: 20
    }
})