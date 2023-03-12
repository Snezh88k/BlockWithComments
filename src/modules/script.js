import deleteIcon from "../image/delete.svg";
import likeFalseIcon from "../image/likeFalse.svg";
import likeTrueIcon from "../image/likeTrue.svg";

const createCommentObj = (id, name, comment, like, date) => ({
  id,
  name,
  comment,
  like,
  date,
});

const form = document.querySelector(".form");
const comment = document.getElementById("entering_comment");
const name = document.getElementById("name");
const dateInput = document.getElementById("date");

let lastId = 0;
const arrayСomments = [];

const deleteComment = (e) => {
  const commentDiv = e.target.closest(".comment");

  const commentId = commentDiv.dataset.id;
  commentDiv.remove();

  const commentIndex = arrayСomments.find(
    (comment) => comment.id === commentId
  );
  arrayСomments.splice(commentIndex, 1);
};

const likeComment = (elem, btn) => {
  if (elem.like) {
    elem.like = false;
    btn.innerHTML = `<img src="${likeFalseIcon}"/>`;
  } else {
    elem.like = true;
    btn.innerHTML = `<img src="${likeTrueIcon}"/>`;
  }
};

const isPostCreated = () => {
  let now = new Date();

  let dayOfMonth = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = now.getMinutes();

  month = month < 10 ? "0" + month : month;
  dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let today = new Date(year, month, dayOfMonth);
  let customDate = new Date(dateInput.value);

  customDate.setHours(customDate.getHours() - 3);

  let diff = now - today; // разница в миллисекундах
  let diffTom = now - customDate;

  let differentToday = Math.round(diff / 1000);
  let differentCastomDate = Math.round(diffTom / 1000);
  // console.log(Math.round(diffTom / 1000)); //получаем секунды до выставленной даты
  // console.log(Math.round(diff / 1000)); // получаем секунды от начала суток
  if (differentCastomDate - differentToday === 86400) {
    // Вчера
    return `Вчера ${hour}:${minutes}`;
  } else if (
    // Сегодня
    (differentCastomDate < 86400 && differentCastomDate > 0) ||
    !differentCastomDate
  ) {
    return `Сегодня ${hour}:${minutes}`;
  } else {
    // Другая дата
    return `${dateInput.value} ${hour}:${minutes}`;
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  lastId += 1;

  const com = createCommentObj(
    lastId,
    name.value,
    comment.value,
    false,
    isPostCreated()
  );

  arrayСomments.push(com);

  let newCommenBlock = document.createElement("div");
  let topLine = document.createElement("div");
  let bottomLine = document.createElement("div");

  newCommenBlock.dataset.id = lastId;
  newCommenBlock.setAttribute("id", `comment-${lastId}`);
  newCommenBlock.classList.add("comment");

  let textComment = document.createElement("span");
  let authorСomment = document.createElement("div");
  let deleteCommentButton = document.createElement("span");
  let likeCommentButton = document.createElement("span");
  let dateComment = document.createElement("div");

  authorСomment.classList.add("authorComment");
  textComment.classList.add("textComment");

  textComment.innerHTML = com.comment;
  authorСomment.innerHTML = com.name;
  dateComment.innerHTML = com.date;
  deleteCommentButton.innerHTML = `<img src="${deleteIcon}"/>`;
  likeCommentButton.innerHTML = `<img src="${likeFalseIcon}"/>`;

  const currentDiv = document.getElementById("comments");
  currentDiv.appendChild(newCommenBlock);

  newCommenBlock.appendChild(topLine);
  newCommenBlock.appendChild(textComment);
  newCommenBlock.appendChild(bottomLine);

  topLine.appendChild(authorСomment);
  topLine.appendChild(deleteCommentButton);
  bottomLine.appendChild(dateComment);
  bottomLine.appendChild(likeCommentButton);

  deleteCommentButton.addEventListener("click", deleteComment);
  likeCommentButton.addEventListener("click", () =>
    likeComment(com, likeCommentButton)
  );

  comment.value = "";
  name.value = "";
});
