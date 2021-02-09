/* eslint-disable arrow-body-style */
import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ childern }) => {
  const [profile] = useState(false);
  return (
    <ProfileContext.Provider value={profile}>
      {childern}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  useContext(ProfileContext);
};
