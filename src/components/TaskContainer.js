import { useEffect, useState } from "react";
import { Button, Col, FormCheck, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList, updateTask, deleteTaskAction } from "../redux/taskAction";
function TaskContainer() {
  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.tasks);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);
  const handleOnSwitch = (obj) => {
    if (window.confirm("Are you sure you want to switch this task?")) {
      dispatch(updateTask(obj));
    }
  };

  const handleOnSelect = (e) => {
    const { value, checked } = e.target;
    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };
  const handleOnDelete = () => {
    if (window.confirm("Are you sure you want to delete the tasks?")) {
      dispatch(deleteTaskAction(ids));
      setIds([]);
    }
  };
  const entryList = taskList.filter(({ type }) => type === "entry");
  const badList = taskList.filter(({ type }) => type === "bad");
  const total = taskList.reduce((acc, { hr }) => acc + hr, 0);
  const entryListHrs = entryList.reduce((acc, { hr }) => acc + hr, 0);
  const wastedHrs = total - entryListHrs;
  return (
    <>
      <Row className="mt-5">
        <Col>
          <h3 className="text-center">Entry List</h3>
          <hr />
          <Table
            striped
            bordered
            hover
            className="bg-transparent"
            variant="dark"
          >
            <tbody>
              {entryList.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>

                    <td>
                      <div className="d-flex">
                        <FormCheck value={item._id} onChange={handleOnSelect} />{" "}
                        {item.task}
                      </div>
                    </td>
                    <td>{item.hr}</td>
                    <td>
                      <Button
                        variant="warning"
                        title="Mark As Bad List"
                        onClick={() =>
                          handleOnSwitch({ _id: item._id, type: "bad" })
                        }
                      >
                        <i class="fa-solid fa-arrow-right"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col>
          <h3 className="text-center">Bad List</h3>
          <hr />
          <Table striped bordered hover className="bg-transparent">
            <tbody>
              {badList.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="d-flex">
                        <FormCheck value={item._id} onChange={handleOnSelect} />{" "}
                        {item.task}
                      </div>
                    </td>
                    <td>{item.hr}</td>
                    <td>
                      <Button
                        variant="danger"
                        title="Mark As Entry List"
                        onClick={() =>
                          handleOnSwitch({ _id: item._id, type: "entry" })
                        }
                      >
                        <i class="fa-solid fa-arrow-left"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <tr>
            <td>
              <h4>You could have saved:{wastedHrs}</h4>
            </td>
          </tr>
        </Col>
      </Row>
      <Row>
        <Col className="d-grid">
          {ids.length > 0 && (
            <div className="d-grid">
              <Button variant="danger" onClick={handleOnDelete}>
                Delete {ids.length} tasks
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h2>Total hours= {total}</h2>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default TaskContainer;
