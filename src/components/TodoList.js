import initialData from "../initial-data";
import Column from "../components/column";
import { DragDropContext } from "react-beautiful-dnd";
import { Container } from "@mui/material";

const TodoList = () => {
  const onDragEnd = (result) => {
    // TODO: reorder our column
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = initialData.columns[source.droppableId];
    const finish = initialData.columns[destination.droppableId];

    // is start column and end column are equals
    if (start === finish) {
      // Update Column Id
      const newTaskIds = Array.from(start.taskIds);

      // Move Task Id
      // splice: modify new task IDs, remove 1
      newTaskIds.splice(source.index, 1);
      //
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn,
        },
      };
      //   this.setState(newState);
      //   return;
    }

    console.log(result);
    //   Moving from one List to another
    const startTaskIds = Array.from(start.taskIds);
    //   Here I want to delete draggable Id to move to another 
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    // this.setState(newState);
  };
  // initialData;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container style={{ display: "flex" }}>
        {initialData.columnOrder.map((columnId) => {
          console.log("column Ids:", columnId);
          const column = initialData.columns[columnId];
          console.log("column:", column);
          const tasks = column.taskIds.map(
            (taskId) => initialData.tasks[taskId]
          );

          console.log("tasks", tasks);
          // return column.title;
          // Here I need to return a Component
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

export default TodoList;
