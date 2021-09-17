import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

const testColors = [{
    code: {hex: '#99ddbc'},
    color: "limegreen",
    id: 1
},{
    code: {hex: '#f0f8ff'},
    color: "aliceblue",
    id: 2
},{
    code: {hex: '#00ffff'},
    color: "aqua",
    id: 3
}]

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]}/>)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={testColors}/>)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const {rerender} = render(<ColorList colors={testColors} editing={true}/>)
    const form = screen.queryByTestId('edit_menu')
    expect(form).toBeInTheDocument()

    rerender(<ColorList colors={testColors} editing={false} />)
    expect(form).not.toBeInTheDocument()
});
