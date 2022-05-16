import { StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useEffect, useState } from 'react';
import EndPoints from '../../constants/endPoints';

export default function StarsRating(props) {
    const [score, setScore] = useState(0)
    const [orgScore, setOrgScore] = useState(0)

    useEffect(() => {
        fetch(EndPoints.getUserStoryScore, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ idStory: props.idStory })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setScore(result.score)
                    setOrgScore(result.score)
                    console.log(result.score)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    const sendScore = (score) => {
        fetch(EndPoints.addScoreToStory, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: score, idStory: props.idStory })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <Rating
            type='star'
            ratingColor='black'
            ratingBackgroundColor='#BDC3C7'
            ratingCount = {5}
            startingValue= {orgScore}
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