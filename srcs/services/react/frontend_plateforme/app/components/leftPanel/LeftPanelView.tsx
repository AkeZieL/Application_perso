import CreatePointButton from "./components/CreatePointButton";
import Filter from "./components/Filter"


export default function LeftPanelView({ filters, setFilters }) {

  return (
    <div>
      <h2 className="font-bold mb-2">Recherche personnalisé</h2>
      <Filter filters={filters} setFilters={setFilters} />
      <CreatePointButton />
      <hr />
    </div>
  );
}