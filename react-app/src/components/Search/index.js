import React from 'react';
import { useHistory } from 'react-router-dom';


const Search = ({ searchQuery, setSearchQuery }) => {
    const history = useHistory();
    const onSubmit = e => {
        history.push(`?s=${searchQuery}`)
        e.preventDefault()
    };

    return (
        <form action="/app" method="get" onSubmit={onSubmit}>
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                name="s"
            />
            <button type="submit"><i class="fas fa-search" id='search_icon'></i></button>
        </form>
    );
};

export default Search;
