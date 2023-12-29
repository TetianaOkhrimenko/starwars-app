import { useEffect, useState } from "react";
import "./Card.css";
import { getData } from "../../services/getData";

export default function Card({ entityType }) {
  const [data, setData] = useState({});
  const [index, setIndex] = useState(1);
  const [imageURL, setImageURL] = useState(
    `https://starwars-visualguide.com/assets/img/${
      entityType === "people" ? "characters" : entityType
    }/${index}.jpg`
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(index, entityType);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setData({
          name: "Not Available",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [index, entityType]);

  const handleError = () => {
    setImageURL(
      "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"
    );
  };

  return (
    <div className="Card">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <img
              src={imageURL}
              alt={`Star Wars ${entityType} ${data.name}` || "Unknown"}
              onError={handleError}
            />
            <h3> {data.name}</h3>
            {entityType === "people" && (
              <ul>
                <li>
                  <span>Gender:</span> {data.gender}
                </li>
                <li>
                  <span>Birth Year:</span> {data.birth_year}
                </li>
                <li>
                  <span>Eye color: </span>
                  {data.eye_color}
                </li>
              </ul>
            )}
            {entityType === "planets" && (
              <ul>
                <li>Population: {data.population}</li>
                <li>Orbital period: {data.orbital_period}</li>
                <li>Diameter: {data.diameter}</li>
              </ul>
            )}
            {entityType === "starships" && (
              <ul>
                <li>Model: {data.model}</li>
                <li>Manufacturer: {data.manufacturer}</li>
                <li>Cost in credits: {data.cost_in_credits}</li>
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
