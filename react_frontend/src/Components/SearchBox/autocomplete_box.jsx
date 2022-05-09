import { useEffect, useState } from "react";


function Autocomplete_box({ filteredItems, selectItem }) {

    useEffect(() => {
        import('./searchBox.css');
    }, [])

    return (
        <div className="autocomBox">
            {filteredItems.map((item, i) => (
                <li key={i} className="match" onClick={(e) => selectItem(item)} >{item.isUser ? item.Username : item.StoryName + " by " + item.Username}</li>
            ))}
        </div>
    );
}

export default Autocomplete_box;