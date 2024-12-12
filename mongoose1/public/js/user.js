var axios = require("axios");

// 폼의 "등록" 버튼 누르면(submit)
// 폼 안에 작성한 내용 갖고오기
document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const age = form.age.value;
  const married = form.married.value;

  axios.get().then().catch();
});
