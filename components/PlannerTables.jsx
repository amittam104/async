import { useEffect, useRef, useState } from "react";
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
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

const initialPlannerData = [
  {
    id: 0,
    priority: "High",
    status: "open",
    name: "Develop login page",
    labels: "feature",
    dueDate: "2024-12-01",
    created: "2024-11-01",
    assignee: "Amit",
    details:
      "You will see details of the task over here. There are a lot of things we need to take care of. We need to focus on accessibility too.",
    comments: [
      "Will have to start working on it from this week.",
      "There are few changes, we need to focus on this first.",
      "Working on the changes, will notify you tomorrow",
    ],
  },
  {
    id: 1,
    priority: "Medium",
    status: "inProgress",
    name: "Fix button alignment bug",
    labels: "bug",
    dueDate: "2024-12-05",
    created: "2024-10-10",
    assignee: "Priya",
    details:
      "This bug affects the layout on mobile devices. Ensure alignment fixes are compatible across screen sizes.",
    comments: [
      "Found the root cause of the alignment issue.",
      "Testing on different devices to confirm it's fixed.",
      "Almost done; need a few tweaks for better spacing.",
    ],
  },
  {
    id: 2,
    priority: "Low",
    status: "open",
    name: "Write API documentation",
    labels: "feature",
    dueDate: "2024-11-15",
    created: "2024-09-20",
    assignee: "Ravi",
    details:
      "Detail each API endpoint and expected responses. Use examples for clarity and ensure it covers edge cases.",
    comments: [
      "Started drafting the endpoint descriptions.",
      "Added examples for the first few endpoints.",
      "Reviewing edge cases to include in the documentation.",
    ],
  },
  {
    id: 3,
    priority: "High",
    status: "closed",
    name: "Integrate payment gateway",
    labels: "feature",
    dueDate: "2024-12-12",
    created: "2024-08-25",
    assignee: "Amit",
    details:
      "Integrate Stripe as the payment gateway. Ensure proper error handling and support for multiple currencies.",
    comments: [
      "Stripe integration is mostly complete.",
      "Testing for multiple currency support.",
      "Added error handling for payment failures.",
    ],
  },
  {
    id: 4,
    priority: "Low",
    status: "open",
    name: "Update README file",
    labels: "documentation",
    dueDate: "2024-12-10",
    created: "2024-07-30",
    assignee: "Priya",
    details:
      "Update README to reflect recent changes. Include installation instructions and major feature descriptions.",
    comments: [
      "Added initial setup instructions.",
      "Updated feature list in the README.",
      "Clarifying installation steps based on feedback.",
    ],
  },
  {
    id: 5,
    priority: "High",
    status: "open",
    name: "Design dashboard UI",
    labels: "feature",
    dueDate: "2024-11-25",
    created: "2024-06-22",
    assignee: "Ravi",
    details:
      "Design the user dashboard with responsiveness in mind. Include analytics and user activity overview sections.",
    comments: [
      "Started with wireframes for the dashboard.",
      "Focusing on responsiveness for various screen sizes.",
      "Incorporated analytics section as planned.",
    ],
  },
  {
    id: 6,
    priority: "Medium",
    status: "closed",
    name: "Set up CI/CD pipeline",
    labels: "infrastructure",
    dueDate: "2024-12-15",
    created: "2024-08-05",
    assignee: "Ankit",
    details:
      "Implement CI/CD pipeline with GitHub Actions. Ensure automated tests run and deployments to staging are smooth.",
    comments: [
      "Configured GitHub Actions for automated tests.",
      "Deployment to staging environment is working.",
      "Debugging minor issues with test automation.",
    ],
  },
  {
    id: 7,
    priority: "Low",
    status: "inProgress",
    name: "Refactor homepage code",
    labels: "feature",
    dueDate: "2024-11-18",
    created: "2024-09-10",
    assignee: "Priya",
    details:
      "Refactor homepage for better performance. Focus on reducing render times and optimizing image loading.",
    comments: [
      "Identified parts of the code for optimization.",
      "Working on reducing the render times.",
      "Optimizing image loading strategy for faster load times.",
    ],
  },
  {
    id: 8,
    priority: "High",
    status: "open",
    name: "Build user authentication",
    labels: "feature",
    dueDate: "2024-12-20",
    created: "2024-10-01",
    assignee: "Ravi",
    details:
      "Implement secure user authentication with password encryption. Allow login via email and social accounts.",
    comments: [
      "Implemented password encryption for secure login.",
      "Testing social account login integration.",
      "Added basic login and signup forms for testing.",
    ],
  },
  {
    id: 9,
    priority: "Medium",
    status: "closed",
    name: "Fix mobile layout issue",
    labels: "bug",
    dueDate: "2024-12-25",
    created: "2024-07-15",
    assignee: "Amit",
    details:
      "Fix issues with layout shifting on smaller screens. Verify that padding and margins are responsive.",
    comments: [
      "Adjusted margins to fix shifting issues.",
      "Tested responsiveness on various screen sizes.",
      "Finalized adjustments; layout now stable on mobile.",
    ],
  },
  {
    id: 10,
    priority: "High",
    status: "closed",
    name: "Implement search functionality",
    labels: "feature",
    dueDate: "2024-11-30",
    created: "2024-09-05",
    assignee: "Priya",
    details:
      "Implement search with filters by date and priority. Optimize for fast performance on large data sets.",
    comments: [
      "Set up basic search functionality.",
      "Added filters for date and priority.",
      "Working on optimizing for large data sets.",
    ],
  },
  {
    id: 11,
    priority: "High",
    status: "inProgress",
    name: "Update project dependencies",
    labels: "maintenance",
    dueDate: "2024-11-10",
    created: "2024-08-20",
    assignee: "Ankit",
    details:
      "Update all project dependencies to their latest versions. Test compatibility and resolve breaking changes.",
    comments: [
      "Started with core dependency updates.",
      "Testing for compatibility issues after updates.",
      "Resolved major breaking changes in dependencies.",
    ],
  },
  {
    id: 12,
    priority: "High",
    status: "inProgress",
    name: "Implement file upload feature",
    labels: "feature",
    dueDate: "2024-12-05",
    created: "2024-10-12",
    assignee: "Ravi",
    details:
      "Build a file upload feature supporting various formats. Ensure large files are uploaded with error handling.",
    comments: [
      "Basic file upload functionality is in place.",
      "Testing support for different file formats.",
      "Handling errors for large file uploads.",
    ],
  },
  {
    id: 13,
    priority: "Medium",
    status: "open",
    name: "Fix database connection issue",
    labels: "bug",
    dueDate: "2024-12-10",
    created: "2024-09-30",
    assignee: "Amit",
    details:
      "Resolve connection issues with the database. Check for connection pooling and optimize connection limits.",
    comments: [
      "Investigating connection pooling settings.",
      "Adjusted connection limits for better stability.",
      "Monitoring database for connection improvements.",
    ],
  },
  {
    id: 14,
    priority: "Low",
    status: "closed",
    name: "Optimize CSS for mobile",
    labels: "performance",
    dueDate: "2024-11-28",
    created: "2024-06-10",
    assignee: "Priya",
    details:
      "Optimize CSS to improve mobile performance. Minify CSS files and reduce unused styles for faster load times.",
    comments: [
      "Started removing unused styles.",
      "Minified CSS files to reduce load times.",
      "Testing CSS performance on mobile devices.",
    ],
  },
];

