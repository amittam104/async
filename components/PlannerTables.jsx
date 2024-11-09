import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";
import { ListTodo } from "lucide-react";

const plannerData = [
  {
    id: 1,
    priority: "High",
    status: "open",
    name: "Develop login page",
    labels: "feature",
    dueDate: "2024-12-01",
    created: "2024-11-01",
    assignee: "Amit",
    details:
      "You will see details of task over here. There are lot of things we need to take care of. We need to focus on accessibility too",
  },
  {
    id: 2,
    priority: "Medium",
    status: "inProgress",
    name: "Fix button alignment bug",
    labels: "bug",
    dueDate: "2024-12-05",
    created: "2024-10-10",
    assignee: "Priya",
  },
  {
    id: 3,
    priority: "Low",
    status: "open",
    name: "Write API documentation",
    labels: "feature",
    dueDate: "2024-11-15",
    created: "2024-09-20",
    assignee: "Ravi",
  },
  {
    id: 4,
    priority: "High",
    status: "closed",
    name: "Integrate payment gateway",
    labels: "feature",
    dueDate: "2024-12-12",
    created: "2024-08-25",
    assignee: "Amit",
  },
  {
    id: 5,
    priority: "Low",
    status: "open",
    name: "Update README file",
    labels: "documentation",
    dueDate: "2024-12-10",
    created: "2024-07-30",
    assignee: "Priya",
  },
  {
    id: 6,
    priority: "High",
    status: "open",
    name: "Design dashboard UI",
    labels: "feature",
    dueDate: "2024-11-25",
    created: "2024-06-22",
    assignee: "Ravi",
  },
  {
    id: 7,
    priority: "Medium",
    status: "closed",
    name: "Set up CI/CD pipeline",
    labels: "infrastructure",
    dueDate: "2024-12-15",
    created: "2024-08-05",
    assignee: "Ankit",
  },
  {
    id: 8,
    priority: "Low",
    status: "inProgress",
    name: "Refactor homepage code",
    labels: "feature",
    dueDate: "2024-11-18",
    created: "2024-09-10",
    assignee: "Priya",
  },
  {
    id: 9,
    priority: "High",
    status: "open",
    name: "Build user authentication",
    labels: "feature",
    dueDate: "2024-12-20",
    created: "2024-10-01",
    assignee: "Ravi",
  },
  {
    id: 10,
    priority: "Medium",
    status: "closed",
    name: "Fix mobile layout issue",
    labels: "bug",
    dueDate: "2024-12-25",
    created: "2024-07-15",
    assignee: "Amit",
  },
  {
    id: 11,
    priority: "High",
    status: "closed",
    name: "Implement search functionality",
    labels: "feature",
    dueDate: "2024-11-30",
    created: "2024-09-05",
    assignee: "Priya",
  },
  {
    id: 12,
    priority: "Low",
    status: "inProgress",
    name: "Update project dependencies",
    labels: "maintenance",
    dueDate: "2024-11-10",
    created: "2024-08-20",
    assignee: "Ankit",
  },
  {
    id: 13,
    priority: "High",
    status: "inProgress",
    name: "Implement file upload feature",
    labels: "feature",
    dueDate: "2024-12-05",
    created: "2024-10-12",
    assignee: "Ravi",
  },
  {
    id: 14,
    priority: "Medium",
    status: "open",
    name: "Fix database connection issue",
    labels: "bug",
    dueDate: "2024-12-10",
    created: "2024-09-30",
    assignee: "Amit",
  },
  {
    id: 15,
    priority: "Low",
    status: "closed",
    name: "Optimize CSS for mobile",
    labels: "performance",
    dueDate: "2024-11-28",
    created: "2024-06-10",
    assignee: "Priya",
  },
];

export function OpenTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 3;

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const openPlannerData = plannerData.filter((row) => row.status === "open");

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
  }, []);

  // Handle table row focus on up or down arrow keys
  function handleKeyDown(e, i) {
    if (e.key === "ArrowDown" && i < rowRef.current.length - 1) {
      rowRef?.current[i + 1]?.focus();
    }

    if (e.key === "ArrowUp" && i > 0) {
      rowRef?.current[i - 1]?.focus();
    }
  }

  // handle Modal toggle
  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalOpen() {
    setIsModalOpen(true);
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
                onClick={handleModalOpen}
                tabIndex="0"
                className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
              >
                {/* <td className="text-left text-sm border-b py-2">{row.id}</td> */}
                <td className="text-left text-sm border-b py-2">
                  {row.priority}
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
        <h2 className="ml-6 text-xl font-semibold mb-8">
          Your {currentData.find((row, i) => row.id === 1).status} task
        </h2>
        <div className="px-6">
          <h3 className="text-md font-medium mb-6 flex items-center">
            <ListTodo className="w-5 mr-2" />
            {currentData.find((row, i) => row.id === 1).name}
          </h3>

          <p className="ml-2 mb-2 text-sm text-neutral-500">Details:</p>
          <div className="w-full border border-neutral-100 rounded-lg h-full py-4 px-4 text-sm text-neutral-700">
            {currentData.find((row, i) => row.id === 1).details}
          </div>
        </div>
      </Modal>
    </>
  );
}

export function ProgressTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const inProgressPlannerData = plannerData.filter(
    (row) => row.status === "inProgress"
  );

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
  }, []);

  // Handle table row focus on up or down arrow keys
  function handleKeyDown(e, i) {
    if (e.key === "ArrowDown" && i < rowRef.current.length - 1) {
      rowRef.current[i + 1]?.focus();
    }

    if (e.key === "ArrowUp" && i > 0) {
      rowRef.current[i - 1]?.focus();
    }
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
                  tabIndex="0"
                  className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
                >
                  {/* <td className="text-left text-sm border-b py-2">{row.id}</td> */}
                  <td className="text-left text-sm border-b py-2">
                    {row.priority}
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
    </>
  );
}

export function ClosedTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const closedPlannerData = plannerData.filter(
    (row) => row.status === "closed"
  );

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
  }, []);

  // Handle table row focus on up or down arrow keys
  function handleKeyDown(e, i) {
    if (e.key === "ArrowDown" && i < rowRef.current.length - 1) {
      rowRef.current[i + 1]?.focus();
    }

    if (e.key === "ArrowUp" && i > 0) {
      rowRef.current[i - 1]?.focus();
    }
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
                  tabIndex="0"
                  className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
                >
                  {/* <td className="text-left text-sm border-b py-2">{row.id}</td> */}
                  <td className="text-left text-sm border-b py-2">
                    {row.priority}
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
    </>
  );
}
