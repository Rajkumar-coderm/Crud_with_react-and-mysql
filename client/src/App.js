import "./App.css";
import { useState } from "react";
import Axios from "axios";


function App() {
  const [Name, setName] = useState("");
  const [Email,setEmail] = useState("");
  const [Password,setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      Name: Name,
      Email: Email,
      Password: Password,
    }).then(() => {
      setUserList([
        ...userList,
        {
          Name: Name,
          Email: Email,
          Password: Password,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setUserList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { Emai: newEmail, id: id }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  Name: val.Name,
                  Email: newEmail, 
                  Password: val.Password,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
    <h1>User Form</h1>
      <div className="information">
      <label>Name:-</label>
        <input type="text" placeholder="Enter Your Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}/>
        <input type="text" placeholder="Enter Your Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}/>
        <input type="text" placeholder="Enter Your Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}/>
        <button onClick={addEmployee}>Add User</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show User</button>

        {userList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>User Id: {val.id}</h3>
                <h3>Name: {val.Name}</h3>
                <h3>Email: {val.Email}</h3>
              </div>
              <div>
                <input className="update" type="text"
                  placeholder="Enter New Emiail..."
                  onChange={(event) => {
                    setNewEmail(event.target.value);
                  }}/>
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {updateEmployeeWage}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
