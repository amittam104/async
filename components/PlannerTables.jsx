import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const openTableData = [
  {
    id: 1,
    priority: "High",
    status: "WIP",
    name: "Develop login page",
    labels: "feature",
    dueDate: "2024-12-01",
    created: "2024-11-01",
    assignee: "Amit",
  },
  {
    id: 2,
    priority: "Medium",
    status: "Pending",
    name: "Fix button alignment bug",
    labels: "bug",
    dueDate: "2024-12-05",
    created: "2024-10-10",
    assignee: "Priya",
  },
  {
    id: 3,
    priority: "Low",
    status: "Completed",
    name: "Write API documentation",
    labels: "feature",
    dueDate: "2024-11-15",
    created: "2024-09-20",
    assignee: "Ravi",
  },
  {
    id: 4,
    priority: "High",
    status: "WIP",
    name: "Integrate payment gateway",
    labels: "feature",
    dueDate: "2024-12-12",
    created: "2024-08-25",
    assignee: "Amit",
  },
  {
    id: 5,
    priority: "Low",
    status: "Completed",
    name: "Update README file",
    labels: "documentation",
    dueDate: "2024-12-10",
    created: "2024-07-30",
    assignee: "Priya",
  },
  {
    id: 6,
    priority: "High",
    status: "WIP",
    name: "Design dashboard UI",
    labels: "feature",
    dueDate: "2024-11-25",
    created: "2024-06-22",
    assignee: "Ravi",
  },
  {
    id: 7,
    priority: "Medium",
    status: "Pending",
    name: "Set up CI/CD pipeline",
    labels: "infrastructure",
    dueDate: "2024-12-15",
    created: "2024-08-05",
    assignee: "Ankit",
  },
  {
    id: 8,
    priority: "Low",
    status: "Completed",
    name: "Refactor homepage code",
    labels: "feature",
    dueDate: "2024-11-18",
    created: "2024-09-10",
    assignee: "Priya",
  },
  {
    id: 9,
    priority: "High",
    status: "WIP",
    name: "Build user authentication",
    labels: "feature",
    dueDate: "2024-12-20",
    created: "2024-10-01",
    assignee: "Ravi",
  },
  {
    id: 10,
    priority: "Medium",
    status: "Pending",
    name: "Fix mobile layout issue",
    labels: "bug",
    dueDate: "2024-12-25",
    created: "2024-07-15",
    assignee: "Amit",
  },
  {
    id: 11,
    priority: "High",
    status: "WIP",
    name: "Implement search functionality",
    labels: "feature",
    dueDate: "2024-11-30",
    created: "2024-09-05",
    assignee: "Priya",
  },
  {
    id: 12,
    priority: "Low",
    status: "Completed",
    name: "Update project dependencies",
    labels: "maintenance",
    dueDate: "2024-11-10",
    created: "2024-08-20",
    assignee: "Ankit",
  },
  {
    id: 13,
    priority: "High",
    status: "WIP",
    name: "Implement file upload feature",
    labels: "feature",
    dueDate: "2024-12-05",
    created: "2024-10-12",
    assignee: "Ravi",
  },
  {
    id: 14,
    priority: "Medium",
    status: "Pending",
    name: "Fix database connection issue",
    labels: "bug",
    dueDate: "2024-12-10",
    created: "2024-09-30",
    assignee: "Amit",
  },
  {
    id: 15,
    priority: "Low",
    status: "Completed",
    name: "Optimize CSS for mobile",
    labels: "performance",
    dueDate: "2024-11-28",
    created: "2024-06-10",
    assignee: "Priya",
  },
];

const progressTableData = [
  {
    id: 1,
    priority: "Medium",
    status: "WIP",
    name: "Implement API integration",
    labels: "feature",
    dueDate: "2024-11-30",
    created: "2024-10-15",
    assignee: "John",
  },
  {
    id: 2,
    priority: "High",
    status: "Pending",
    name: "Refactor database schema",
    labels: "maintenance",
    dueDate: "2024-12-05",
    created: "2024-10-20",
    assignee: "Sia",
  },
  {
    id: 3,
    priority: "Low",
    status: "Completed",
    name: "Fix broken links on the homepage",
    labels: "bug",
    dueDate: "2024-11-15",
    created: "2024-09-10",
    assignee: "Amit",
  },
  {
    id: 4,
    priority: "High",
    status: "WIP",
    name: "Build product landing page",
    labels: "feature",
    dueDate: "2024-12-12",
    created: "2024-08-18",
    assignee: "Ravi",
  },
  {
    id: 5,
    priority: "Medium",
    status: "Pending",
    name: "Optimize API calls for performance",
    labels: "performance",
    dueDate: "2024-12-15",
    created: "2024-10-05",
    assignee: "Priya",
  },
  {
    id: 6,
    priority: "Low",
    status: "Completed",
    name: "Design the user profile page",
    labels: "feature",
    dueDate: "2024-11-25",
    created: "2024-07-10",
    assignee: "Ankit",
  },
  {
    id: 7,
    priority: "High",
    status: "WIP",
    name: "Develop search functionality",
    labels: "feature",
    dueDate: "2024-12-01",
    created: "2024-08-30",
    assignee: "Sia",
  },
  {
    id: 8,
    priority: "Medium",
    status: "Pending",
    name: "Set up GitHub Actions for CI/CD",
    labels: "infrastructure",
    dueDate: "2024-12-20",
    created: "2024-09-25",
    assignee: "John",
  },
];

