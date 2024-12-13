// var axios = require("axios");

// const { default: axios } = require("axios");

// const user = require("../../schemas/user");

// 전체 User 조회 함수
const getUsers = async () => {
  try {
    const response = await axios.get("/users");
    console.log(response.data);

    const users = response.data;

    let result = "";
    users.forEach((user) => {
      result += `<tr>`;
      result += `<th scope="row">${user._id}</th>`;
      result += `<td>${user.name}</td>`;
      result += `<td>${user.age}</td>`;
      result += `<td>${user.married ? "기혼" : "미혼"}</td>`;
      result += `</tr>`;
    });
    document.querySelector("#user-list tbody").innerHTML = result;
  } catch (error) {
    console.log(error);
  }
};

// 폼의 "등록" 버튼 누르면(submit)
// 폼 안에 작성한 내용 갖고오기
document.querySelector("#user-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const age = form.age.value;
  const married = form.married.checked;

  // 유효성 검증
  if (!name) {
    alert("이름을 확인해 주세요");
    return;
  }
  if (!age) {
    alert("나이를 확인해 주세요");
    return;
  }

  try {
    // 라우터 경로 (스프링이라면 controller 경로)
    await axios.post("/users", { name, age, married });

    // 전체 User 조회 함수 호출
    getUsers();
  } catch (error) {
    console.log("등록 실패: ", error);
  }

  // 폼 화면 clear
  form.name.value = "";
  form.age.value = "";
  form.married.checked = false;
});

// 특정 사용자의 전체 comments 가져오기
const getComments = async (id) => {
  try {
    const response = await axios.get(`/users/${id}/comments`);
    console.log(response.data);

    const comments = response.data;

    let result = "";
    comments.forEach((comment) => {
      result += `<tr data-commid=${comment._id} data-pid=${id}>`;
      result += `<th scope="row">${comment._id}</th>`;
      result += `<td>${comment.commenter.name}</td>`;
      result += `<td>${comment.comment}</td>`;
      result += `<td><button type='button' class='btn btn-success'>수정</button></td>`;
      result += `<td><button type='button' class='btn btn-danger'>삭제</button></td>`;
      result += `</tr>`;
    });
    document.querySelector("#comment-list tbody").innerHTML = result;
  } catch (error) {
    console.log(error);
  }
};

// 화면에서 "댓글등록" 누르면(submit)
// submit 기능 중지, 아이디-내용 들어왔는지 확인
document
  .querySelector("#comment-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const userid = form.userid.value;
    const comment = form.comment.value;

    // 유효성 검증
    if (!userid) {
      alert("아이디를 확인해 주세요");
      return;
    }
    if (!comment) {
      alert("내용을 확인해 주세요");
      return;
    }

    try {
      // 라우터 경로 (스프링이라면 controller 경로)
      await axios.post("/comments", { userid, comment });

      // 현재 댓글 작성자의 전체 comments 조회 함수 호출
      getComments(userid);
    } catch (error) {
      console.log("댓글 등록 실패: ", error);
    }

    // 폼 화면 clear
    form.userid.value = "";
    form.comment.value = "";
  });

// 화면에서 이름 클릭 시, 해당 이름이 작성한 전체 댓글 가져오기
document.querySelector("#user-list").addEventListener("click", (e) => {
  e.preventDefault();

  // userid 가져오기
  const id = e.target.getAttribute("href");
  getComments(id);
});

// 댓글 수정, 삭제
document.querySelector("#comment-list").addEventListener("click", async (e) => {
  // 이벤트 대상 가져오기
  const eTarget = e.target;

  // comment id 가져오기
  const commId = e.target.closest("tr").dataset.commid;

  // user id 가져오기
  const userId = e.target.closest("tr").dataset.pid;

  // 수정 ? 삭제 ? 어디에서 왔는지 구분
  if (eTarget.textContent === "수정") {
    // 수정할 comment 입력 받을 수 있는 prompt 보여주기
    const newComment = prompt("변경할 comment 를 입력해 주세요");
    if (!newComment) {
      return alert("변경할 comment를 반드시 입력해야 수정됩니다.");
    }

    try {
      await axios.put(`/comments/${commId}`, { comment: newComment });

      // 전체 댓글 reload
      getComments(userId);
    } catch (error) {
      console.log(error);
    }
  } else {
    //삭제 시 comment id 필요

    try {
      await axios.delete(`/comments/${commId}`);

      // 전체 댓글 reload
      getComments(userId);
    } catch (error) {
      console.log(error);
    }
  }
});
