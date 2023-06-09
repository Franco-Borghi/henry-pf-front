import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function LoginBtn() {

  const { loginWithRedirect } = useAuth0();

  return (
    <div onClick={() => loginWithRedirect()}>Login</div>
  )
}
