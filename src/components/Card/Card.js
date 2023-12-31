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
        console.log(Object.entries(result));
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

      {loading ? (
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#f1f1f1"
          secondaryColor="#B38FF9"
          ariaLabel="oval-loading"
          wrapperClass="loader"
        />
      ) : (
        <div className="data-wrapper">
          <img
            src={imageURL}
            alt={`Star Wars ${entityType} ${data.name}` || "Unknown"}
            onError={handleError}
          />
          <div>
            <h3> {data.name}</h3>
            <ul>
              {Object.entries(data)
                .slice(1)
                .map((item) => (
                  <li>
                    <span>{item[0]}: </span>
                    {item[1]}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
