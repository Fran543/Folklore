import { StyleSheet, TextInput, View } from "react-native";
import MetadataModal from "../components/home/MetadataModal";
import ButtonMenu from "../components/home/ButtonMenu";
import { useState } from 'react'

export default function BlogCreatorScreen(){
    const [modalVisible, setModalVisible] = useState(false);
    const [blogContent, setBlogcontent] = useState();
    const isStory = false;

    function showModal() {
        setModalVisible(true)
    }

    function closeModal() {
        setModalVisible(!modalVisible)
    }

    function deleteBlog() {
        setBlogcontent('')
    }

    return(
        <View style={styles.container}>
            <ButtonMenu 
            showModal={showModal} 
            closeModal={closeModal}
            isStory={isStory} 
            deleteBlog={deleteBlog}
            style={styles.buttonHolder}/>
            <TextInput multiline={true} 
            style={styles.textInput}
            placeholder="Enter text here..."
            value={blogContent}
            onChangeText={(e) => setBlogcontent(e)}/>
            <MetadataModal onPress={closeModal} modalVisible={modalVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonHolder:{
        flex: 1
    },
    textInput:{
        flex: 10,
        color: 'white',
    }
})