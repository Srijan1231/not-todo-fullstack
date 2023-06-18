import { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList } from "../redux/taskAction";
function TaskContainer() {
  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);
  return (
    <Row className="mt-5">
      <Col>
        <h3 className="text-center">Entry List</h3>
        <hr />
        <Table striped bordered hover className="bg-transparent">
          <tbody>
            {taskList.map((item, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hr}</td>
                  <td>button</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
      <Col>
        <h3 className="text-center">Bad List</h3>
        <hr />{" "}
      </Col>
    </Row>
  );
}
export default TaskContainer;
