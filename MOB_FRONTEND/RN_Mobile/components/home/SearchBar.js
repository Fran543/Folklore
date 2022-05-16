import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from "react-native";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')

    function onChangeSearch(query) {
        setSearchQuery(query);
    }

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
        />
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginVertical: 20,
        marginHorizontal: 5
    }
})