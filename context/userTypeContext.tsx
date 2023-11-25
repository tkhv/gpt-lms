"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface userType {
  isTA: boolean;
  setIsTA: Dispatch<SetStateAction<boolean>>;
}

const UserTypeContext = createContext<userType>({
  isTA: false,
  setIsTA: (): boolean => false,
});

export const UserTypeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTA, setIsTA] = useState(false);

  return (
    <UserTypeContext.Provider value={{ isTA, setIsTA }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserTypeContext = () => useContext(UserTypeContext);
