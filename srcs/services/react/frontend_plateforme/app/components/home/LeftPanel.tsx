import LeftPanelView from "../leftPanel/LeftPanelView";


export default function LeftPanel({ mode, setMode, filters, setFilters}) {
  return (
    <div>
        <div>
            <h2 className="font-bold mb-2">Search</h2>
            <input
                className="w-full border p-2 rounded"
                placeholder="Search places..."
            />
        </div>
        <div className="border-t pt-4">
            <LeftPanelView filters={filters} setFilters={setFilters} />
        </div>
    </div>
  );
}