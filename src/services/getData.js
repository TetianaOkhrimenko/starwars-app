import axios from "axios";

export async function getData(id, entity) {
  const baseURL = "https://swapi.dev/api/";
  try {
    const response = await axios.get(`${baseURL}${entity}/${id}`);
    const data = await response.data;

    if (entity === "people") {
      return {
        name: data.name,
        Height: data.height,
        Mass: data.mass,
        Gender: data.gender,
        "Birth year": data.birth_year,
        "Eye color": data.eye_color,
        "Skin color": data.skin_color,
        "Hair color": data.hair_color,
      };
    }

    if (entity === "planets") {
      return {
        name: data.name,
        "Rotation period": data.rotation_period,
        "Orbital period": data.orbital_period,
        Diameter: data.diameter,
        Climate: data.climate,
        Gravity: data.gravity,
        Terrain: data.terrain,
        Population: data.population,
      };
    }

    if (entity === "starships") {
      return {
        name: data.name,
        Model: data.model,
        Manufacturer: data.manufacturer,
        "Cost in credits": data.cost_in_credits,
        Length: data.length,
        "Max atmosphering speed": data.max_atmosphering_speed,
        Crew: data.crew,
        Passengers: data.passengers,
        "Cargo capacity": data.cargo_capacity,
      };
    }
  } catch (error) {
    return {
      name: "Not available",
    };
  }
}
