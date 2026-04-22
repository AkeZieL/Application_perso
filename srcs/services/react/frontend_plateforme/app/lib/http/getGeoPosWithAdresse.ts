async function getGeoPosWithAdresse(address: string) {
    if (!address.trim()) 
        return null;

    const base_url = "https://nominatim.openstreetmap.org/search";

    const params = new URLSearchParams({
        format: "json",
        addressdetails: "1",
        limit: "1",
        q: address,
    });

    const res = await fetch(`${base_url}?${params.toString()}`, {
        headers: {
            "Accept-Language": "fr",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();

    if (!data.length) {
        return null;
    }

    const firstResult = data[0];

    return {
        latitude: parseFloat(firstResult.lat),
        longitude: parseFloat(firstResult.lon),
        address: firstResult.display_name,
    };
}

export default getGeoPosWithAdresse