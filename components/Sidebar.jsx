function Sidebar() {
  return (
    <div className="flex flex-col">
      <div className="mb-16 flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-sky-600 to-indigo-600">
          &nbsp;
        </div>
        <h2 className="text-base">Async</h2>
      </div>
      <div className="bg-neutral-100 px-3 py-2 rounded-md hover:bg-neutral-200/60 hover:cursor-pointer transition-colors delay-75 ease-in-out">
        <p className="text-sm">Planner</p>
      </div>
    </div>
  );
}

export default Sidebar;
