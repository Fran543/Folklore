import { View, StyleSheet, FlatList } from "react-native";
import { useState } from 'react'
import Comment from "./Comment";

export default function CommentsHolder() {
    const [comments, setComments] = useState([{ IDComment: 1, Username: "Ivo Ivic", Content: "komentarkomentarkomentar" },
    { IDComment: 2, Username: "Sara Ivic", Content: "komentarkomentarkomentar" },
    { IDComment: 3, Username: "Marica Ivic", Content: "komentarkomentarkomentar" }])

    function renderCommentItem(itemData) {
        const commentItemProps = {
            IDComment: itemData.item.IDComment,
            Username: itemData.item.Username,
            Content: itemData.item.Content
        }

        return <Comment {...commentItemProps} />
    }

    return (
        <View style={styles.content}>
            <FlatList data={comments} renderItem={renderCommentItem}
                keyExtractor={(item, index) => {
                    return item.IDComment
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