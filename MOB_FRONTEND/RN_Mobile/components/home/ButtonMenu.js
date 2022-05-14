import { View, StyleSheet } from "react-native";
import ButtonBack from '../ui/ButtonBack'
import ShowModalButton from "../ui/ShowModalButton";
import AddParagraphButton from "../ui/AddParagraphButton";
import ButtonUpload from "../ui/ButtonUpload";
import ButtonDelete from "../ui/ButtonDelete";

export default function ButtonMenu(props) {
    return (
            <View style={styles.buttonContainer}>
                <ButtonBack />
                <ShowModalButton onPress={props.showModal} />
                {props.isStory && <AddParagraphButton />}
                <ButtonUpload />
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