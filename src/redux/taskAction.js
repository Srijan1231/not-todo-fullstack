import { toast } from "react-toastify";
import { fetchTask } from "../Helper/axiosHelper";
import { setTaskList } from "./taskSlice";
import { postTask } from "../Helper/axiosHelper";
export const getTaskList = () => async (dispatch) => {
  const { status, taskList } = await fetchTask();
  if (status === "success" && taskList.length) {
    // setList(taskList);
    dispatch(setTaskList(taskList));
  }
};

export const addTaskList = (taskObj) => async (dispatch) => {
  try {
    const respPromise = postTask(taskObj);
    toast.promise(respPromise, {
      pending: "please wait ....",
    });
    const { status, message } = await respPromise;

    toast[status](message);
    if (status === "success") {
      dispatch(getTaskList());
    }
  } catch (error) {
    toast.error(error.message);
  }
};
