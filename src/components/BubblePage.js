import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
    .then(data => {
      setColors(data)
    })
  },[])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
    .put(`/colors/${editColor.id}`, editColor)
    .then(res => {
      //I could not figure out, for the life of me, how to update the state without mutating the array. If it's possible I would love a pointer/example on how I could do this the right way! (Unless this is the right way, although I doubt it)
      const newColors = colors.filter(color => color.id !== editColor.id)
      newColors.push(res.data)
      setColors(newColors)
    })
    .catch(err => console.log(err))
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
    .delete(`/colors/${colorToDelete.id}`)
    .then(res => setColors(colors.filter(color => parseInt(color.id) !== parseInt(res.data))))
    .catch(err => console.log(err))
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
