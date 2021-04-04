/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';
import { Alert, Button, Container, Input } from 'rsuite';
import { useProfile } from '../context/profile.context';
import { useRooms } from '../context/rooms.context';
import { database } from '../misc/firebase';

const JoinChatRoomBtn = () => {
  const [id, setId] = useState('');
  const { profile } = useProfile();
  const rooms = useRooms();

  const onIdInputChange = useCallback(value => {
    setId(value);
  }, []);

  const onJoinClick = async () => {
    try {
      await rooms.map(v => {
        console.log(v.id);
        if (v.uid === id) {
          database.ref(`profiles/${profile.uid}/rooms`).push(v);
        }
        return 0;
      });
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  return (
    <Container>
      <div className="mt-3">
        <Input
          placeholder="Chatroom Id"
          onChange={onIdInputChange}
          value={id}
        />
        <br />
        <Button block color="green" onClick={onJoinClick}>
          Join Chat
        </Button>
      </div>
    </Container>
  );
};

export default JoinChatRoomBtn;
