import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { default as StoryCard } from '../StoryCard/story_card';
import { default as Stories } from '../Stories/stories';



function User_Stories({ user }) {

    const [blogsToggle, setBlogsToggle] = useState(false)
    const [storiesToggle, setStoriesToggle] = useState(false)

    useEffect(() => {
        import('./userStories.css');
    })

    return (
        <section className="second">
            {blogsToggle &&
                <div className="blogs col-md-12" id="blogContainer">
                    <Stories stories={user && user.blogs} filter="" />
                    {/* {user.blogs.map((story, i) => (
                        <StoryCard key={i} story={story} />
                    ))} */}
                </div>
            }
            <div className="leftContainer col-sm-6" style={{ display: (storiesToggle || blogsToggle) && "none" }} onClick={() => { setBlogsToggle(blogsToggle ? false : true) }}>
                <h1 className="info">My posts</h1>
            </div>
            <div className="rightContainer col-sm-6" style={blogsToggle ? { right: 0, position: "absolute" } : (storiesToggle ? { cursor: "url('./rightArrow.svg'), auto" } : {})} onClick={() => { blogsToggle ? setBlogsToggle(false) : setStoriesToggle(storiesToggle ? false : true) }}>

                {storiesToggle ? <h1> Stories</h1> : blogsToggle && <h1> Blogs</h1>}
            </div>

            {
                storiesToggle &&
                <div className="stories col-md-12" id="storyContainer">
                        <Stories stories={user && user.stories} filter="" />
                    {/* {user.stories.map((story, i) => (
                        <StoryCard key={i} story={story} />
                    ))} */}
                </div>
            }
            <Helmet>
                <script src="arrows.js"></script>
            </Helmet>
        </section >
    );
}

export default User_Stories;