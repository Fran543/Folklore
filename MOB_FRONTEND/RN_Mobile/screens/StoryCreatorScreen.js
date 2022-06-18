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
    const [paragraphNbr, setParagraphNbr] = useState(0);


    const addParagraphToCanvas = () => {
        setParagraphList(paragraphlist => [...paragraphlist, {
            content: "",
            imageBlob: "",
            conditions: [],
            choices: [{ choiceValue: "" }, { choiceValue: "" }]
        }])
        setParagraphNbr(paragraphNbr + 1);
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
        posts: paragraphlist
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
                onSelect={onSelect}
                onRemove={onRemove} />
            {paragraphlist.map((p, i) => {
                return (
                    <Suspense key={i} fallback={<div>Loading Component....</div>}>
                        <ParagraphCard post={p} paragraphNbr={paragraphNbr} postNbr={i + 1}
                            isFirst={i === 0 ? true : false} />
                    </Suspense>)
            })}
        </ScrollView>
    );
}