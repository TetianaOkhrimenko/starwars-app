import axios from "axios";

export async function getData(id, entity) {
  const baseURL = "https://swapi.dev/api/";
  try {
    const response = await axios.get(`${baseURL}${entity}/${id}`);
    const data = await response.data;

    if (entity === "people") {
      return {
        name: data.name,
        gender: data.gender,
        birth_year: data.birth_year,
        eye_color: data.eye_color,
      };
    }

    if (entity === "planets") {
      return {
        name: data.name,
        population: data.population,
        orbital_period: data.orbital_period,
        diameter: data.diameter,
      };
    }

    if (entity === "starships") {
      return {
        name: data.name,
        model: data.model,
        manufacturer: data.manufacturer,
        cost_in_credits: data.cost_in_credits,
      };
    }
  } catch (error) {
    return {
      name: "Not available",
    };
  }
}
