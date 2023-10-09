import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
      render(<ContactForm />)
});

test('renders the contact form header', () => {
      render(<ContactForm />);
      const headerElement = screen.queryByText(/contact form/i);
      expect(headerElement).toBeInTheDocument();
      expect(headerElement).toBeTruthy();
      expect(headerElement).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
      render(<ContactForm />);
      const firstNameFeild = screen.getByLabelText(/First Name*/i);
      userEvent.type(firstNameFeild, 'jen');
      const errorMessages = await screen.findAllByTestId('error');
      expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
      render(<ContactForm />);
      // const firstNameFeild = screen.getByLabelText(/First Name*/i);
      // userEvent.type(firstNameFeild, '');
      // const lastNameFeild = screen.getByLabelText(/Last Name*/i);
      // userEvent.type(lastNameFeild, '');
      // const emailFeild = screen.getByLabelText(/email*/i);
      // userEvent.type(emailFeild, '');
      const submitButton = screen.getByRole('button');
      userEvent.click(submitButton);

      await waitFor(() => {
            const errorMessages = screen.queryAllByTestId('error');
            expect(errorMessages).toHaveLength(3);
      });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
      render(<ContactForm />);

      const firstNameFeild = screen.getByLabelText(/First Name*/i);
      userEvent.type(firstNameFeild, 'jennifer');

      const lastNameFeild = screen.getByLabelText(/Last Name*/i);
      userEvent.type(lastNameFeild, 'murphy');

      //DONT ACTUALLY NEED TO ENTER IF FEILD IS MEANT TO BE EMPTY
      // const emailFeild = screen.getByLabelText(/First Name*/i);
      // userEvent.type(emailFeild, '');

      const button = screen.getByRole('button');
      userEvent.click(button);

      const errorMessages = await screen.getAllByTestId('error');
      expect(errorMessages).toHaveLength(1); 

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
      render(<ContactForm />);

      const emailFeild = screen.getByLabelText(/email*/i);
      userEvent.type(emailFeild, 'heyJay.com');

      const errorMessage = await screen.findByText(/email must be a valid email address/i);
      expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button');
      userEvent.click(submitButton);


      const errorMessage = await screen.findByText(/lastName is a required field/i);
      expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
      render(<ContactForm />);

      const firstNameFeild = screen.getByLabelText(/first name*/i);
      userEvent.type(firstNameFeild, 'Janine');
      const lastNameFeild = screen.getByLabelText(/last name*/i);
      userEvent.type(lastNameFeild, 'murphly');
      const emailFeild = screen.getByLabelText(/email*/i);
      userEvent.type(emailFeild, 'heyjaymurph@gmail.com');   
      
      const button = screen.getByRole('button');
      userEvent.click(button);

      await waitFor(() => {
            const firstNameDisplay = screen.queryByText('Janine');
            const lastNameDisplay = screen.queryByText('murphly');
            const emailDisplay = screen.queryByText('heyjaymurph@gmail.com');
            const messageDisplay = screen.queryByTestId('messageDisplay');

            expect(firstNameDisplay).toBeInTheDocument();
            expect(lastNameDisplay).toBeInTheDocument();
            expect(emailDisplay).toBeInTheDocument();
            expect(messageDisplay).not.toBeInTheDocument();
      })
});

test('renders all fields text when all fields are submitted.', async () => {
      render(<ContactForm />);

      const firstNameFeild = screen.getByLabelText(/first name*/i);
      userEvent.type(firstNameFeild, 'Jamie');
      const lastNameFeild = screen.getByLabelText(/last name*/i);
      userEvent.type(lastNameFeild, 'Ellen');
      const emailFeild = screen.getByLabelText(/email*/i);
      userEvent.type(emailFeild, 'newEmail@gmail.com');  
      const messageFeild = screen.getByLabelText(/message/i);
      userEvent.type(messageFeild, 'You Are A Gift to the Universe'); 
      
      const button = screen.getByRole('button');
      userEvent.click(button);

      await waitFor(() => {
            const firstNameDisplay = screen.queryByText(/jamie/i);
            const lastNameDisplay = screen.queryByText(/ellen/i);
            const emailDisplay = screen.queryByText(/newEmail@gmail.com/i);
            const messageDisplay = screen.queryByTestId(/message/i);

            expect(firstNameDisplay).toBeInTheDocument();
            expect(lastNameDisplay).toBeInTheDocument();
            expect(emailDisplay).toBeInTheDocument();
            expect(messageDisplay).toBeInTheDocument();
      })
});
