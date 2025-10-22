/* import React from 'react';

function User(props) {
  return (
    <div>
      <h2>User Information</h2>
      <p>Username: {props.uname}</p>
      <p>Category: {props.category}</p>
    </div>
  );
}

export default User;
*/
import React from 'react';

function User() {
  // Hardcoded values for username and category
  const uname = "JohnDoe";
  const category = "Admin";

  return (
    <div>
      <h2>User Information</h2>
      <p>Username: {uname}</p>
      <p>Category: {category}</p>
    </div>
  );
}

export default User;
