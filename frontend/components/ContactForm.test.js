import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm/>);
});

test('renders the contact form header', () => {
    render(<ContactForm/>)

    const header = screen.getByText(/contact form/i)
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Contact Form");
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "asd")

    const errorMessages = await screen.findAllByText(/Error:/i);
    expect(errorMessages).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton)

    const errorMessages = await screen.findAllByText(/Error:/i);
    expect(errorMessages).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    
    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "asdfg")

    const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, "asdfg")

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton)

    const errorMessages = await screen.findAllByText(/Error:/i);
    expect(errorMessages).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const emailInput = screen.getByLabelText(/email*/i)
    userEvent.type(emailInput, "mdkd@kdkd")

    const errorMessages = await screen.findAllByText(/Error: email must be a valid email address./i);
    expect(errorMessages).toHaveLength(1)
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton)

    const errorMessages = await screen.findAllByText(/lastName is a required field/i);
    expect(errorMessages).toBeInTheDocument
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "asdfg")

    const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, "asdfgh")

    const emailInput = screen.getByLabelText(/email*/i)
    userEvent.type(emailInput, "mdkd@kdkd.com")

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton)

    const firstName = await screen.findByText("asdfg")
    const lastName = await screen.findByText("asdfgh")
    const email = await screen.findByText("mdkd@kdkd.com")
    const message = await screen.queryByText(/message:/i)

    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(message).toBeNull()
    // const errorMessages = await screen.findAllByText(/error*/i);
    // expect(errorMessages).toBeInTheDocument
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, "asdfg")

    const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, "asdfgh")

    const emailInput = screen.getByLabelText(/email*/i)
    userEvent.type(emailInput, "mdkd@kdkd.com")

    const messageInput = screen.getByLabelText(/message*/i)
    userEvent.type(messageInput, "12345")

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton)

    const firstName = await screen.findByText("asdfg")
    const lastName = await screen.findByText("asdfgh")
    const email = await screen.findByText("mdkd@kdkd.com")
    const message = await screen.findByText("12345")

    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(message).toBeInTheDocument()

});
