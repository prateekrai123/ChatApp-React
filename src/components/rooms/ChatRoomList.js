/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Nav } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { useRooms } from '../../context/rooms.context';
import { database } from '../../misc/firebase';
import { transformToArrWithId } from '../../misc/helper';
import RoomItem from './RoomItem';

const ChatRoomList = ({ aboveElHeight }) => {
  const roomsMain = useRooms();
  const location = useLocation();
  const { profile } = useProfile();
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    let roomProf = [];
    const roomListRef = database.ref(`profiles/${profile.uid}/rooms`);

    roomListRef.on('value', snap => {
      const data = transformToArrWithId(snap.val());
      roomProf = data;
    });

    const roomData = [];

    const pushRoom = room => {
      roomData.push(room);
    };

    const runMap = async () => {
      try {
        for (let i = 0; i < roomsMain.length; i++) {
          for (let j = 0; j < roomProf.length; j++) {
            if (roomsMain[i].uid === roomProf[j].uid) {
              pushRoom(roomsMain[i]);
              break;
            }
            console.log(roomsMain[i].id + roomProf[j].id);
          }
        }
      } catch (error) {
        console.log();
      }
    };

    runMap();

    setRooms(roomData);

    return () => {
      roomListRef.off();
    };
  }, [profile, roomsMain]);

  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${room.id}`}
            key={room.id}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default ChatRoomList;
