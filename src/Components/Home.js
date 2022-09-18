import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { specUsers, defaultUser } from "../Actions/Action";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  const API = `https://api.github.com/search/users?q=type:user`;
  const [isError, setisError] = useState({ show: false, Message: "" });
  const [isLoading, setisLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [specUser, setspecUser] = useState([]);
  const dispatch = useDispatch();

  const onClick = async () => {
    try {
      const Search = await fetch(
        `https://api.github.com/search/users?q=${user}`
      );
      const response = await Search.json();

      if (response.incomplete_results === false) {
        setisLoading(false);
        setspecUser(response.items);
        console.log(specUser);
      } else {
        setisLoading(true);
        setisError({ show: true, Message: response.message });
      }
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  };

  const fetchUser = async (url) => {
    try {
      const fetchUsers = await fetch(url);
      const response = await fetchUsers.json();
      if (response.incomplete_results === true) {
        setisLoading(false);
        setUsers(response.items);
        console.log(users);
      } else {
        setisLoading(true);
        setisError({ show: true, Message: response.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser(API);
  }, []);

  if (isLoading) {
    return (
      <div className="Loading">
        <Loading /> <span className="Loadingtxt">Data Fetching .....</span>
      </div>
    );
  }

  return (
    <>
      <h>Home</h>
      <>
        <div className='textField'>
          <input
            placeholder="Search Here..."
            onChange={(e) => setUser(e.target.value)}
            className="textfield"
          />
          <button onClick={onClick} className="btn">
            Search
          </button>
          

        </div>
        <section>
          <div>
            {specUser.length !== 0 || specUser.length > 0 ? (
              <>
                {specUser.map((curUser) => {
                  const nameModify = curUser.login.substring(0, 8);
                  return (

               <div className="searchdiv">
                      <div className="subsearchdiv">

                        <NavLink
                          to={`/Detail/${curUser.id}`}
                          key={curUser.id}
                          style={{ textDecoration: "none" }}

                        >

                              <img
                                src={curUser.avatar_url}
                                alt="Avatar"
                                className="searchimg"
                              />
                           
                          <br />
                          <br />
                          <h className="sname">
                            {" "}
                            {nameModify.length >= 8
                              ? `${nameModify}...`
                              : nameModify}
                          </h>
                        </NavLink>
                      </div>
                    
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div>
                  {users.map((curUser) => {
                    const nameModify = curUser.login.substring(0, 8);

                    return (
                      <div className="searchdiv">
                        <div className="subsearchdiv">
                          <NavLink
                            to={`/Detail/${curUser.id}`}
                            key={curUser.id}
                            style={{ textDecoration: "none" }}
                          >
                            <img
                              src={isLoading ? <Loading /> : curUser.avatar_url}
                              alt="Avatar"
                              className="searchimg"
                            />
                            <br />
                            <br />
                            <h className="sname">
                              {" "}
                              {nameModify.length >= 8
                                ? `${nameModify}...`
                                : nameModify}
                            </h>{" "}
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="tagdiv">
            <h className='tag'>Develope and Design By Younus @ All Rights Reserved</h>
          </div>
        </section>
      </>
    </>
  );
};

export default Home;
