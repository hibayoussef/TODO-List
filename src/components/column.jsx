import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, List } from "@mui/material";
import Task from "../components/task";
import { Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: "24px",
    fontWeight: 800,
    lineHeight: "32.68px",
    letter: "8%",
    color: "#313131"
  },
  subject: {
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "15.23px",
    letter: "8%",
    color: "#757575",
  },
}));

function Column(props) {
  const classes = useStyles();

  return (
    <Container style={{border: '1px solid red',  marginLeft: '1rem'}}>
      <Typography variant="h5" className={classes.title}>
        {props.column.title}
      </Typography>
      <Typography variant="span" className={classes.subject}>
        {props.column.subject}
      </Typography>

      <Droppable droppableId={props.column.id}>
        {provided => (
          <List
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}

            { provided.placeholder }
          </List>
        )}
      </Droppable>
    </Container>
  );
}

export default Column;
