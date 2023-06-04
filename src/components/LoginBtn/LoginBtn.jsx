import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function LoginBtn() {

  const { loginWithRedirect } = useAuth0();
  console.log(loginWithRedirect);

  return (
    <div onClick={() => loginWithRedirect()}>Login</div>
  )
}
