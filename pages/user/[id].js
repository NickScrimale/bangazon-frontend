import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserById } from '../../utils/data/userData';
import UserCard from '../../components/user/UserCard';

export default function ViewUser() {
  const [viewUsers, setViewUser] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.warn(viewUsers.firstName);

  useEffect(() => {
    getUserById(id).then(setViewUser);
  }, [id]);

  return (
    <div className="view-card">
      <UserCard
        key={viewUsers}
        // userCardObj={getUserById}
        id={viewUsers.id}
        firstName={viewUsers.firstName}
        lastName={viewUsers.lastName}
        uid={viewUsers.uid}
        createdOn={viewUsers.createdOn}
        imageUrl={viewUsers.imageUrl}
        onUpdate={getUserById}
      />
    </div>
  );
}
