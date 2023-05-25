import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function LogoutBtn() {

  const { logout } = useAuth0();

  return (
    <div onClick={() => logout()}>Logout</div>
  )
}