export function OpenTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskIndexModal, setTaskIndexModal] = useState();
  const [plannerData, setPlannerData] = useState(initialPlannerData);
  const [userComment, setUserComment] = useState("");
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

  // handle task modal toggle
  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalOpen(taskIndex) {
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
                tabIndex="0"
                className="focus:outline-none focus:bg-gray-100 text-center border-b py-2"
              >
                {/* <td className="text-left text-sm border-b py-2">{row.id}</td> */}
                <td className="text-left text-sm border-b py-2">
                  <Badge className="bg-neutral-100 border border-neutral-600 text-neutral-600">
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
            <h3 className="text-md font-medium mb-2 flex items-center">
              <ListTodo className="w-5 mr-3" />
              {
                plannerData
                  .filter((row, i) => row.status === "open")
                  .find((row, i) => i === taskIndexModal)?.name
              }
            </h3>

            <Badge className="mb-6 bg-neutral-100 border border-neutral-600 text-neutral-600">
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

export function ProgressTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskIndexModal, setTaskIndexModal] = useState();
  const [plannerData, setPlannerData] = useState(initialPlannerData);
  const [userComment, setUserComment] = useState("");
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

    if (e.key === "Enter") {
      setIsModalOpen(true);
      setTaskIndexModal(i);
    }

    if (e.key === "Escape") {
      setIsModalOpen(false);
    }

    // handle modal traversing with key down
    if (e.key === "ArrowRight") {
      if (inProgressPlannerData.length <= taskIndexModal + 1) return;
      setTaskIndexModal((taskIndex) => taskIndex + 1);
    }

    if (e.key === "ArrowLeft") {
      if (taskIndexModal === 0) return;
      setTaskIndexModal((i) => i - 1);
    }
  }

  // handle task modal toggle
  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalOpen(taskIndex) {
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
                  tabIndex="0"
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
            <h3 className="text-md font-medium mb-2 flex items-center">
              <ListTodo className="w-5 mr-3" />
              {
                plannerData
                  .filter((row, i) => row.status === "inProgress")
                  .find((row, i) => i === taskIndexModal)?.name
              }
            </h3>

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
              <Button onSubmit size="icon" variant="ghost" className=" text-sm">
                <Send />
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function ClosedTaskTable() {
  const rowRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskIndexModal, setTaskIndexModal] = useState();
  const [plannerData, setPlannerData] = useState(initialPlannerData);
  const [userComment, setUserComment] = useState("");
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

    if (e.key === "Enter") {
      setIsModalOpen(true);
      setTaskIndexModal(i);
    }

    if (e.key === "Escape") {
      setIsModalOpen(false);
    }

    // handle modal traversing with key down
    if (e.key === "ArrowRight") {
      if (closedPlannerData.length <= taskIndexModal + 1) return;
      setTaskIndexModal((taskIndex) => taskIndex + 1);
    }

    if (e.key === "ArrowLeft") {
      if (taskIndexModal === 0) return;
      setTaskIndexModal((i) => i - 1);
    }
  }

  // handle task modal toggle
  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalOpen(taskIndex) {
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
                  tabIndex="0"
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
            <h3 className="text-md font-medium mb-2 flex items-center">
              <ListTodo className="w-5 mr-3" />
              {
                plannerData
                  .filter((row, i) => row.status === "closed")
                  .find((row, i) => i === taskIndexModal)?.name
              }
            </h3>

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
              <Button onSubmit size="icon" variant="ghost" className=" text-sm">
                <Send />
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
