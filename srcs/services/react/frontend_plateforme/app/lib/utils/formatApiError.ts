const formatApiError = (error: any) => {
  const data = error.response?.data;

  if (!data) {
    return "Erreur réseau ou serveur indisponible";
  }

  if (typeof data === "object") {
    return Object.values(data)
      .flat()
      .join("\n");
  }

  return "Une erreur est survenue";
};

export default formatApiError;