import {
    useQuery,
    useMutation,
    useReactiveVar,
    useApolloClient,
} from "@apollo/client";
import { useState } from "react";
import {
    FETCH_USER,
    BLOCKED_USER,
    FAVORITE_USER,
} from "./services/graphql/query";
import { ADD_USER } from "./services/graphql/mutation";
import {
    bookmarkedUser,
    blockedUser,
} from "./services/graphql/cache/reactiveVar";

function App() {
    const client = useApolloClient();
    const [inputUser, setInputUser] = useState({ name: "", email: "" });
    const { data, error, loading } = useQuery(FETCH_USER);
    const { data: favData } = useQuery(FAVORITE_USER);

    const [addUser] = useMutation(ADD_USER, {
        refetchQueries: [FETCH_USER],
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error nih....</p>;

    const onChangeHandler = (e) => {
        setInputUser({ ...inputUser, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        addUser({
            variables: {
                addUserInput: inputUser,
            },
        });
    };

    const addBookmark = (user) => {
        bookmarkedUser([...bookmarkedUser(), user]);
    };

    const addBlock = (user) => {
        blockedUser([...blockedUser(), user]);
    };

    const addFav = (user) => {
        client.writeQuery({
            query: FAVORITE_USER,
            data: {
                favUserQuery: [...favData.favUserQuery, user._id],
            },
        });
    };

    return (
        <div className="App">
            <form onSubmit={submitHandler}>
                <input
                    name="name"
                    onChange={onChangeHandler}
                    value={inputUser.name}
                />
                <input
                    name="email"
                    onChange={onChangeHandler}
                    value={inputUser.email}
                />
                <input name="submit" type="submit" />
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => addBookmark(user)}>
                                        Bookmark
                                    </button>
                                    <button onClick={() => addBlock(user)}>
                                        Block
                                    </button>
                                    <button onClick={() => addFav(user)}>
                                        Fav
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <hr />
            <FavoriteUser />
            <hr />
            <BlockedUser />
            <hr />
            <BookmarkUser />
        </div>
    );
}

export default App;

function BookmarkUser() {
    const valueReactive = useReactiveVar(bookmarkedUser);

    return (
        <div>
            <h2>Bookmar User Page</h2>
            <pre>{JSON.stringify(valueReactive, null, 4)}</pre>
        </div>
    );
}

function BlockedUser() {
    const {
        data: blockData,
        error: blockError,
        loading: blockLoading,
    } = useQuery(BLOCKED_USER);

    return (
        <div>
            <h2>Blocked User</h2>
            <pre>{JSON.stringify(blockData, null, 4)}</pre>
        </div>
    );
}

function FavoriteUser() {
    const {
        data: userData,
        error: userErro,
        loading: userLoading,
    } = useQuery(FAVORITE_USER);

    return (
        <div>
            <h2>Favorite User</h2>
            <pre>{JSON.stringify(userData, null, 4)}</pre>
        </div>
    );
}
