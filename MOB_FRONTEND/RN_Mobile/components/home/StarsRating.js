import { StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';


export default function StarsRating() {
    return (
        <Rating
            type='star'
            ratingColor='black'
            ratingBackgroundColor='#BDC3C7'
            ratingCount = {5}
            startingValue= {0}
            imageSize={50}
            tintColor='#333333'
            style={styles.starContainer}
        />
    );
}

const styles = StyleSheet.create({
    starContainer: {
        paddingVertical: 20,
    }
})