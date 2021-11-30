import React from "react";
import { Paper, Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

function Task(props) {
    const isDragDisabled = props.task.id === 'task-1';
  return (
    <div>
      <Draggable draggableId={props.task.id} index={props.index}
      isDragDisabled= {isDragDisabled}
      >
        {(provided) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 128,
                height: 128,
              },
            }}
            // i put it in the component that i want to move it
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Paper elevation={3}>{props.task.content}</Paper>
          </Box>
        )}
      </Draggable>
    </div>
  );
}

export default Task;
