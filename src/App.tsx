import React, { useState } from "react";
import { Menu, Header, Dropdown, List } from "semantic-ui-react";
import intersection from "lodash/intersection";
import Signup from "./Signup";
import ContentContainer from "./ContentContainer";
import { books } from "./api";

export interface User {
    firstName: string;
    email: string;
}

function App() {
    const [user, setUser] = useState<User | undefined>({ firstName: "", email: "" });
    const [signingUp, setSigningUp] = useState<boolean>(false);
    const [similarBooks, setSimilarBooks] = useState<any>();

    const onSetUser = (user: User) => {
        setUser(user);
        setSigningUp(false);
    };

    const onSetBook = (book: string) => {
        const sBook: any = books.find((b) => b.title === book);
        setSimilarBooks(books.filter((b) => b.title !== book && intersection(b.themes, sBook.themes).length));
    };

    return (
        <>
            <Menu>
                <Menu.Item name="editorials" as="a" />
                <Menu.Item name="reviews" as="a" />
                <Menu.Item name="upcomingEvents" as="a" />
                {user?.firstName ? (
                    <Menu.Item position="right" name={`Hi, ${user.firstName}!`} />
                ) : (
                    <Menu.Item position="right" name="Login" as="button" onClick={() => setSigningUp(true)} />
                )}
            </Menu>
            <ContentContainer>
                {signingUp && <Signup setUser={onSetUser} />}
                {user?.firstName ? (
                    <>
                        <Header content={`${user!.firstName}! Pick a book!`} size="huge" />
                        <Dropdown
                            fluid
                            selection
                            placeholder="Books"
                            options={books.map((b: any) => ({ value: b.title, text: `${b.title} by ${b.author}` }))}
                            onChange={(_e, data) => onSetBook(data.value as string)}
                            data-testid="book_select"
                        />
                        {similarBooks && (
                            <List divided relaxed>
                                {similarBooks.map((sb: any) => (
                                    <List.Item key={sb.title}>
                                        <List.Header>
                                            {sb.title} by {sb.author}
                                        </List.Header>
                                        <List.Description>{sb.themes.join(", ")}</List.Description>
                                    </List.Item>
                                ))}
                            </List>
                        )}
                    </>
                ) : (
                    !signingUp && <Header content="Welcome! Login to get books!" textAlign="center" as="h1" />
                )}
            </ContentContainer>
        </>
    );
}

export default App;
