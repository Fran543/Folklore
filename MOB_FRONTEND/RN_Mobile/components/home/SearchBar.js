import { useState, useEffect } from 'react';
import EndPoints from '../../constants/endPoints'
import { FlatList, StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function SearchBar() {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetch(EndPoints.getSearchItemsEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    items.length = 0
                    for (const user of result[0]) {
                        items.push({ ID: user.IDUser, Name: user.Username, isUser: true })
                    }
                    for (const story of result[1]) {
                        items.push({ ID: story.IDStory, Name: story.StoryName, Summary: story.Summary, Username: story.Username, isUser: false })
                    }
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [items])

    function userTyping(e) {
        setSearchQuery(e)
        displaySuggestions(e)
    }

    function displaySuggestions(e){
        let emptyArray = [];

        if (e) {
            emptyArray = items.filter((data) => {
                return (data.Name).toLocaleLowerCase().startsWith(e.toLocaleLowerCase());
            })
            emptyArray = emptyArray.map((data) => {
                return data;
            });
            setSuggestions(emptyArray)
        }
    }

    function renderSearchItems(itemData) {
        const searchItemProps = {
            ID: itemData.item.ID,
            Name: itemData.item.Name,
            Summary: itemData.item.Summary,
            Username: itemData.item.Username,
            isUser: itemData.item.isUser
        }

        function handleSearchItemPress(){
            navigation.navigate("PostFullScreen", { idStory: itemData.item.ID })
        }

        return <Pressable onPress={handleSearchItemPress}>
            <View style={styles.box}>
                <Text style={styles.username}>{itemData.item.Name}</Text>
                {!itemData.item.isUser&& <Text style={styles.author}>by {itemData.item.Username}</Text>}
                
            </View>
        </Pressable>
    }

    return (
        <View>
            <TextInput
                placeholder='Search...'
                style={styles.searchBar}
                value={searchQuery}
                onChangeText={userTyping}
            />
            <FlatList
                data={suggestions}
                renderItem={renderSearchItems}
                keyExtractor={(item, index) => {
                    return index++
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#C2A695',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 20,
        color: 'white'
    },
    box: {
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        backgroundColor: '#333333',
        flexDirection: 'row',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    username: {
        color: "white",
        fontSize: 22,
        alignSelf: 'center',
        marginLeft: 10
    },
    author: {
        color: "#bfbfbd",
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 10
    }
})