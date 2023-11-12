import React from 'react';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';

import MyBooks from './MyBooks';

const UserProfile = () => {
  const user = useUser();

  if (user) {
    return (
      <div>

        <MyBooks />
        
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserProfile;
