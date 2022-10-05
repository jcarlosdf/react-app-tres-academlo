import React from "react";
import useFetch from "../CustomHooks/useFetch";

const Cards = ({ resident }) => {
  const character = useFetch(resident);

  return (
    <div className="cards">
      <div className="card">
        <div className="cardImg">
          <img
            //   src="http://pm1.narvii.com/7252/7c7e801f2770cc50fb5793b0351c619e0c6a6e12r1-554-554v2_uhq.jpg"
            src={character?.image}
            alt="Resident"
          />
          <div className="status">
            <span
              style={{
                background:
                  character?.status === "Alive"
                    ? "lightGreen"
                    : character?.status === "Alive"
                    ? "#000"
                    : "grey",
              }}
            ></span>
            {character?.status}
          </div>
        </div>
        <div className="cardInfo">
          <p>{`Name: ${character?.name}`}</p>
          <p>{`Origin: ${character?.origin.name}`}</p>
          <p>{`Episodes where appears: ${character?.episode.length}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
