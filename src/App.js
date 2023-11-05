import "./App.css";
import { useState, useEffect, useContext } from "react";
import Settings from "../src/images/setting.png";
import Down from "../src/images/down.png";
import TicketContext from "./context/context";

import Status from "./components/cards/Status";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [group, setGroup] = useState("status");
  const [order, setOrder] = useState("priority");
  const [statusData, setStatusData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
  const [priorityData, setPriorityData] = useState([]);

  const priorityT = {
    0: { name: "No priority" },
    1: { name: "Low" },
    2: { name: "Medium" },
    3: { name: "High" },
    4: { name: "Urgent" },
  };

  useEffect(() => {
    const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const tempusers = {};
        const groupedStatus = {};
        const usersData = {};
        const priorityD = [];

        result.users.forEach((user) => {
          const { id } = user;
          tempusers[id] = { ...user };
        });

        result.tickets.forEach((ticket) => {
          const { status } = ticket;

          if (!groupedStatus[status]) {
            groupedStatus[status] = { status: status, data: [] };
          }

          groupedStatus[status].data.push(ticket);
        });
        result.tickets.forEach((ticket) => {
          const { userId } = ticket;

          if (!usersData[userId]) {
            usersData[userId] = {
              userId: userId,
              data: [],
              name: tempusers[userId].name,
            };
          }
          usersData[userId].data.push(ticket);
        });
        result.tickets.forEach((ticket) => {
          const { priority } = ticket;

          if (!priorityD[priority]) {
            priorityD[priority] = {
              priority: priority,
              data: [],
              name: priorityT[priority].name,
            };
          }

          priorityD[priority].data.push(ticket);
        });

        // Now, groupedTickets contains tickets grouped by status
        setUsers(tempusers);
        setStatusData(groupedStatus);
        setUserData(usersData);
        setPriorityData(priorityD.reverse());
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const priorityChange = (e) => {
    setOrder(e.target.value);
  };
  const groupChange = (e) => {
    setGroup(e.target.value);
  };

  return (
    <TicketContext.Provider
      value={{ order, statusData, group, userData, users, priorityData }}
    >
      <div
        className="App"
        onClick={() => {
          isModalOpen && setModalOpen(false);
        }}
      >
        <div className="navbar">
          <div>
            <button
              className=" filter-btn-container"
              onClick={() => setModalOpen(!isModalOpen)}
            >
              <img
                src={Settings}
                alt="_filter"
                width={20}
                style={{ marginRight: 6 }}
              />{" "}
              Display
              <img
                src={Down}
                style={{ marginLeft: 4 }}
                alt="_select"
                width={18}
              />
            </button>
          </div>
        </div>
        <div className="content-container">
          {isModalOpen && (
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grouping-container">
                <p style={{ color: "rgb(112, 112, 112)", fontWeight: "bold" }}>
                  Grouping
                </p>
                <select
                  name="Grouping"
                  id="group"
                  value={group}
                  style={{
                    width: 120,
                    justifyContent: "center",
                    height: 36,
                    borderColor: "#f0f0f0",
                    borderRadius: 4,
                    paddingRight: 6,
                    paddingLeft: 6,
                  }}
                  onChange={groupChange}
                >
                  <option value="status">Status</option>
                  <option value="users">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="grouping-container">
                <p style={{ color: "rgb(112, 112, 112)", fontWeight: "bold" }}>
                  Ordering
                </p>
                <select
                  name="Ordering"
                  id="order"
                  value={order}
                  style={{
                    width: 120,
                    justifyContent: "center",
                    height: 36,
                    borderColor: "#f0f0f0",
                    borderRadius: 4,
                    paddingRight: 6,
                    paddingLeft: 6,
                  }}
                  onChange={priorityChange}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}

          <Status />
        </div>
      </div>
    </TicketContext.Provider>
  );
}

export default App;
