import React from 'react';


const Search = () => {
    return (
        <form action="/app" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <input
                type="text"
                id="header-search"
                name="s"
            />
            <button type="submit"><i class="fas fa-search" id='search_icon'></i></button>
        </form>
    );
};

export default Search;
