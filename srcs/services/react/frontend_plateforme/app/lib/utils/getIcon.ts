import L from "leaflet"

const eventIcon = new L.Icon({
  iconUrl: "PointBleu.png",
  iconSize: [30, 30],
});

const placeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});


function getIcon(type: string) {
  switch (type) {
    case "event":
      return eventIcon;
    case "place":
      return placeIcon;
    default:
      return placeIcon;
  }
}

export default getIcon