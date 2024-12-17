// HTML5의 웹소켓 기능 사용

// ws 모듈 불러오기
const WebSocket = require("ws");

module.exports = (server) => {
  // express 서버와 ws 서버 연동
  const wss = new WebSocket.Server({ server });

  // 이벤트 리스너 추가
  wss.on("connection", (ws, req) => {
    // 클라이언트 ip 알아내기
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("새로운 클라이언트 접속");

    // 클라이언트로부터 메세지가 도착하면 발생
    ws.on("message", (message) => {
      console.log(message.toString());
    });

    // 웹소켓 연결 중 에러 발생 시
    ws.on("error", (error) => {
      console.log(error);
    });

    // 클라이언트와 연결이 종료 된 경우
    ws.on("close", () => {
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });

    // 3sec 마다 연결된 모든 클라이언트에게 메세지 전송 (실시간)
    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send("서버에서 클라이언트로 메세지 보내기");
      }
    }, 3000);
  });
};
