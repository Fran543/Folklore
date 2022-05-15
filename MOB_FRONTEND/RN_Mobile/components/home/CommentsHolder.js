import { View, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from 'react'
import Comment from "./Comment";
import EndPoints from "../../constants/endPoints";

export default function CommentsHolder(props) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(EndPoints.getStoryCommentsEndPoint + "?idStory=" + props.idStory)
            .then(res => res.json())
            .then(
                (result) => {
                    setComments(result)
                    console.log(result)
                    return result
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    function renderCommentItem(itemData) {
        const commentItemProps = {
            Username: itemData.item.Username,
            Content: itemData.item.Content
        }

        return <Comment {...commentItemProps} />
    }

    return (
        <View style={styles.content}>
            <FlatList data={comments} renderItem={renderCommentItem}
                keyExtractor={(item, index) => {
                    return index++
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 30
    },
});