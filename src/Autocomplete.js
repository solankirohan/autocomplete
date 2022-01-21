import React from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';

const ITEMS_API_URL = "https://gorest.co.in/public/v1/users";
const DEBOUNCE_DELAY = 500;

function Autocomplete({ onSelectItem }) {

    const [query, setQuery] = useState("");
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {

        if (query !== "")
            sendUserQuery();
        else {
            setLoading(false);
            setUserList([]);
        }
        return sendUserQuery.cancel;
    }, [query]);

    // axios call to get the user list
    const getUserList = () => {
        setLoading(true);
        axios.get(ITEMS_API_URL, { params: { name: query } }).then(({ data }) => {
            console.log("data: ", data);
            setUserList(data.data);
            setLoading(false);
        });
    }

    const onInputChange = (e) => {
        setLoading(false);
        setQuery(e.target.value);
    }

    // Get user list after a delay
    const sendUserQuery = useCallback(
        debounce(getUserList, DEBOUNCE_DELAY)
        , [query]);

    return (<div className="wrapper">
        <div className={`control ${loading ? "is-loading" : ""}`}>
            <input type="text" placeholder='Search for a user e.g. John' value={query} onChange={onInputChange} onFocus={() => setIsInputFocused(true)} className='input'></input>
        </div>
        {
            isInputFocused && userList.length > 0 && (<div className='list'>
                {
                    userList.map((user) => {
                        return (
                            <a key={user.id} className='list-item' href="#0" onClick={() => { setIsInputFocused(false); onSelectItem(user) }}>{user.name}</a>
                        )
                    })
                }

            </div>)
        }
        <style>{`
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
  .control {
    border: 1px solid black;
    
  }
  .control input {
    width: 15rem;
    border: none;
    outline: none;
  }
  .is-loading{
    border: 2px solid green;
  }
  .list {
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);        
    width: 15rem;
    overflow: auto;
  }
  .list-item {
    padding: 0.5rem 0;
    background-color: lightgray;    
    cursor: pointer;
    border-bottom: 1px solid gray;
    text-decoration: none;
  }
`
        }
        </style>
    </div >);
}

export default Autocomplete;
