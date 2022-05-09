import React from "react";
import { useEffect } from "react";

import { Stories, TrendingStories, SearchBox } from "../../Components";
function Home() {

    useEffect(() => {
        import('./home.css')
    }, [])

    return (
        <div className="home">
            <TrendingStories />
            <SearchBox
            />
            <Stories />
        </div>
    );
}

export default Home;