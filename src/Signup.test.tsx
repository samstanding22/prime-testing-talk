import React from "react";
import { fireEvent, render } from "@testing-library/react";
import faker from "faker";
import Signup from "./Signup";

describe("Signup", () => {
    it("displays validation rules, takes in valid form data, doesn't throw errors and logs in user", () => {
        const { getByLabelText, queryByText, getByTestId, getByText } = render(<Signup setUser={jest.fn()} />);
        const password = faker.internet.password();

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        expect(getByText("Password needs to be longer than 8 characters")).toBeInTheDocument();
        expect(getByText("Password should not match your first name or email address")).toBeInTheDocument();

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: password } });
        fireEvent.change(passwordConfirmNode, { target: { value: password } });

        fireEvent.submit(getByTestId("form"));

        expect(queryByText("Invalid email address")).toBeNull();
        expect(queryByText("Password cannot be the same as your email or first name")).toBeNull();
        expect(queryByText("Password must be longer than 8 characters")).toBeNull();
        expect(queryByText("Passwords must match")).toBeNull();
    });
    it("displays error message if email is invalid", () => {
        const { getByLabelText, getByText, getByTestId } = render(<Signup setUser={jest.fn()} />);

        const password = faker.internet.password();

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(passwordNode, { target: { value: password } });
        fireEvent.change(passwordConfirmNode, { target: { value: password } });

        fireEvent.submit(getByTestId("form"));

        expect(getByText("Invalid email address")).toBeInTheDocument();
    });
});
