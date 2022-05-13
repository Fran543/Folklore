import EndPoints from '../constants/endPoints'

export const ALL_POSTS = [
    fetch(EndPoints.getStoriesEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    return result
                },
                (error) => {
                    console.log(error)
                }
            )
]