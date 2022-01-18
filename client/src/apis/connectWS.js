import * as actions from "../store/actions";

const connectWS = (dispatch) => {
  const ws = new WebSocket(
    `ws://${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/ws/`
  );
  ws.onopen = () => {
    console.log("WS connected");
  };
  ws.onclose = () => {
    setTimeout(() => {
      dispatch(actions.setWs(null));
    }, 500);

    console.log(`WebSocket closed`);
  };
  // ws.onmessage = (e) => {
  //   console.log("WS message:");
  //   console.log(e);
  //   return false;
  // };
  return ws;
};

export const isReady = (ws) => {
  return new Promise((resolve, reject) => {
    const maxNumberOfAttempts = 50;

    let count = 0;
    const interval = setInterval(() => {
      if (count >= maxNumberOfAttempts) {
        clearInterval(interval);
        reject(new Error("Maximum number of attempts reached"));
      } else if (ws.readyState === WebSocket.OPEN) {
        clearInterval(interval);
        resolve();
      }
      count++;
    }, 200);
  });
};

export default async (
  ws,
  dispatch,
  messageHandler,
  startMessage = {},
  endMessage = {}
) => {
  if (ws === null) {
    // Connect the websocket
    dispatch(actions.setWs(connectWS(dispatch)));
  } else {
    // Setup the websocket message handler
    ws.onmessage = messageHandler;
    // Wait for the WS to be open
    if (ws.readyState !== WebSocket.OPEN) {
      try {
        await isReady(ws);
        // Send a message
        // console.log("M sent");
        ws.send(JSON.stringify(startMessage));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Send a message
      // console.log("M sent");
      ws.send(JSON.stringify(startMessage));
    }
  }
  return async () => {
    if (ws !== null) {
      if (ws.readyState !== WebSocket.OPEN) {
        try {
          await isReady(ws);
          // Send a message
          // console.log("M not sent");
          ws.send(JSON.stringify(endMessage));
        } catch (e) {
          console.error(e);
        }
      } else {
        // Send a message
        // console.log("M not sent");
        ws.send(JSON.stringify(endMessage));
      }
    }
  };
};
