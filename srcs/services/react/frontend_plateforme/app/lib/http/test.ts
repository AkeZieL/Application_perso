import api from "../api/axios";


const testRequest = async () => {
  
      try {
    // 🔥 AJOUT: on crée plusieurs requêtes simultanées
    const requests = [
      api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
            api.get("test/"),
      api.get("test/1"), // 🔥 MODIFIÉ: appel 1
      api.get("test/2"), // 🔥 AJOUT: appel 2
      api.get("test/3"), // 🔥 AJOUT: appel 3
    ];

    // 🔥 AJOUT: exécution en parallèle
    const responses = await Promise.all(requests);

    // 🔥 AJOUT: affichage de toutes les réponses
    responses.forEach((res, index) => {
      console.log(`Response ${index + 1}:`, res.data);
    });

    // 🔥 AJOUT: retourne toutes les données
    return responses.map(res => res.data);

  } catch (error: any) {
    console.log("LOGOUT ERROR:", error.response?.data || error.message);
    throw error;
  }
  /*
  try {
    const res = await api.get("test/");
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.log("LOGOUT ERROR:", error.response?.data || error.message);
    throw error;
  }*/
}

export default testRequest