import { Text, View, ScrollView } from "react-native";
import ButtonMenu from "../components/home/ButtonMenu";
import MetadataModal from "../components/home/MetadataModal";
import { useState, Suspense } from 'react'
import ParagraphCard from "../components/StoryCreator/ParagraphCard";
import * as ImagePicker from 'expo-image-picker';

export default function StoryCreatorScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    // METADATA
    const [value, setValue] = useState([]);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    // PARAGRAPH DATA
    const [paragraphlist, setParagraphList] = useState([]);
    

    const addParagraphToCanvas = () => {
        setParagraphList(paragraphlist => [...paragraphlist, {
            content: "",
            imageBlob: "",
            conditions: [],
            choices: [{ choiceValue: "" }, { choiceValue: "" }]
        }])
    }

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
        console.log(image)
    };

    function deleteBlog() {
        setValue([])
        setImage(null)
        setTitle('')
        setSummary('')
        setParagraphList([])
    }

    function showModal() {
        setModalVisible(true)
    }

    function closeModal() {
        setModalVisible(!modalVisible)
    }

    function onChangeTitleText(e) {
        setTitle(e)
    }

    function onChangeSummaryText(e) {
        setSummary(e)
    }

    function onChangeWarningValue(e) {
        setValue(e)
    }

    const blogItemProps = {
        title: title,
        summary: summary,
        imageBlob: image,
        warnings: value
    }

    return (
        <ScrollView>
            <ButtonMenu
                isStory={true}
                showModal={showModal}
                closeModal={closeModal}
                deleteBlog={deleteBlog}
                addParagraphToCanvas={() => addParagraphToCanvas()}
                {...blogItemProps} />
            <MetadataModal
                onPress={closeModal}
                modalVisible={modalVisible}
                {...blogItemProps}
                pickImage={pickImage}
                onChangeTitleText={onChangeTitleText}
                onChangeSummaryText={onChangeSummaryText}
                onChangeWarningValue={onChangeWarningValue} />
            {paragraphlist.map((p, i) => {
                return (
                    <Suspense key={i} fallback={<div>Loading Component....</div>}>
                        <ParagraphCard post={p} postNbr={i + 1}
                            {...blogItemProps}
                            isFirst={i === 0 ? true : false}
                            pickImage={pickImage} />
                    </Suspense>)
            })}
        </ScrollView>
    );
}