import React, { useContext, useEffect, useState } from "react";
import Tickets from "./Tickets";
import "./Columns.css";
import TicketContext from "../../context/context";
import Plus from "../../images/plus.png";
import Dots from "../../images/dots.png";

const Status = () => {
  const { order, statusData, group, userData, users, priorityData } =
    useContext(TicketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const temp = [];
    if (group === "status") {
      Object.keys(statusData).forEach(function (key, index) {
        temp.push(statusData[key]);
      });
    } else if (group === "users") {
      Object.keys(userData).forEach(function (key, index) {
        temp.push(userData[key]);
      });
    } else if (group === "priority") {
      Object.keys(priorityData).forEach(function (key, index) {
        temp.push(priorityData[key]);
      });
    }

    setTickets(temp);
  }, [group, userData, statusData, priorityData]);
  useEffect(() => {
    let temp = [];
    if (order === "priority") {
      {
        tickets?.map((items) => {
          let data = items.data.sort(function (a, b) {
            return b.priority - a.priority;
          });
          temp.push({ status: items.status, data: data, name: items.name });
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
        temp.push({ status: items.status, data: data, name: items.name });
      });
    }
    setTickets(temp);
  }, [order]);

  const Columns = ({ item }) => {
    return (
      <div className="columns">
        <div className="justify-between">
          <div className=" justify-between">
            <p style={{ fontWeight: "bold", marginRight: 6 }}>
              {item?.status || item?.name}
            </p>
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

        {item?.data?.map(({ id, title, tag, userId }) => {
          return (
            <div key={id} className="card">
              <Tickets
                id={id}
                title={title}
                tag={tag}
                key={id}
                name={users[userId].name}
              />
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="group-container justify-evenly remove-scrollbar">
      {tickets?.map((items, index) => {
        return <Columns item={items} key={index} />;
      })}
    </div>
  );
};

export default Status;
