import React, { useContext, useEffect, useState } from "react";
import Tickets from "./Tickets";
import "./Columns.css";
import TicketContext from "../../context/context";
import Plus from "../../images/plus.png";
import Dots from "../../images/dots.png";

const Users = () => {
  const { order, statusData } = useContext(TicketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const temp = [];
    Object.keys(statusData).forEach(function (key, index) {
      temp.push(statusData[key]);
    });
    setTickets(temp);
  }, [statusData]);

  useEffect(() => {
    let temp = [];
    if (order === "priority") {
      {
        tickets?.map((items) => {
          let data = items.data.sort(function (a, b) {
            return b.priority - a.priority;
          });
          temp.push({ status: items.status, data: data });
        });
      }
    } else if (order === "title") {
      // let sortedData = statusData?.Todo?.sort((r1, r2) =>
      //   r1.title > r2.title ? 1 : r1.title < r2.title ? -1 : 0
      // );
      tickets?.map((items) => {
        let data = items.data.sort((r1, r2) =>
          r1.title > r2.title ? 1 : r1.title < r2.title ? -1 : 0
        );
        temp.push({ status: items.status, data: data });
      });
    }
    setTickets(temp);
  }, [order]);

  const Columns = ({ item }) => {
    return (
      <div className="columns">
        <div className="justify-between">
          <div className=" justify-between">
            <p style={{ fontWeight: "bold", marginRight: 6 }}>{item?.status}</p>
            <p>{item?.data.length}</p>
          </div>
          <div>
            <button style={{ marginRight: 12, borderWidth: 0 }}>
              <img src={Plus} alt="_add" width={16} />
            </button>
            <button style={{ borderWidth: 0 }}>
              <img src={Dots} alt="_more" width={18} />
            </button>
          </div>
        </div>

        {item?.data?.map(({ id, title, tag }) => {
          return (
            <div key={id} className="card">
              <Tickets id={id} title={title} tag={tag} key={id} />
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="group-container justify-evenly">
      {tickets?.map((items, index) => {
        return <Columns item={items} key={index} />;
      })}
    </div>
  );
};

export default Users;
