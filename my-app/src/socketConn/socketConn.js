import { io } from "socket.io-client";
import {
  updateCursorPosition,
  removeCursorPosition,
} from "../CursorOverlay/cursorSlice";
import { store } from "../store/store";
import { setElements, updateElement } from "../Whiteboard/whiteboardSlice";

let socket;

export const connectWithSocketServer = (roomID, userID) => {
  socket = io("http://localhost:3003");
  console.log(`room ID from connect to socket : : ${roomID} : : ${userID}`);

  socket.on("connect", () => {
    console.log("connected to socket.io server");
    socket.emit("join-room", { userID, roomID });
  });

  socket.on("whiteboard-state", (data) => {
    const { elements } = data;
    store.dispatch(setElements(elements)); // Set elements for the whiteboard
  });

  socket.on("element-update", (elementData) => {
    store.dispatch(updateElement(elementData)); // Update the whiteboard with new element
  });

  socket.on("whiteboard-clear", () => {
    store.dispatch(setElements([])); // Clear the whiteboard
  });

  socket.on("cursor-position", (cursorData) => {
    store.dispatch(updateCursorPosition(cursorData)); // Update cursor position
  });

  socket.on("user-disconnected", (disconnectedUserId) => {
    store.dispatch(removeCursorPosition(disconnectedUserId)); // Remove cursor for disconnected user
  });
};

export const emitElementUpdate = (elementData, roomID) => {
  socket.emit("element-update", {elementData, roomID});
};

export const emitClearWhiteboard = (roomID) => {
  socket.emit("whiteboard-clear", roomID);
};

export const emitCursorPosition = (cursorData, roomID) => {
  socket.emit("cursor-position", {cursorData, roomID});
};
