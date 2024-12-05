import React, { useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable
} from '@hello-pangea/dnd';
import { Trash2, GripVertical } from 'lucide-react';

const ReorderableInputList = ({categories, items, setItems}) => {
    const onDragEnd = (result) => {
        // If dropped outside the list
        if (!result.destination) return;

        // Reorder items
        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setItems(newItems);
    };

    const addItem = () => {
        const newItem = {
            id: `${items.length + 1}`,
            text: '',
            category : ''
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id, newText, Category) => {
        console.log(Category)
        setItems(items.map(item =>
            item.id === id ? { ...item, text: newText, category : Category } : item
        ));
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="w-[60%] p-4">
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-xl font-bold">Options</h2>
                <button
                    onClick={addItem}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add row
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-2 "
                        >
                            {items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={`w-full flex items-center bg-white border rounded-lg shadow-sm p-2 transition-all duration-200 ease-in-out ${snapshot.isDragging ? 'shadow-lg scale-105 bg-blue-50 rotate-2' : 'shadow-sm'}`}
                                        >
                                            <div
                                                {...provided.dragHandleProps}
                                                className="mr-2 cursor-move "
                                                title="Drag to reorder"
                                            >
                                                <GripVertical
                                                    className={`text-gray-400 ${snapshot.isDragging ? 'text-blue-500' : ''}`}
                                                    size={20}
                                                />
                                            </div>

                                            <div className='w-full flex justify-between '>

                                                <input
                                                    type="text"
                                                    value={item.text}
                                                    onChange={(e) => updateItem(item.id, e.target.value)}
                                                    className="flex-grow mr-2 px-2 py-1 border rounded"
                                                    placeholder="Enter item text"
                                                />

                                                <select onChange={(e)=>updateItem(item.id, item.text, e.target.value)} name="category" id="category" className='min-w-[300px] border rounded px-2 py-1 mx-2'>
                                                <option >Select Category</option>
                                                    {categories.map((category =>{
                                                        return <>
                                                            <option key={category.id} value={category.text}>{category.text}</option>
                                                        </>
                                                    }))}
                                                </select>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Remove item"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ReorderableInputList;