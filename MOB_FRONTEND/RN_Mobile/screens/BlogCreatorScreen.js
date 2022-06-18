import { StyleSheet, TextInput, View } from "react-native";
import MetadataModal from "../components/home/MetadataModal";
import ButtonMenu from "../components/home/ButtonMenu";
import { Snackbar } from 'react-native-paper';
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function BlogCreatorScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [blogContent, setBlogcontent] = useState();
    const [value, setValue] = useState([]);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const isStory = false;

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

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
        setValue([]);
        setImage(null);
        setTitle('');
        setSummary('');
    }

    function onChangeTitleText(e) {
        setTitle(e)
    }

    function onChangeSummaryText(e) {
        setSummary(e)
    }

    function onSelect(selectedList, selectedItem) {
        setValue(value => [...value, selectedItem.id.IDWarning]);
    }

    function onRemove(selectedList, removedItem) {
        var array = [...value];
        var index = array.indexOf(removedItem.id.IDWarning)
        if (index !== -1) {
            array.splice(index, 1);
            setValue(array);
        }
    }

    const blogItemProps = {
        title: title,
        summary: summary,
        imageBlob: image,
        warnings: value,
        posts: [{ content: blogContent }]
    }

    return (
        <View style={styles.container}>
            <ButtonMenu
                showModal={showModal}
                closeModal={closeModal}
                isStory={isStory}
                deleteBlog={deleteBlog}
                message={message}
                setMessage={(e) => setMessage(e)}
                onToggleSnackBar={onToggleSnackBar}
                style={styles.buttonHolder}
                {...blogItemProps}
            />
            <TextInput multiline={true}
                style={styles.textInput}
                placeholder="Enter text here..."
                value={blogContent}
                onChangeText={(e) => setBlogcontent(e)}
            />
            <MetadataModal
                onPress={closeModal}
                modalVisible={modalVisible}
                {...blogItemProps}
                pickImage={pickImage}
                onChangeTitleText={onChangeTitleText}
                onChangeSummaryText={onChangeSummaryText}
                onSelect={onSelect}
                onRemove={onRemove} />
            <View style={styles.snackContainer}>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    {message}
                </Snackbar>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonHolder: {
        flex: 1
    },
    textInput: {
        flex: 10,
        color: 'white',
    },
    snackContainer: {
        justifyContent: 'space-between',
        flex: 1
    },
})