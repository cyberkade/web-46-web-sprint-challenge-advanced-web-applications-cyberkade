import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";

import BubblePage from './BubblePage';

import mockFetchColorService from '../services/fetchColorService'
jest.mock('../services/fetchColorService')

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


test("Renders without errors", ()=> {
    mockFetchColorService.mockResolvedValueOnce(testColors)

    render(<BubblePage/>)
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    mockFetchColorService.mockResolvedValueOnce(testColors)

    render(<BubblePage/>)

    const colors = await screen.findAllByTestId("color")

    expect(colors).toHaveLength(testColors.length)
});