import { View, StyleSheet} from "react-native";
import CommentTextInput from '../ui/CommentTextInput'
import CommentsHolder from "../home/CommentsHolder";
import CommentSubmitButton from "../ui/CommentSubmitButton";
import {useState, useEffect} from 'react'

export default function CommentSection(props) {
    const [commentText, setCommentText] = useState()

    function commentTextChangeHandler(textInputValue){
        setCommentText(textInputValue)
        console.log(commentText)
    }

    return (
        <View style={styles.container}>
            <CommentTextInput onChangeText={commentTextChangeHandler} commentText={commentText}/>
            <CommentSubmitButton commentText={commentText} idStory={props.idStory}/>
            <CommentsHolder idStory={props.idStory}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
}); 