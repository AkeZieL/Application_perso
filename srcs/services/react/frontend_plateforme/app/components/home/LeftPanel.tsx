import SettingsSection from "../settings/SettingsSection";


export default function LeftPanel({ mode, setMode }) {
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
            <SettingsSection />
        </div>
    </div>
  );
}