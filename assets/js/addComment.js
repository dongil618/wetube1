import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li); //prepend는 객체를 앞에 추가해주는 것
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment: comment //comment는 text고 handleSubmit으로 부터 보내진것.
    }
  });
  if (response.status === 200) {
    addComment(comment); //이 댓글이 데이터베이스에 추가되면 addComment하겠다는 의미
  }
};

const handleSubmit = event => {
  event.preventDefault(); //event를 막아주는 코드 이유는 새로고침 되길 원하지 않기 때문
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit); //폼을 submit하면, handleSubmit을 호출하는 코드
}

if (addCommentForm) {
  init();
}
