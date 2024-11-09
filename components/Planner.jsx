"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClosedTaskTable,
  OpenTaskTable,
  ProgressTaskTable,
} from "./PlannerTables";

function Planner() {
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
            <OpenTaskTable />
          </TabsContent>
          <TabsContent value="password">
            <ProgressTaskTable />
          </TabsContent>
          <TabsContent value="closed">
            <ClosedTaskTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Planner;
