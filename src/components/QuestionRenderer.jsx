import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const CategoryQuestion = ({ question }) => {
  const [options, setOptions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Initialize options from the question prop
    const initialOptions = question.options.map((opt, index) => ({
      id: `option-${index}`,
      content: opt.value,
      originalCategory: opt.category
    }));

    // Initialize categories from the question prop
    const initialCategories = question.categories.map(cat => ({
      id: cat.replace(/\s+/g, '-').toLowerCase(),
      title: cat,
      items: []
    }));

    setOptions(initialOptions);
    setCategories(initialCategories);
  }, [question]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // Moving within options list
    if (source.droppableId === 'options' && destination.droppableId === 'options') {
      const reorderedOptions = Array.from(options);
      const [removed] = reorderedOptions.splice(source.index, 1);
      reorderedOptions.splice(destination.index, 0, removed);
      setOptions(reorderedOptions);
      return;
    }

    // Moving from a category back to options
    if (source.droppableId !== 'options' && destination.droppableId === 'options') {
      const sourceCategory = categories.find(cat => cat.id === source.droppableId);
      const newSourceItems = Array.from(sourceCategory.items);
      const [removed] = newSourceItems.splice(source.index, 1);

      const newOptions = Array.from(options);
      newOptions.splice(destination.index, 0, removed);

      const newCategories = categories.map(category => 
        category.id === source.droppableId 
          ? { ...category, items: newSourceItems } 
          : category
      );

      setOptions(newOptions);
      setCategories(newCategories);
      return;
    }

    // Moving from options to a category
    if (source.droppableId === 'options') {
      const newOptions = Array.from(options);
      const [removed] = newOptions.splice(source.index, 1);

      const newCategories = categories.map(category => {
        if (category.id === destination.droppableId) {
          const newItems = Array.from(category.items);
          newItems.splice(destination.index, 0, removed);
          return { ...category, items: newItems };
        }
        return category;
      });

      setOptions(newOptions);
      setCategories(newCategories);
      return;
    }

    // Moving within a category or between categories
    const newCategories = categories.map(category => {
      if (category.id === source.droppableId) {
        const newSourceItems = Array.from(category.items);
        const [removed] = newSourceItems.splice(source.index, 1);

        if (category.id === destination.droppableId) {
          newSourceItems.splice(destination.index, 0, removed);
          return { ...category, items: newSourceItems };
        }
        
        return { ...category, items: newSourceItems };
      }
      
      if (category.id === destination.droppableId) {
        const newDestItems = Array.from(category.items);
        const sourceCategory = categories.find(c => c.id === source.droppableId);
        const [removed] = sourceCategory.items.splice(source.index, 1);
        newDestItems.splice(destination.index, 0, removed);
        return { ...category, items: newDestItems };
      }
      
      return category;
    });

    setCategories(newCategories);
  };

  return (
    <div className="p-4 max-w-2xl  m-4">
      <h1 className="text-2xl font-bold mb-4">{question.question}</h1>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="options" direction="horizontal">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="flex space-x-2 mb-4 p-2 bg-gray-100 rounded"
            >
              {options.map((option, index) => (
                <Draggable key={option.id} draggableId={option.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 bg-white border rounded"
                    >
                      {option.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Droppable key={category.id} droppableId={category.id}>
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="border-2 border-dashed p-2 min-h-[200px]"
                >
                  <h2 className="text-lg font-semibold mb-2 text-center">{category.title}</h2>
                  {category.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 bg-white border rounded mb-2"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default CategoryQuestion;