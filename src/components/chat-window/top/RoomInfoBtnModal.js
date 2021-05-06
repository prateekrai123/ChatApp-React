/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useRooms } from '../../../context/rooms.context';
import { useModalState } from '../../../misc/custom-hooks';

const RoomInfoBtnModal = () => {
  const { isOpen, open, close } = useModalState();

  const description = useCurrentRoom(v => v.description);

  const name = useCurrentRoom(v => v.name);

  let id = 0;

  const { chatId } = useParams();

  const rooms = useRooms();

  rooms.map(v => {
    if (v.id === chatId) {
      id = v.uid;
    }
    return 0;
  });

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room Information
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
          <h6 className="mb-1">ID</h6>
          <p>{id}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(RoomInfoBtnModal);
