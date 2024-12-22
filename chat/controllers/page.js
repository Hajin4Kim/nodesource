const Room = require("../schema/room");
const Chat = require("../schema/chat");
const { removeRoom : removeRoomService } = require("../services");

exports.renderMain = async (req, res, next) => {
  try {
    // 전체 채팅방 목록 추출
    const rooms = await Room.find({});
    res.render("main", {rooms:rooms});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      password: req.body.password,
      owner: req.session.color,
    });

    // 새로 생성된 방 정보를 접속된 모든 클라이언트에게 알리기(실시간)
    const io = req.app.get("io");
    io.of("/room").emit("newRoom", newRoom);

    // 방을 직접 개설한 owner는 바로 방으로 입장
    if(req.body.password){
      res.redirect(`/room/${newRoom._id}?password${req.body.password}`);
    }else{
      res.redirect(`/room/${newRoom._id}`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.enterRoom = async (req, res, next) => {
  try {

    // id 와 일치하는 방 찾기
    const room = await Room.findOne({ _id: req.params.id }); //TODO: 주소줄에 따라오는건 params
    if (!room) {
      return res.redirect("./?error=존재하지 않는 방 입니다.");
    }
    // password 가져와서 일치하는지 확인 (DB와 비교)
    if (room.password && room.password != req.query.password) { //TODO: ? 로 따라오는건 query
      return res.redirect("./?error=비밀번호가 틀렸습니니다.");
    }
    // 같은 방 안에 존재하는 사람들에게 새로운 입장,퇴장 인원 알리기
    const io = req.app.get("io");
    // chat 과 연결된 room socket 가져오기
    const {rooms} = io.of("/chat").adapter;
    // 인원 초과 여부 확인
    if (room.max <= rooms.get(req.params.id)?.size) {
      return res.redirect("./error=허용 인원을 초과하였습니다")
    }

    res.render("chat", {
      room:room,
      title:room.title,
      chats:[],
      user: req.session.color,

    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.removeRoom = async (req, res, next) => {
  try {
    // service 호출
    await removeRoomService(req.params._id);
    res.send("삭제 완료");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.sendChat = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.sendImg = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
