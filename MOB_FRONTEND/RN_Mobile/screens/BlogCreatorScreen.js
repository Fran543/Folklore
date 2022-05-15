import { StyleSheet, TextInput, View } from "react-native";
import MetadataModal from "../components/home/MetadataModal";
import ButtonMenu from "../components/home/ButtonMenu";
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function BlogCreatorScreen(){
    const [modalVisible, setModalVisible] = useState(false);
    const [blogContent, setBlogcontent] = useState();
    const [value, setValue] = useState([]);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const isStory = false;

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    function showModal() {
        setModalVisible(true)
    }

    function closeModal() {
        setModalVisible(!modalVisible)
    }

    function deleteBlog() {
        setBlogcontent('')
    }

    function onChangeTitleText(e){
        setTitle(e)
    }

    function onChangeSummaryText(e){
        setSummary(e)
    }

    function onChangeWarningValue(e){
        setValue(e)
    }

    const blogItemProps = {
        title: title,
        summary: summary,
        imageBlob: image,
        warnings: value,
        content: blogContent
    }

    return(
        <View style={styles.container}>
            <ButtonMenu 
            showModal={showModal} 
            closeModal={closeModal}
            isStory={isStory} 
            deleteBlog={deleteBlog}
            style={styles.buttonHolder}
            {...blogItemProps}
            />
            <TextInput multiline={true} 
            style={styles.textInput}
            placeholder="Enter text here..."
            value={blogContent}
            onChangeText={(e) => setBlogcontent(e)}/>
            <MetadataModal 
            onPress={closeModal} 
            modalVisible={modalVisible}
            title={title}
            summary={summary}
            value={value}
            image={image}
            pickImage={pickImage}
            onChangeTitleText={onChangeTitleText}
            onChangeSummaryText={onChangeSummaryText}
            onChangeWarningValue={onChangeWarningValue} />
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