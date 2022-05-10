import React from "react";
import { useEffect, useState } from "react";

import { Stories, TrendingStories, SearchBox } from "../../Components";

var getStoriesEndPoint = "http://127.0.0.1:8091/getStories"

function Home() {
    // stories, setStores, filteredStories, setFilteredStories
    const [filter, setFilter] = useState("")
    const [stories, setStores] = useState([])


    useEffect(() => {
        import('./home.css')
        fetch(getStoriesEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    setStores(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    return (
        <div className="home">
            <TrendingStories />
            <SearchBox filter={filter} setFilter={(filter) => setFilter(filter)}
            />
            <Stories stories={stories} filter={filter} />
        </div>
    );
}

export default Home;