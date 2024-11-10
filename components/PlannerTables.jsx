import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";
import {
  ChevronLeft,
  ChevronRight,
  CircleUser,
  ListTodo,
  Send,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import ConfirmationModal from "./ConfirmationModal";

export function OpenTaskTable({
  plannerData,
  setPlannerData,
  setOpenTasksCount,
}) {
  const rowRef = useRef([]);
  const modalStatusRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskIndexModal, setTaskIndexModal] = useState();
  const [userComment, setUserComment] = useState("");
  const [currentOpenModalStatus, setCurrentOpenModalStatus] = useState("open");
  const [taskStatusUpdateConfirmation, setTaskStatusUpdateConfirmation] =
    useState(false);
  const itemsPerPage = 10;
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const openPlannerData = plannerData.filter((row) => row.status === "open");

  setOpenTasksCount(openPlannerData.length);

  const currentData = openPlannerData.slice(
    indexOfFirstItemOnPage,
    indexOfLastItemOnPage
  );

  const totalPages = Math.ceil(openPlannerData.length / itemsPerPage);

  function handlePageChange(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  }

  // Handle focus on 1st row on the initial load of the page. listen keydown event on the entire body of the page.
  useEffect(function () {
    function handleKeyDownInitial(e) {
      if (e.key === "ArrowDown") {
        rowRef?.current[0]?.focus();
      }
    }

    document.body.addEventListener("keydown", handleKeyDownInitial);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle table row focus on up or down arrow keys
  function handleKeyDown(e, i) {
    if (e.key === "ArrowDown" && i < rowRef.current.length - 1) {
      rowRef?.current[i + 1]?.focus();
    }

    if (e.key === "ArrowUp" && i > 0) {
      rowRef?.current[i - 1]?.focus();
    }

    if (e.key === "Enter") {
      setIsModalOpen(true);
      setTaskIndexModal(i);
    }

    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
    // handle modal traversing with key down
    if (e.key === "ArrowRight") {
      if (openPlannerData.length <= taskIndexModal + 1) return;
      setTaskIndexModal((taskIndex) => taskIndex + 1);
    }

    if (e.key === "ArrowLeft") {
      if (taskIndexModal === 0) return;
      setTaskIndexModal((i) => i - 1);
    }
  }

  useEffect(() => {
    function handleChangeTaskStatusKeyDown(e) {
      if (e.key === "1" || e.key === "2" || e.key === "3") {
        modalStatusRef.current?.focus();
      }

      if (e.key === "1") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("open");
      } else if (e.key === "2") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("inProgress");
      } else if (e.key === "3") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("closed");
      }
    }

    document.body.addEventListener("keydown", handleChangeTaskStatusKeyDown);

    return () => {
      document.body.removeEventListener(
        "keydown",
        handleChangeTaskStatusKeyDown
      );
    };
  }, []);

  // handle task modal toggle
  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalOpen(taskIndex) {
    const openTasks = plannerData.filter((row) => row.status === "open");
    const selectedTask = openTasks[taskIndex];
    setCurrentTaskId(selectedTask.id);
    setIsModalOpen(true);
    setTaskIndexModal(taskIndex);
  }

  // Handle task modal traversing
  function handleModalTaskLeft() {
    if (taskIndexModal === 0) return;
    setTaskIndexModal((i) => i - 1);
  }

  function handleModalTaskRight() {
    if (openPlannerData.length <= taskIndexModal + 1) return;
    setTaskIndexModal((taskIndex) => taskIndex + 1);
  }

  // Add the users new comment in the comments list
  function handleCommentSubmit(e) {
    e.preventDefault();

    const updatedPlannerData = [...plannerData];

    updatedPlannerData
      .filter((row, i) => row.status === "open")
      .find((row, i) => i === taskIndexModal)
      ?.comments.push(userComment);

    setPlannerData(updatedPlannerData);

    setUserComment("");
  }

  // Handle status change of the task opened in modal
  function handleTaskStatusChange(value) {
    setCurrentOpenModalStatus(value);
    setTaskStatusUpdateConfirmation(true);
  }

  function handleConfirmedStatusChange() {
    const updatedPlannerData = plannerData.map((task) => {
      if (task.id === currentTaskId) {
        return {
          ...task,
          status: currentOpenModalStatus,
        };
      }
      return task;
    });

    setPlannerData((plannerData) => (plannerData = updatedPlannerData));
    setTaskStatusUpdateConfirmation(false);
    setCurrentOpenModalStatus("open");
    if (
      plannerData.filter((task) => {
        if (task.status === "open") return task;
      }).length === 1
    )
      setIsModalOpen(false);

    setCurrentTaskId(
      updatedPlannerData.filter((row) => row.status === "open")?.[0]?.id
    );
  }

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="text-sm text-neutral-500">
            {/* <th className="text-left border-b py-2 font-normal w-[5%]">Id</th> */}
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Priority
            </th>

            <th className="text-left border-b py-2 font-normal w-[35%]">
              Name
            </th>
            <th className="text-left border-b py-2 font-normal w-[14%]">
              Labels
            </th>
            <th className="text-left border-b py-2 font-normal w-[13%]">
              Due Date
            </th>
            <th className="text-left border-b py-2 font-normal w-[13%]">
              Created
            </th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Assignee
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, i) => {
            return (
              <tr
                key={row.id}
                ref={(el) => (rowRef.current[i] = el)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onClick={() => handleModalOpen(i)}
                tabIndex={0}
                className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
              >
                {/* <td className="text-left text-sm border-b py-2">{row.id}</td> */}
                <td className="text-left text-sm border-b py-2">
                  <Badge className="bg-neutral-100 border border-neutral-600 text-neutral-600 hover:bg-neutral-200/80">
                    {row.priority}
                  </Badge>
                </td>
                <td className="text-left text-sm border-b py-2">{row.name}</td>
                <td className="text-left text-sm border-b py-2">
                  {row.labels}
                </td>
                <td className="text-left text-sm border-b py-2">
                  {row.dueDate}
                </td>
                <td className="text-left text-sm border-b py-2">
                  {row.created}
                </td>
                <td className="text-left text-sm border-b py-2">
                  {row.assignee}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-end gap-2 text-sm mt-3">
        <Button
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          Prev
        </Button>
        <p>
          {currentPage} of {totalPages} pages
        </p>
        <Button
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          Next
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex flex-col justify-around">
          <h2 className="ml-4 mt-8 text-xl font-semibold mb-8">
            Your{" "}
            {
              plannerData
                .filter((row, i) => row.status === "open")
                .find((row, i) => i === taskIndexModal)?.status
            }{" "}
            task
          </h2>
          <div className="px-4  pb-8 border-b border-b-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium mb-2 flex items-center">
                <ListTodo className="w-5 mr-3" />

                {
                  plannerData
                    .filter((row, i) => row.status === "open")
                    .find((row, i) => i === taskIndexModal)?.name
                }
              </h3>
              <Select
                defaultValue="open"
                ref={modalStatusRef}
                value={currentOpenModalStatus}
                onValueChange={(value) => handleTaskStatusChange(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <ConfirmationModal isOpen={taskStatusUpdateConfirmation}>
                <h4 className="text-md font-semibold mb-2">Are you sure?</h4>
                <p className="text-sm mb-6">
                  Are you sure you want to update the status of this task?
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleTaskStatusChange("open");
                      setTaskStatusUpdateConfirmation(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleConfirmedStatusChange()}>
                    Continue
                  </Button>
                </div>
              </ConfirmationModal>
            </div>
            <Badge className="mb-6 bg-neutral-100 border border-neutral-600 text-neutral-600 hover:bg-neutral-200/80">
              Priority -{" "}
              {
                plannerData
                  .filter((row, i) => row.status === "open")
                  .find((row, i) => i === taskIndexModal)?.priority
              }
            </Badge>

            <p className="ml-2 mb-2 text-sm text-neutral-500">Details:</p>
            <div className="w-full border border-neutral-100 rounded-lg  py-4 px-4 text-sm text-neutral-700">
              {
                plannerData
                  .filter((row, i) => row.status === "open")
                  .find((row, i) => i === taskIndexModal)?.details
              }
            </div>
            <div>
              <ChevronLeft
                color="#d4d4d4"
                className="absolute top-[40%] left-2 "
                onClick={(i) => handleModalTaskLeft(i)}
              />
              <ChevronRight
                color="#d4d4d4"
                className="absolute top-[40%] right-2 "
                onClick={(i) => handleModalTaskRight(i)}
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-neutral-500 mb-2">Comments:</p>
            {plannerData
              .filter((row, i) => row.status === "open")
              .find((row, i) => i === taskIndexModal)
              ?.comments?.map((comment, i) => (
                <div key={i} className="flex items-center gap-2 ml-4 mb-2">
                  <CircleUser className="w-4" />
                  <p className="text-xs">{comment}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 mt-8 place-content-end justify-self-end">
            <div className="w-[40%] text-xs space-y-2">
              <label className="text-sm text-neutral-500 mb-2">
                Add your comment
              </label>
            </div>
            <form
              onSubmit={(e) => handleCommentSubmit(e)}
              className="flex items-center gap-4 mr-2"
            >
              <Input
                value={userComment}
                id="comment"
                onChange={(e) => setUserComment(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className=" text-sm"
              >
                <Send />
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function ProgressTaskTable({
  plannerData,
  setPlannerData,
  setInProgressTasksCount,
}) {
  const rowRef = useRef([]);
  const modalStatusRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskIndexModal, setTaskIndexModal] = useState();
  const [userComment, setUserComment] = useState("");
  const [currentOpenModalStatus, setCurrentOpenModalStatus] =
    useState("inProgress");
  const [taskStatusUpdateConfirmation, setTaskStatusUpdateConfirmation] =
    useState(false);
  const itemsPerPage = 10;
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const inProgressPlannerData = plannerData.filter(
    (row) => row.status === "inProgress"
  );

  setInProgressTasksCount(inProgressPlannerData.length);

  const currentData = inProgressPlannerData.slice(
    indexOfFirstItemOnPage,
    indexOfLastItemOnPage
  );

  const totalPages = Math.ceil(inProgressPlannerData.length / itemsPerPage);

  function handlePageChange(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  }

  // Handle focus on 1st row on the initial load of the page. listen keydown event on the entire body of the page.
  useEffect(function () {
    function handleKeyDownInitial(e) {
      if (e.key === "ArrowDown") {
        rowRef.current[0]?.focus();
      }
    }

    document.body.addEventListener("keydown", handleKeyDownInitial);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle table row focus on up or down arrow keys
  function handleKeyDown(e, i) {
    if (e.key === "ArrowDown" && i < rowRef.current.length - 1) {
      rowRef?.current[i + 1]?.focus();
    }

    if (e.key === "ArrowUp" && i > 0) {
      rowRef?.current[i - 1]?.focus();
    }

    if (e.key === "Enter") {
      setIsModalOpen(true);
      setTaskIndexModal(i);
    }

    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
    // handle modal traversing with key down
    if (e.key === "ArrowRight") {
      if (openPlannerData.length <= taskIndexModal + 1) return;
      setTaskIndexModal((taskIndex) => taskIndex + 1);
    }

    if (e.key === "ArrowLeft") {
      if (taskIndexModal === 0) return;
      setTaskIndexModal((i) => i - 1);
    }
  }

  useEffect(() => {
    function handleChangeTaskStatusKeyDown(e) {
      if (e.key === "1" || e.key === "2" || e.key === "3") {
        modalStatusRef.current?.focus();
      }

      if (e.key === "1") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("open");
      } else if (e.key === "2") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("inProgress");
      } else if (e.key === "3") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("closed");
      }
    }

    document.body.addEventListener("keydown", handleChangeTaskStatusKeyDown);

    return () => {
      document.body.removeEventListener(
        "keydown",
        handleChangeTaskStatusKeyDown
      );
    };
  }, []);

  // handle task modal toggle
  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalOpen(taskIndex) {
    const inProgressTasks = plannerData.filter(
      (row) => row.status === "inProgress"
    );
    const selectedTask = inProgressTasks[taskIndex];
    setCurrentTaskId(selectedTask.id);
    setIsModalOpen(true);
    setTaskIndexModal(taskIndex);
  }

  // Handle task modal traversing
  function handleModalTaskLeft() {
    if (taskIndexModal === 0) return;
    setTaskIndexModal((i) => i - 1);
  }

  function handleModalTaskRight() {
    if (inProgressPlannerData.length <= taskIndexModal + 1) return;
    setTaskIndexModal((taskIndex) => taskIndex + 1);
  }

  // Add the users new comment in the comments list
  function handleCommentSubmit(e) {
    e.preventDefault();

    const updatedPlannerData = [...plannerData];

    updatedPlannerData
      .filter((row, i) => row.status === "inProgress")
      .find((row, i) => i === taskIndexModal)
      ?.comments.push(userComment);

    setPlannerData(updatedPlannerData);

    setUserComment("");
  }

  function handleTaskStatusChange(value) {
    setCurrentOpenModalStatus(value);
    setTaskStatusUpdateConfirmation(true);
  }

  function handleConfirmedStatusChange() {
    const updatedPlannerData = plannerData.map((task) => {
      if (task.id === currentTaskId) {
        return {
          ...task,
          status: currentOpenModalStatus,
        };
      }
      return task;
    });

    setPlannerData((plannerData) => (plannerData = updatedPlannerData));
    setTaskStatusUpdateConfirmation(false);
    setCurrentOpenModalStatus("inProgress");
    if (
      plannerData.filter((task) => {
        if (task.status === "inProgress") return task;
      }).length === 1
    )
      setIsModalOpen(false);

    setCurrentTaskId(
      updatedPlannerData.filter((row) => row.status === "inProgress")?.[0]?.id
    );
  }

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="text-sm text-neutral-500">
            {/* <th className="text-left border-b py-2 font-normal w-[5%]">Id</th> */}
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Priority
            </th>
            <th className="text-left border-b py-2 font-normal w-[35%]">
              Name
            </th>
            <th className="text-left border-b py-2 font-normal w-[14%]">
              Labels
            </th>
            <th className="text-left border-b py-2 font-normal w-[13%]">
              Due Date
            </th>
            <th className="text-left border-b py-2 font-normal w-[13%]">
              Created
            </th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Assignee
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData
            .filter((row) => row.status === "inProgress")
            .map((row, i) => {
              return (
                <tr
                  key={row.id}
                  ref={(el) => (rowRef.current[i] = el)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onClick={() => handleModalOpen(i)}
                  tabIndex={0}
                  className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
                >
                  {/* <td className="text-left text-sm border-b py-2">{row.id}</td> */}
                  <td className="text-left text-sm border-b py-2">
                    <Badge className="bg-neutral-100 border border-neutral-600 text-neutral-600">
                      {row.priority}
                    </Badge>
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.name}
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.labels}
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.dueDate}
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.created}
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.assignee}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="flex items-center justify-end gap-2 text-sm mt-3">
        <Button
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          Prev
        </Button>
        <p>
          {currentPage} of {totalPages} pages
        </p>
        <Button
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          Next
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex flex-col justify-around">
          <h2 className="ml-4 mt-8 text-xl font-semibold mb-8">
            Your{" "}
            {
              plannerData
                .filter((row, i) => row.status === "inProgress")
                .find((row, i) => i === taskIndexModal)?.status
            }{" "}
            task
          </h2>
          <div className="px-4  pb-8 border-b border-b-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium mb-2 flex items-center">
                <ListTodo className="w-5 mr-3" />
                {
                  plannerData
                    .filter((row, i) => row.status === "inProgress")
                    .find((row, i) => i === taskIndexModal)?.name
                }
              </h3>
              <Select
                defaultValue="inProgress"
                ref={modalStatusRef}
                value={currentOpenModalStatus}
                onValueChange={(value) => handleTaskStatusChange(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <ConfirmationModal isOpen={taskStatusUpdateConfirmation}>
                <h4 className="text-md font-semibold mb-2">Are you sure?</h4>
                <p className="text-sm mb-6">
                  Are you sure you want to update the status of this task?
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleTaskStatusChange("inProgress");
                      setTaskStatusUpdateConfirmation(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleConfirmedStatusChange()}>
                    Continue
                  </Button>
                </div>
              </ConfirmationModal>
            </div>

            <Badge className="mb-6 bg-neutral-100 border border-neutral-600 text-neutral-600">
              Priority -{" "}
              {
                plannerData
                  .filter((row, i) => row.status === "inProgress")
                  .find((row, i) => i === taskIndexModal)?.priority
              }
            </Badge>

            <p className="ml-2 mb-2 text-sm text-neutral-500">Details:</p>
            <div className="w-full border border-neutral-100 rounded-lg  py-4 px-4 text-sm text-neutral-700">
              {
                plannerData
                  .filter((row, i) => row.status === "inProgress")
                  .find((row, i) => i === taskIndexModal)?.details
              }
            </div>
            <div>
              <ChevronLeft
                color="#d4d4d4"
                className="absolute top-[40%] left-2 "
                onClick={(i) => handleModalTaskLeft(i)}
              />
              <ChevronRight
                color="#d4d4d4"
                className="absolute top-[40%] right-2 "
                onClick={(i) => handleModalTaskRight(i)}
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-neutral-500 mb-2">Comments:</p>
            {plannerData
              .filter((row, i) => row.status === "inProgress")
              .find((row, i) => i === taskIndexModal)
              ?.comments?.map((comment, i) => (
                <div key={i} className="flex items-center gap-2 ml-4 mb-2">
                  <CircleUser className="w-4" />
                  <p className="text-xs">{comment}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 mt-8 place-content-end justify-self-end">
            <div className="w-[40%] text-xs space-y-2">
              <label className="text-sm text-neutral-500 mb-2">
                Add your comment
              </label>
            </div>
            <form
              onSubmit={(e) => handleCommentSubmit(e)}
              className="flex items-center gap-4 mr-2"
            >
              <Input
                value={userComment}
                id="comment"
                onChange={(e) => setUserComment(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className=" text-sm"
              >
                <Send />
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function ClosedTaskTable({
  plannerData,
  setPlannerData,
  setClosedTasksCount,
}) {
  const rowRef = useRef([]);
  const modalStatusRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskIndexModal, setTaskIndexModal] = useState();
  const [userComment, setUserComment] = useState("");
  const [currentOpenModalStatus, setCurrentOpenModalStatus] =
    useState("closed");
  const [taskStatusUpdateConfirmation, setTaskStatusUpdateConfirmation] =
    useState(false);
  const itemsPerPage = 10;
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const closedPlannerData = plannerData.filter(
    (row) => row.status === "closed"
  );

  setClosedTasksCount(closedPlannerData.length);

  const currentData = closedPlannerData.slice(
    indexOfFirstItemOnPage,
    indexOfLastItemOnPage
  );

  const totalPages = Math.ceil(closedPlannerData.length / itemsPerPage);

  function handlePageChange(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  }

  // Handle focus on 1st row on the initial load of the page. listen keydown event on the entire body of the page.
  useEffect(function () {
    function handleKeyDownInitial(e) {
      if (e.key === "ArrowDown") {
        rowRef.current[0]?.focus();
      }
    }

    document.body.addEventListener("keydown", handleKeyDownInitial);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle table row focus on up or down arrow keys
  function handleKeyDown(e, i) {
    if (e.key === "ArrowDown" && i < rowRef.current.length - 1) {
      rowRef?.current[i + 1]?.focus();
    }

    if (e.key === "ArrowUp" && i > 0) {
      rowRef?.current[i - 1]?.focus();
    }

    if (e.key === "Enter") {
      setIsModalOpen(true);
      setTaskIndexModal(i);
    }

    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
    // handle modal traversing with key down
    if (e.key === "ArrowRight") {
      if (openPlannerData.length <= taskIndexModal + 1) return;
      setTaskIndexModal((taskIndex) => taskIndex + 1);
    }

    if (e.key === "ArrowLeft") {
      if (taskIndexModal === 0) return;
      setTaskIndexModal((i) => i - 1);
    }
  }

  useEffect(() => {
    function handleChangeTaskStatusKeyDown(e) {
      if (e.key === "1" || e.key === "2" || e.key === "3") {
        modalStatusRef.current?.focus();
      }

      if (e.key === "1") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("open");
      } else if (e.key === "2") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("inProgress");
      } else if (e.key === "3") {
        setTaskStatusUpdateConfirmation(true);
        setCurrentOpenModalStatus("closed");
      }
    }

    document.body.addEventListener("keydown", handleChangeTaskStatusKeyDown);

    return () => {
      document.body.removeEventListener(
        "keydown",
        handleChangeTaskStatusKeyDown
      );
    };
  }, []);

  // handle task modal toggle
  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalOpen(taskIndex) {
    const closedTasks = plannerData.filter((row) => row.status === "closed");
    const selectedTask = closedTasks[taskIndex];
    setCurrentTaskId(selectedTask.id);
    setIsModalOpen(true);
    setTaskIndexModal(taskIndex);
  }

  // Handle task modal traversing
  function handleModalTaskLeft() {
    if (taskIndexModal === 0) return;
    setTaskIndexModal((i) => i - 1);
  }

  function handleModalTaskRight() {
    if (closedPlannerData.length <= taskIndexModal + 1) return;
    setTaskIndexModal((taskIndex) => taskIndex + 1);
  }

  // Add the users new comment in the comments list
  function handleCommentSubmit(e) {
    e.preventDefault();

    const updatedPlannerData = [...plannerData];

    updatedPlannerData
      .filter((row, i) => row.status === "closed")
      .find((row, i) => i === taskIndexModal)
      ?.comments.push(userComment);

    setPlannerData(updatedPlannerData);

    setUserComment("");
  }

  function handleTaskStatusChange(value) {
    setCurrentOpenModalStatus(value);
    setTaskStatusUpdateConfirmation(true);
  }

  function handleConfirmedStatusChange() {
    const updatedPlannerData = plannerData.map((task) => {
      if (task.id === currentTaskId) {
        return {
          ...task,
          status: currentOpenModalStatus,
        };
      }
      return task;
    });

    setPlannerData((plannerData) => (plannerData = updatedPlannerData));
    setTaskStatusUpdateConfirmation(false);
    setCurrentOpenModalStatus("closed");
    if (
      plannerData.filter((task) => {
        if (task.status === "closed") return task;
      }).length === 1
    )
      setIsModalOpen(false);

    setCurrentTaskId(
      updatedPlannerData.filter((row) => row.status === "closed")?.[0]?.id
    );
  }

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="text-sm text-neutral-500">
            {/* <th className="text-left border-b py-2 font-normal w-[5%]">Id</th> */}
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Priority
            </th>
            <th className="text-left border-b py-2 font-normal w-[35%]">
              Name
            </th>
            <th className="text-left border-b py-2 font-normal w-[14%]">
              Labels
            </th>
            <th className="text-left border-b py-2 font-normal w-[13%]">
              Due Date
            </th>
            <th className="text-left border-b py-2 font-normal w-[13%]">
              Created
            </th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Assignee
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData
            .filter((row) => row.status === "closed")
            .map((row, i) => {
              return (
                <tr
                  key={row.id}
                  ref={(el) => (rowRef.current[i] = el)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onClick={() => handleModalOpen(i)}
                  tabIndex={0}
                  className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
                >
                  {/* <td className="text-left text-sm border-b py-2">{row.id}</td> */}
                  <td className="text-left text-sm border-b py-2">
                    <Badge className="bg-neutral-100 border border-neutral-600 text-neutral-600">
                      {row.priority}
                    </Badge>
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.name}
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.labels}
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.dueDate}
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.created}
                  </td>
                  <td className="text-left text-sm border-b py-2">
                    {row.assignee}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="flex items-center justify-end gap-2 text-sm mt-3">
        <Button
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          Prev
        </Button>
        <p>
          {currentPage} of {totalPages} pages
        </p>
        <Button
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          Next
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex flex-col justify-around">
          <h2 className="ml-4 mt-8 text-xl font-semibold mb-8">
            Your{" "}
            {
              plannerData
                .filter((row, i) => row.status === "closed")
                .find((row, i) => i === taskIndexModal)?.status
            }{" "}
            task
          </h2>
          <div className="px-4  pb-8 border-b border-b-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium mb-2 flex items-center">
                <ListTodo className="w-5 mr-3" />
                {
                  plannerData
                    .filter((row, i) => row.status === "closed")
                    .find((row, i) => i === taskIndexModal)?.name
                }
              </h3>
              <Select
                defaultValue="closed"
                ref={modalStatusRef}
                value={currentOpenModalStatus}
                onValueChange={(value) => handleTaskStatusChange(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <ConfirmationModal isOpen={taskStatusUpdateConfirmation}>
                <h4 className="text-md font-semibold mb-2">Are you sure?</h4>
                <p className="text-sm mb-6">
                  Are you sure you want to update the status of this task?
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleTaskStatusChange("closed");
                      setTaskStatusUpdateConfirmation(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleConfirmedStatusChange()}>
                    Continue
                  </Button>
                </div>
              </ConfirmationModal>
            </div>

            <Badge className="mb-6 bg-neutral-100 border border-neutral-600 text-neutral-600">
              Priority -{" "}
              {
                plannerData
                  .filter((row, i) => row.status === "closed")
                  .find((row, i) => i === taskIndexModal)?.priority
              }
            </Badge>

            <p className="ml-2 mb-2 text-sm text-neutral-500">Details:</p>
            <div className="w-full border border-neutral-100 rounded-lg  py-4 px-4 text-sm text-neutral-700">
              {
                plannerData
                  .filter((row, i) => row.status === "closed")
                  .find((row, i) => i === taskIndexModal)?.details
              }
            </div>
            <div>
              <ChevronLeft
                color="#d4d4d4"
                className="absolute top-[40%] left-2 "
                onClick={(i) => handleModalTaskLeft(i)}
              />
              <ChevronRight
                color="#d4d4d4"
                className="absolute top-[40%] right-2 "
                onClick={(i) => handleModalTaskRight(i)}
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-neutral-500 mb-2">Comments:</p>
            {plannerData
              .filter((row, i) => row.status === "closed")
              .find((row, i) => i === taskIndexModal)
              ?.comments?.map((comment, i) => (
                <div key={i} className="flex items-center gap-2 ml-4 mb-2">
                  <CircleUser className="w-4" />
                  <p className="text-xs">{comment}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 mt-8 place-content-end justify-self-end">
            <div className="w-[40%] text-xs space-y-2">
              <label className="text-sm text-neutral-500 mb-2">
                Add your comment
              </label>
            </div>
            <form
              onSubmit={(e) => handleCommentSubmit(e)}
              className="flex items-center gap-4 mr-2"
            >
              <Input
                value={userComment}
                id="comment"
                onChange={(e) => setUserComment(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className=" text-sm"
              >
                <Send />
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
