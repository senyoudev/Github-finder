import React from "react";
import UserItem from "./userItem";
import Spinner from '../layouts/Spinner'

const Users = ({users,loading})=>{
  
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
  
}

const userStyle = {
  display: "grid",
  gridGap: "1rem",
  gridTemplateColumns: "repeat(3,1fr)"
};

export default Users;
