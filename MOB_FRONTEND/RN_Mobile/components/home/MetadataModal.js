import { Modal, StyleSheet, Text, Pressable, View, TextInput, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react'
import EndPoints from "../../constants/endPoints";

export default function MetadataModal(props) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getWarnings()
    }, [])

    async function getWarnings() {
        await fetch(EndPoints.getWarningsEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={props.onPress}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.userInputContainer}>
                            <MaterialCommunityIcons name="rename-box" color={'white'} size={26} />
                            <Text style={styles.modalText} >Title</Text>
                            <TextInput placeholder="Enter title here..." maxLength={50} value={props.title} onChangeText={props.onChangeTitleText}/>
                        </View>
                        <View style={styles.userInputContainer}>
                            <MaterialCommunityIcons name="card-bulleted-settings-outline" color={'white'} size={26} />
                            <Text style={styles.modalText}>Summary</Text>
                            <TextInput placeholder="Enter summary here..." maxLength={500} value={props.summary} onChangeText={props.onChangeSummaryText}/>
                        </View>
                        <View style={styles.userInputContainer}>
                            <MaterialCommunityIcons name="exclamation-thick" color={'white'} size={26} />
                            <Text style={styles.modalText}>Warnings</Text>
                            <DropDownPicker
                                schema={{
                                    label: 'WarningName',
                                    value: 'IDWarning'
                                }}
                                placeholder="Select warnings"
                                multiple={true}
                                open={open}
                                value={props.value}
                                items={items}
                                setOpen={setOpen}
                                setValue={props.onChangeWarningValue}
                                setItems={setItems}
                                theme="DARK"
                                mode="BADGE"
                                disableBorderRadius={true}
                            />
                        </View>
                        <View style={styles.userInputContainer}>
                            <Pressable  onPress={props.pickImage}  style={styles.userInputContainer}>
                                <MaterialCommunityIcons name="image-area" color={'white'} size={26} />
                                <Text style={styles.modalText}>Pick an Image</Text>
                            </Pressable>
                            {props.imageBlob && <Image source={{ uri: props.imageBlob }} style={{ width: 200, height: 200 }} />}
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={props.onPress}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#C2A695",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
    },
    userInputContainer: {
        flexDirection: 'row',
        paddingVertical: 20
    },
    buttonClose: {
        backgroundColor: "#B88FAE",
        borderRadius: 20,
        padding: 10,
        color: 'white'
    },
    textStyle: {
        color: 'white'
    }
    , modalText: {
        color: 'white'
    }
});