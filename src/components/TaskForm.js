import { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { addTaskList } from "../redux/taskAction";
import { toast } from "react-toastify";

export const TaskForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const { taskList } = useSelector((state) => state.tasks);
  const total = taskList.reduce((acc, { hr }) => acc + hr, 0);
  const totalHrPerWeek = 7 * 24;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (totalHrPerWeek > total) {
      return dispatch(addTaskList(form));
    } else {
      toast.error("You don't have enough hours to add task");
    }
  };

  return (
    <Form className=" border p-2 bg-light rounded" onSubmit={handleOnSubmit}>
      <Row className="g-2">
        <Col md="6">
          <Form.Control
            required
            placeholder="Task"
            name="task"
            type="text"
            onChange={handleOnChange}
          />
        </Col>
        <Col md="2">
          <Form.Control
            required
            placeholder="hr/s"
            name="hr"
            type="number"
            onChange={handleOnChange}
          />
        </Col>
        <Col className="d-grid">
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
