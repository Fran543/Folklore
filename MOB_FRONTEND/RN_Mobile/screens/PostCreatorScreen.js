import { Text, View, StyleSheet, Pressable } from "react-native";

export default function PostCreatorScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Pressable style={styles.blogBlock} onPress={() => navigation.navigate('BlogCreatorScreen')} android_ripple={{ color: '#470425' }}>
                <View>
                    <Text style={styles.text}>Blog</Text>
                </View>
            </Pressable>
            <Pressable style={styles.storyBlock} onPress={() => navigation.navigate('StoryCreatorScreen')} android_ripple={{ color: '#9c8578' }}>
                <View >
                    <Text style={styles.text}>Interactive Story</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    text: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 3,
        color: 'white',
    },
    blogBlock: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
        marginVertical: 20,
    },
    storyBlock: {
        flex: 1,
        backgroundColor: '#f5bc1d',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
        marginVertical: 20,
    },
});