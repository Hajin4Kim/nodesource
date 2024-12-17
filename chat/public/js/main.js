// Socket 을 통해 넘어오는 새room 정보를 출력

socket.on("newRoom", (data) => {
  console.log(data);
});