const closedTableData = [
  {
    id: 1,
    priority: "High",
    status: "Completed",
    name: "Complete the user dashboard",
    labels: "feature",
    dueDate: "2024-11-18",
    created: "2024-09-30",
    assignee: "Alok",
  },
  {
    id: 2,
    priority: "Low",
    status: "Completed",
    name: "Fix CSS styling issues",
    labels: "bug",
    dueDate: "2024-11-22",
    created: "2024-08-20",
    assignee: "Meera",
  },
  {
    id: 3,
    priority: "Medium",
    status: "Completed",
    name: "Refactor login flow",
    labels: "feature",
    dueDate: "2024-10-10",
    created: "2024-08-15",
    assignee: "Ravi",
  },
  {
    id: 4,
    priority: "High",
    status: "Completed",
    name: "Implement password reset functionality",
    labels: "feature",
    dueDate: "2024-11-05",
    created: "2024-09-22",
    assignee: "Alok",
  },
  {
    id: 5,
    priority: "Medium",
    status: "Completed",
    name: "Set up API rate limiting",
    labels: "infrastructure",
    dueDate: "2024-10-30",
    created: "2024-09-10",
    assignee: "Meera",
  },
  {
    id: 6,
    priority: "Low",
    status: "Completed",
    name: "Write unit tests for payment gateway",
    labels: "feature",
    dueDate: "2024-11-10",
    created: "2024-08-25",
    assignee: "Ravi",
  },
  {
    id: 7,
    priority: "Medium",
    status: "Completed",
    name: "Deploy version 2.0 to production",
    labels: "release",
    dueDate: "2024-11-01",
    created: "2024-09-18",
    assignee: "Priya",
  },
  {
    id: 8,
    priority: "High",
    status: "Completed",
    name: "Upgrade server environment to Node 16",
    labels: "maintenance",
    dueDate: "2024-10-25",
    created: "2024-09-05",
    assignee: "Ankit",
  },
];

export function OpenTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const currentData = openTableData.slice(
    indexOfFirstItemOnPage,
    indexOfLastItemOnPage
  );

  const totalPages = Math.ceil(openTableData.length / itemsPerPage);

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

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="text-sm text-neutral-500">
            <th className="text-left border-b py-2 font-normal w-[5%]">Id</th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Priority
            </th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Status
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
                tabIndex="0"
                className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
              >
                <td className="text-left text-sm border-b py-2">{row.id}</td>
                <td className="text-left text-sm border-b py-2">
                  {row.priority}
                </td>
                <td className="text-left text-sm border-b py-2">
                  {row.status}
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
    </>
  );
}

export function ProgressTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const currentData = progressTableData.slice(
    indexOfFirstItemOnPage,
    indexOfLastItemOnPage
  );

  const totalPages = Math.ceil(progressTableData.length / itemsPerPage);

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
            <th className="text-left border-b py-2 font-normal w-[5%]">Id</th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Priority
            </th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Status
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
                tabIndex="0"
                className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
              >
                <td className="text-left text-sm border-b py-2">{row.id}</td>
                <td className="text-left text-sm border-b py-2">
                  {row.priority}
                </td>
                <td className="text-left text-sm border-b py-2">
                  {row.status}
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
    </>
  );
}

export function ClosedTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItemOnPage = currentPage * itemsPerPage;
  const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

  const currentData = closedTableData.slice(
    indexOfFirstItemOnPage,
    indexOfLastItemOnPage
  );

  const totalPages = Math.ceil(closedTableData.length / itemsPerPage);

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
            <th className="text-left border-b py-2 font-normal w-[5%]">Id</th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Priority
            </th>
            <th className="text-left border-b py-2 font-normal w-[10%]">
              Status
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
                tabIndex="0"
                className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
              >
                <td className="text-left text-sm border-b py-2">{row.id}</td>
                <td className="text-left text-sm border-b py-2">
                  {row.priority}
                </td>
                <td className="text-left text-sm border-b py-2">
                  {row.status}
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
    </>
  );
}
