import * as actions from "../store/actions";

export default (dispatch) => {
  const ws = new WebSocket(
    `ws://${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/ws/`
  );
  ws.onopen = () => {
    console.log("WS connected");
  };
  ws.onclose = () => {
    dispatch(actions.setWs(null));
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
