import React, { createContext, ReactNode, useState } from "react";

type UserStatus = {
  email: string,
  name: string,
  image: string,
}

type UserContextProps = {
  userStatus: UserStatus | null,
  setUserStatus: (userStatus: UserStatus | null) => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {

  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);

  return (
    <UserContext.Provider
      value={{ userStatus, setUserStatus }}
    >
      {children}
    </UserContext.Provider>
  );
}