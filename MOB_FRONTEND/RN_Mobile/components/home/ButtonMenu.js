import { View, StyleSheet } from "react-native";
import ButtonBack from '../ui/ButtonBack'
import ShowModalButton from "../ui/ShowModalButton";
import AddParagraphButton from "../ui/AddParagraphButton";
import ButtonUpload from "../ui/ButtonUpload";
import ButtonDelete from "../ui/ButtonDelete";

export default function ButtonMenu(props) {

    const blogItemProps = {
        title: props.title,
        summary: props.summary,
        imageBlob: props.imageBlob,
        warnings: props.value,
        content: props.content
    }

    return (
            <View style={styles.buttonContainer}>
                <ButtonBack />
                <ShowModalButton onPress={props.showModal} />
                {props.isStory && <AddParagraphButton />}
                <ButtonUpload {...blogItemProps}/>
                <ButtonDelete onPress={props.deleteBlog}/>
            </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    }
})