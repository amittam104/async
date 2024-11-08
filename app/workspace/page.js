import Planner from "@/components/Planner";
import Sidebar from "@/components/Sidebar";

function page() {
  return (
    <div className="grid grid-cols-[1fr_6fr] bg-neutral-50 min-h-dvh">
      <aside className="px-6 py-6 border-r border-r-neutral-200">
        <Sidebar />
      </aside>
      <div>
        <header className="py-4 px-8 border-b border-b-neutral-200">
          <h2>Welcome back</h2>
        </header>
        <main className="px-8 py-8">
          <Planner />
        </main>
      </div>
    </div>
  );
}

export default page;
