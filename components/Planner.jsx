"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialPlannerData } from "@/lib/data";
import { useState } from "react";
import { OpenTaskTable } from "./OpenTaskTable";
import { ProgressTaskTable } from "./ProgressTaskTable";
import { ClosedTaskTable } from "./ClosedTaskTable";

function Planner() {
  const [plannerData, setPlannerData] = useState(initialPlannerData);
  const [openTasksCount, setOpenTasksCount] = useState(1);
  const [inProgressTasksCount, setInProgressTasksCount] = useState(1);
  const [closedTasksCount, setClosedTasksCount] = useState(1);
  const [currentTab, setCurrentTab] = useState("open");

  return (
    <div>
      <div>
        <Tabs defaultValue="open" className="w-full" value={currentTab}>
          <TabsList className="rounded-lg px-2 py-2">
            <TabsTrigger
              className="px-4 py-1 rounded-lg relative"
              value="open"
              onClick={() => setCurrentTab("open")}
            >
              Open
              {currentTab === "open" && (
                <p className="absolute py-0 top-[-10px] right-[-10px] text-[10px] p-2 rounded-full bg-red-500 text-white">
                  {openTasksCount || 0}
                </p>
              )}
            </TabsTrigger>
            <TabsTrigger
              className="px-5 py-1 rounded-lg relative"
              value="inProgress"
              onClick={() => setCurrentTab("inProgress")}
            >
              In Progress
              {currentTab === "inProgress" && (
                <p className="absolute py-0 top-[-10px] right-[-10px] text-[10px] p-2 rounded-full bg-red-500 text-white">
                  {inProgressTasksCount || 0}
                </p>
              )}
            </TabsTrigger>
            <TabsTrigger
              className="px-5 py-1 rounded-lg relative"
              value="closed"
              onClick={() => setCurrentTab("closed")}
            >
              Closed
              {currentTab === "closed" && (
                <p className="absolute py-0 top-[-10px] right-[-10px] text-[10px] p-2 rounded-full bg-red-500 text-white">
                  {closedTasksCount || 0}
                </p>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <OpenTaskTable
              plannerData={plannerData}
              setPlannerData={setPlannerData}
              setOpenTasksCount={setOpenTasksCount}
            />
          </TabsContent>
          <TabsContent value="inProgress">
            <ProgressTaskTable
              plannerData={plannerData}
              setPlannerData={setPlannerData}
              setInProgressTasksCount={setInProgressTasksCount}
            />
          </TabsContent>
          <TabsContent value="closed">
            <ClosedTaskTable
              plannerData={plannerData}
              setPlannerData={setPlannerData}
              setClosedTasksCount={setClosedTasksCount}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Planner;
