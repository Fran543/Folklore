import { TextInput, View, Text, StyleSheet, Image, Pressable } from "react-native";
import { RadioButton } from 'react-native-paper'
import { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var counter=1;

export default function ParagraphCard(props) {
    const [checked, setChecked] = useState('first');

    var c = counter;

    return (
        <View style={styles.container}>
            {!props.isFirst &&
                <View>
                    <Text style={styles.text}>This paragraph will appear if user chooses option: </Text>
                    <View style={styles.rbHolder}>
                        <View style={{ flex: 1 }}>
                            <RadioButton
                                value={--c}
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                                color='pink'
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <RadioButton
                                value={--c}
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                                color='lightblue'
                            />
                        </View>
                    </View>
                </View>
            }
            <View>
                <Pressable onPress={props.pickImage}>
                    <MaterialCommunityIcons name="image-area" color={'white'} size={26} />
                    <Text style={styles.text}>Pick an Image</Text>
                </Pressable>
                {props.imageBlob && <Image source={{ uri: props.imageBlob }} style={{ width: 350, height: 200 }} />}
            </View>
            <View>
                <TextInput
                    multiline={true}
                    placeholder="Enter paragraph content here..."
                    style={styles.textInput}
                />
                <View style={styles.contentHolder}>
                    <View>
                        <Text style={styles.text}>{counter++}</Text>
                        <TextInput
                            multiline={true}
                            placeholder="Enter option..."
                            style={styles.textInput} />
                    </View>
                    <View>
                        <Text style={styles.text}>{counter++}</Text>
                        <TextInput
                            multiline={true}
                            placeholder="Enter option..."
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
    }
})