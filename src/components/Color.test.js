import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const testColor = {
    code: {hex: '#99ddbc'},
    color: "limegreen",
    id: 1
}

const emptyColor = {
    code: {hex: ''},
    color: "",
    id: ''
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={emptyColor} />)
});
  
test("Renders the color passed into component", () => {
    render(<Color color={testColor} />)

    const color = screen.getByText('limegreen')

    expect(color).toBeInTheDocument();

});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", async () => {
    const mockHandleDelete = jest.fn();
    const mockToggleEdit = jest.fn();
    const mockDeleteColor = jest.fn();

    render(<Color color={testColor} deleteColor={mockDeleteColor} toggleEdit={mockToggleEdit} handleDelete={mockHandleDelete()} />);

    const button = screen.getByTestId('delete');

    userEvent.click(button);

    await waitFor(()=>{
        expect(mockToggleEdit).toHaveBeenCalledTimes(1);
        expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    })

});

test("Executes setEditColor and toggleEdit property when color div is clicked", async () => {
    const mockToggleEdit = jest.fn();
    const mockSetEditColor = jest.fn();

    render(<Color color={testColor} setEditColor={mockSetEditColor} toggleEdit={mockToggleEdit}/>);

    const button = screen.getByTestId('color')

    userEvent.click(button);

    expect(mockToggleEdit).toHaveBeenCalled()
    expect(mockSetEditColor).toBeCalledTimes(1);

});