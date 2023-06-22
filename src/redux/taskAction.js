import { toast } from "react-toastify";
import { deleteTasks, fetchTask, switchTask } from "../Helper/axiosHelper";
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

export const updateTask = (taskObj) => async (dispatch) => {
  const dataPending = switchTask(taskObj);
  toast.promise(dataPending, {
    pending: "Please wait .... ",
  });
  const { status, message } = await dataPending;
  toast[status](message);
  if (status === "success") {
    dispatch(getTaskList());
  }
};
export const deleteTaskAction = (ids) => async (dispatch) => {
  const pendingResp = deleteTasks(ids);
  toast.promise(pendingResp, {
    pending: "Please wait .... ",
  });
  const { status, message } = await pendingResp;
  toast[status](message);
  if (status === "success") {
    dispatch(getTaskList());
  }
};
