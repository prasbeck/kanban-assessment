import React from "react";
import "./Tickets.css";
import smiley from "../../images/smiley.png";

const Tickets = ({ id, title, tag, name }) => {
  return (
    <div className="card-container">
      <div className="card-content">
        <p className="card-id">{id}</p>
        <p className="card-title">{title}</p>
        <div className="card-footer">
          <button onClick={() => console.log("clicked ")} className="tag btn">
            ---
          </button>
          <div className="card-tags remove-scrollbar">
            {tag.map((item) => {
              return (
                <div key={item} className="tag">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="card-profile">
        {name ? (
          <div className="pic">{name[0]}</div>
        ) : (
          <img src={smiley} alt="_img" width={30} />
        )}
      </div>
    </div>
  );
};

export default Tickets;
