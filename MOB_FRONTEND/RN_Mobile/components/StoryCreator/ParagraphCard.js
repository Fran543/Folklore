import { TextInput, View, Text, StyleSheet, Image, Pressable } from "react-native";
import { RadioButton } from 'react-native-paper'
import { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import Multiselect from 'multiselect-react-dropdown';

var counter = 1;

export default function ParagraphCard(props) {
    // const [checked, setChecked] = useState('first');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");
    const [choice1, setChoice1] = useState("");
    const [choice2, setChoice2] = useState("");
    const [conditions, setConditions] = useState([{}]);
    const [selectedConditions, setSelectedConditions] = useState([]);

    var c = counter;

    useEffect(() => {
        setConditions([])
        for (let i = 0; i < props.paragraphNbr * 2; i++) {
            setConditions(conditions => [...conditions, { value: i, label: i + 1 }])
        }
    }, [props.paragraphNbr]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            props.post.imageBlob = result.uri
        }
    };

    function contentHandler(e) {
        setContent(e)
        props.post.content = e
    }

    function firstChoiceHandler(e) {
        setChoice1(e)
        props.post.choices[0].choiceValue = e
    }

    function secondChoiceHandler(e) {
        setChoice2(e)
        props.post.choices[1].choiceValue = e
    }

    function onSelect(selectedList, selectedItem) {
        setSelectedConditions(selectedConditions => [...selectedConditions, selectedItem.value]);
        let value = Array.from(
            selectedList,
            (option) => option.value
        );
        props.post.conditions = value;
    }

    function onRemove(selectedList, removedItem) {
        var array = [...selectedConditions];
        var index = array.indexOf(removedItem.value)
        if (index !== -1) {
            array.splice(index, 1);
            setSelectedConditions(array);
            props.post.conditions = array
        }
    }

    return (
        <View style={styles.container}>
            {!props.isFirst &&
                <View style={styles.multiselect}>
                    <Multiselect
                        options={conditions} // Options to display in the dropdown
                        onSelect={onSelect} // Function will trigger on select event
                        onRemove={onRemove} // Function will trigger on remove event
                        displayValue="label" // Property name to display in the dropdown options
                        placeholder="Select conditions..."
                    />
                </View>
            }
            <View>
                <Pressable onPress={pickImage}>
                    <MaterialCommunityIcons name="image-area" color={'white'} size={26} />
                    <Text style={styles.text}>Pick an Image</Text>
                </Pressable>
                <Image source={{ uri: image }} style={{ width: 350, height: 200 }} />
            </View>
            <View>
                <TextInput
                    multiline={true}
                    placeholder="Enter paragraph content here..."
                    onChangeText={contentHandler}
                    value={content}
                    style={styles.textInput}
                />
                <View style={styles.contentHolder}>
                    <View>
                        <Text style={styles.text}>{props.postNbr * 2 - 1}</Text>
                        <TextInput
                            multiline={true}
                            placeholder="Enter option..."
                            onChangeText={firstChoiceHandler}
                            value={choice1}
                            style={styles.textInput} />
                    </View>
                    <View>
                        <Text style={styles.text}>{props.postNbr * 2}</Text>
                        <TextInput
                            multiline={true}
                            placeholder="Enter option..."
                            onChangeText={secondChoiceHandler}
                            value={choice2}
                            style={styles.textInput} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
    contentHolder: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: '#333333',
        padding: 10,
        height: 100,
        color: 'white',
        borderRadius: 5
    },
    container: {
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        marginBottom: 20
    },
    rbHolder: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    multiselect: {
        zIndex: 5,
    }
})