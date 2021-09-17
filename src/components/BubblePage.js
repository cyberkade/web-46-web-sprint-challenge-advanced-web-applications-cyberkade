import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService(setColors)
  },[])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
    .put(`/colors/${editColor.id}`, editColor)
    .then(setColors(colors.filter(color => color.id !== editColor.id, editColor)))
    // .then(res => {
    //   // const oldColor = colors.filter(color => color.id !== editColor.id)
    //   console.log(colors)
    //   console.log(res.data)
    //   setColors([...colors])
    // })
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
