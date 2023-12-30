import { useEffect, useState } from "react";
import "./Card.css";
import { getData } from "../../services/getData";
import Button from "../Button/Button";
import { Oval } from "react-loader-spinner";

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
    setIndex(1);
  }, [entityType]);

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

  useEffect(() => {
    setImageURL(
      `https://starwars-visualguide.com/assets/img/${
        entityType === "people" ? "characters" : entityType
      }/${index}.jpg`
    );
    setLoading(true);
  }, [index, entityType]);

  const clickNextButton = () => {
    setIndex((prev) => prev + 1);
  };

  const handleError = () => {
    setImageURL(
      "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"
    );
  };

  return (
    <div className="Card">
      <div className="button-container">
        <Button handleClick={clickNextButton}>Next</Button>
      </div>
      <div className="container">
        {loading ? (
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#f1f1f1"
            secondaryColor="#B38FF9"
            ariaLabel="oval-loading"
            wrapperClass=""
          />
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
                <li>
                  <span>Population:</span> {data.population}
                </li>
                <li>
                  <span>Orbital period:</span> {data.orbital_period}
                </li>
                <li>
                  <span>Diameter:</span> {data.diameter}
                </li>
              </ul>
            )}
            {entityType === "starships" && (
              <ul>
                <li>
                  <span>Model:</span> {data.model}
                </li>
                <li>
                  <span>Manufacturer:</span> {data.manufacturer}
                </li>
                <li>
                  <span>Cost in credits:</span> {data.cost_in_credits}
                </li>
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
