//  onclick="hello()"
// const hello = () => {
//   let dateControl = document.querySelector('input[type="date"]');
//   console.log(dateControl.value); // prints "2017-06-01"
// };

// function CommentObj(id, name, comment, data) {
//   this.id = id;
//   this.name = name;
//   this.comment = comment;
// }

const createCommentObj = (id, name, comment, date, like) => ({
  id,
  name,
  comment,
  date,
  like,
});

const form = document.querySelector(".form");
const comment = document.getElementById("entering_comment");
const name = document.getElementById("name");
const date = document.getElementById("date");

let = lastId = 0;
const arrayСomments = [];

const deleteComment = (e) => {
  const commentDiv = e.target.closest(".comment");
  console.log(commentDiv.dataset.id);
  const commentId = commentDiv.dataset.id;
  commentDiv.remove();

  const commentIndex = arrayСomments.find(
    (comment) => comment.id === commentId
  );
  arrayСomments.splice(commentIndex, 1);
  console.log(arrayСomments);
};

const likeComment = (elem, btn) => {
  if (elem.like) {
    elem.like = false;
    btn.innerHTML = '<img src="./image/likeFalse.svg"/>';
  } else {
    elem.like = true;
    btn.innerHTML = '<img src="./image/likeTrue.svg"/>';
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  lastId += 1;

  const com = createCommentObj(
    lastId,
    name.value,
    comment.value,
    new Date(),
    (like = false)
  );
  arrayСomments.push(com);

  let newDiv = document.createElement("div");
  let topLine = document.createElement("div");

  newDiv.dataset.id = lastId;
  newDiv.setAttribute("id", `comment-${lastId}`);
  newDiv.classList.add("comment");

  let textComment = document.createElement("div");
  let authorСomment = document.createElement("div");
  let deleteCommentButton = document.createElement("span");
  let likeCommentButton = document.createElement("span");
  let dateComment = document.createElement("div");

  authorСomment.classList.add("authorComment");
  textComment.classList.add("textComment");

  const commentDate = `${com.date.getMonth() + 1}+${com.date.getDate()}`;

  textComment.innerHTML = com.comment;
  authorСomment.innerHTML = com.name;
  dateComment.innerHTML = commentDate;
  deleteCommentButton.innerHTML = '<img src="./image/delete.svg"/>';
  likeCommentButton.innerHTML = '<img src="./image/likeFalse.svg"/>';

  const currentDiv = document.getElementById("comments");
  currentDiv.appendChild(newDiv);

  newDiv.appendChild(topLine);

  newDiv.appendChild(textComment);
  topLine.appendChild(authorСomment);
  topLine.appendChild(deleteCommentButton);
  newDiv.appendChild(dateComment);
  newDiv.appendChild(likeCommentButton);

  deleteCommentButton.addEventListener("click", deleteComment);
  likeCommentButton.addEventListener("click", () =>
    likeComment(com, likeCommentButton)
  );

  console.log(arrayСomments);
  comment.value = "";
  name.value = "";
});
