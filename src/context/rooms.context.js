/* eslint-disable arrow-body-style */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helper';
import { useProfile } from './profile.context';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  const { profile } = useProfile();

  useEffect(() => {
    const roomListRef = database.ref(`profile/${profile.uid}/rooms`);

    roomListRef.on('value', snap => {
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });

    return () => {
      roomListRef.off();
    };
  }, [profile]);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
