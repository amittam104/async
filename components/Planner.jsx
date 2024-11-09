"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClosedTaskTable,
  OpenTaskTable,
  ProgressTaskTable,
} from "./PlannerTables";
import { initialPlannerData } from "@/lib/data";
import { useState } from "react";

function Planner() {
  const [plannerData, setPlannerData] = useState(initialPlannerData);

  return (
    <div>
      <div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="rounded-lg px-2 py-2">
            <TabsTrigger className="px-4 py-1 rounded-lg" value="account">
              Open
            </TabsTrigger>
            <TabsTrigger className="px-5 py-1 rounded-lg" value="password">
              In Progress
            </TabsTrigger>
            <TabsTrigger className="px-5 py-1 rounded-lg" value="closed">
              Closed
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <OpenTaskTable
              plannerData={plannerData}
              setPlannerData={setPlannerData}
            />
          </TabsContent>
          <TabsContent value="password">
            <ProgressTaskTable
              plannerData={plannerData}
              setPlannerData={setPlannerData}
            />
          </TabsContent>
          <TabsContent value="closed">
            <ClosedTaskTable
              plannerData={plannerData}
              setPlannerData={setPlannerData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Planner;
