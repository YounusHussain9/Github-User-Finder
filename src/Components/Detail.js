import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { specUsers, defaultUser } from "../Actions/Action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


const Detail = () => {
  const { id } = useParams();
  const [isError, setisError] = useState({ show: false, Message: "" });
  const [isLoading, setisLoading] = useState(true);
  const API = `https://api.github.com/user/${id}`;
  const [users, setUsers] = useState();
  const dispatch = useDispatch();
   const [repo , setRepo] = useState([])
   const [followers , setFollowers] = useState([])

   
   const fetchUser = async (url) => {
    try {
      const fetchUsers = await fetch(url);
      const response = await fetchUsers.json();

      const repoReq = await fetch(response.repos_url);
      const repoRes = await repoReq.json()

const follReq = await fetch (response.followers_url);
const follRes = await follReq.json();

      if(response){
        setisLoading(false)
        toast.success('Fetched Successfuly')
      setUsers(response)
      setRepo(repoRes)
      setFollowers(follRes)
      {dispatch(specUsers(response))}
      } else {
        setisLoading(true);
        setisError({ show: true, Message: response.message });
      toast.error(isError.Message)
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
        <Loading /> <span className="Loadingtxt">Data Fetching...</span>
      </div>
    );
  }


  return (
    <div>
<ToastContainer />
      <h>Detail{id}</h>
      <section>
        <div className="Headdiv">
          <div className="Imgdiv">
            {" "}
            <img src={`${users.avatar_url}`} alt="Image" className="Image" />
          </div>

          <div className="Txtdiv">
            <h1 className="name"> {users.name} </h1>
            <br/>
            <h className="bio"> {users.bio}</h>
            <br/>
            <h className="location">{users.location ? `${users.location}`: "----"}</h>
            <br/>
            <h className="blog">{users.blog ? `${users.blog}`: "----"}</h>
            <br />
            <br />
            

            <div className="InHead">
              <div className="followerdiv">
                <span className="followersp">{users.followers ? `${users.followers}`: "0"}</span>
                <h className="followerh">Follower</h>
              </div>
              <div className="followingdiv">
                <span className="followingsp">{users.following ? `${users.following}`: "0"}</span>
                <h className="followingh">Following</h>
              </div>
              <div className="reposdiv">
                <span className="repossp">{users.public_repos ? `${users.public_repos}` : "0"}</span>
                <h className="reposh">Repos</h>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="Middle">
          <div className="Repository">
            <h2 className="h2">Repositories</h2>
            <div>

{repo.map((repo)=>(
            <ul>
            <li className="List">
              <div>
                <h1 className="Lh"><a href={repo.html_url} style={{textDecoration:'none'}}>{repo.name ? `${repo.name}` : 'no-name'}</a></h1>
                <p className="Lp">{repo.description ? `${repo.description}` : 'no-description'}</p>
                <br />
              </div>
              <div className="InnerList">
                <div>
                  <h className="Lh1">Created {moment(repo.created_at).format('ll')}</h>
                </div>
                <div>
                  <h className="Lh2">Updated {moment(repo.updated_at).format('ll')}</h>
                </div>
              </div>
              <hr />
            </li>
          </ul>
))}


  
            </div>
          </div>
          <div className="Following"><h2 className="h2">Followers</h2>

{followers.length > 0 ? <>
{followers.map((follower)=>(
<div>
<ul className="flist">
    <img src={follower.avatar_url}  alt="icon" className="fi"/>
    <li ><a href={follower.html_url} style={{textDecoration:'none'}}><h className="fLh">{follower.login}</h></a></li>
  </ul>
</div>
))}

</> :<>
<h style={{color:'white'}}>No Follower</h>
</>}


            </div>
        </div>

      </section>
    </div>
  );
};

export default Detail;
