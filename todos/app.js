const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const connect = require("./schemas/connect");
const pageRouter = require("./routes/page");

const app = express();

// Web Server 세팅
const port = 3000;
app.set("port", process.env.PORT || port);
// 템플릿 설정
app.set("view engine", "njk"); // nunjucks 사용

// nunjucks 세팅
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 데이터베이스 연결
connect();

// 미들웨어 연결 (==filter)
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public"))); //static 파일 경로
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", pageRouter);

// (404 오류) 없는 경로 요청시
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 에러처리 미들웨어 호출
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(500 || err.status);
  res.render("common/error"); //common 폴더 안에 error.njk
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
