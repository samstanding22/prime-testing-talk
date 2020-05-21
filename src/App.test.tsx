import React from "react";
import { fireEvent, render } from "@testing-library/react";
import faker from "faker";
import App from "./App";

describe("App", () => {
    it("displays validation rules, takes in valid form data, doesn't throw errors and logs in user", () => {
        const { getByLabelText, debug, getAllByText, getByTestId, getByText } = render(<App />);
        const password = faker.internet.password();
        const firstName = faker.name.firstName();

        fireEvent(
            getByText("Login"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        expect(getByText("Password needs to be longer than 8 characters")).toBeInTheDocument();
        expect(getByText("Password should not match your first name or email address")).toBeInTheDocument();

        fireEvent.change(firstNameNode, { target: { value: firstName } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: password } });
        fireEvent.change(passwordConfirmNode, { target: { value: password } });

        fireEvent.submit(getByTestId("form"));

        expect(getByText(`${firstName}! Pick a book!`)).toBeInTheDocument();

        fireEvent(
            getByText("War and Peace by Leo Tolstoy"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(getAllByText("Catch-22 by Joseph Heller")[0]).toBeInTheDocument();
    });
});
