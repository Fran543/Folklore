import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { default as StoryCard } from '../StoryCard/story_card';



function User_Stories({ user }) {

    const [blogsToggle, setBlogsToggle] = useState(false)
    const [storiesToggle, setStoriesToggle] = useState(false)


    useEffect(() => {
        import('./userStories.css');
        console.log(user)
    })

    return (
        <section className="second">
            {blogsToggle &&
                <div className="blogs" id="blogContainer">
                    {user.blogs.map((story, i) => (
                        <StoryCard key={i} story={story} />
                    ))}
                </div>
            }
            <div className="leftContainer col-md-6" onClick={() => { setBlogsToggle(blogsToggle ? false : true) }}>
                <h1 className="info">My posts</h1>
            </div>
            <div className="rightContainer col-md-6" onClick={() => { setStoriesToggle(storiesToggle ? false : true) }}>
            </div>
            {storiesToggle &&
                <div className="stories" id="storyContainer">
                    {user.stories.map((story, i) => (
                        <StoryCard key={i} story={story} />
                    ))}
                </div>
            }
            <Helmet>
                <script src="arrows.js"></script>
            </Helmet>
        </section>
    );
}

export default User_Stories;