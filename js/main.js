
// ! data start
let users = [
  {
    name: "User 1",
    password: "pass123",
    age: 30,
    isLogin: false,
  },
  {
    name: "User 2",
    password: "pass124",
    age: 33,
    isLogin: false,
  },
  {
    name: "User 3",
    password: "pass125",
    age: 21,
    isLogin: false,
  },
  {
    name: "User 4",
    password: "pass126",
    age: 56,
    isLogin: false,
  },
  {
    name: "User 5",
    password: "pass127",
    age: 42,
    isLogin: false,
  },
  {
    name: "User 6",
    password: "pass128",
    age: 13,
    isLogin: false,
  },
  {
    name: "User 7",
    password: "pass129",
    age: 29,
    isLogin: false,
  },
  {
    name: "User 8",
    password: "pass130",
    age: 53,
    isLogin: false,
  },
  {
    name: "User 9",
    password: "pass131",
    age: 18,
    isLogin: false,
  },
  {
    name: "User 10",
    password: "pass132",
    age: 48,
    isLogin: false,
  },
];
let posts = [
  {
    id: 1,
    title: "Post 1",
    user: "User 3",
    likes: 34,
  },
  {
    id: 2,
    title: "Post 2",
    user: "User 4",
    likes: 58,
  },
  {
    id: 3,
    title: "Post 3",
    user: "User 6",
    likes: 90,
  },
  {
    id: 4,
    title: "Post 4",
    user: "User 2",
    likes: 2,
  },
  {
    id: 5,
    title: "Post 5",
    user: "User 3",
    likes: 128,
  },
  {
    id: 6,
    title: "Post 6",
    user: "User 1",
    likes: 743,
  },
  {
    id: 7,
    title: "Post 7",
    user: "User 8",
    likes: 9,
  },
  {
    id: 8,
    title: "Post 8",
    user: "User 10",
    likes: 90,
  },
  {
    id: 9,
    title: "Post 9",
    user: "User 4",
    likes: 73,
  },
  {
    id: 10,
    title: "Post 10",
    user: "User 2",
    likes: 581,
  },
];
// !data end

//! users scripts start

let inSystem = "";
function changeInSystemUser(userName = "") {
  inSystem = userName;
  h3 = document.querySelector("h3");
  inSystem
    ? (h3.innerText = `User: ${inSystem} in system`)
    : (h3.innerText = "No user in system");
  return;
}

//! register

function checkUniqueUserName(userName) {
  return users.some((item) => item.name === userName);
}

function checkPasswords(pass, passConfirm) {
  return pass === passConfirm;
}

function createUser() {
  let userName = prompt("Enter username");
  if (checkUniqueUserName(userName)) {
    alert("User already exists!");
    return;
  }
  let pass = prompt("Enter password");
  let passConfirm = prompt("Enter password confirmation");
  if (!checkPasswords(pass, passConfirm)) {
    alert("Passwords don't match!");
    return;
  }
  let age = +prompt("Enter age");
  let userObj = {
    name: userName,
    password: pass,
    age: age,
    isLogin: false,
  };
  users.push(userObj);
}

//! login

function getUserObj(userName) {
  return users.find((item) => item.name === userName);
}

function checkUserPassword(userName, pass) {
  let user = getUserObj(userName);
  return user.password === pass;
}
function loginUser() {
  let userName = prompt("Enter username");
  if (!checkUniqueUserName(userName)) {
    alert("User not found!");
    return;
  }
  uName = userName;
  let pass = prompt("Enter password");
  if (!checkUserPassword(userName, pass)) {
    alert("Password doesn't match this account!");
    return;
  }
  let user = getUserObj(userName);
  user.isLogin = true;
  changeInSystemUser(userName);
}
//!logout

function logoutUser() {
  if (!inSystem) {
    alert("Only authorized users can logout!");
    return;
  }
  let user = getUserObj(inSystem);
  user.isLogin = false;
  changeInSystemUser();
}

//! users scripts end

//!post scripts logic start

function createPost() {
  if (!inSystem) {
    alert("Only authorized users can create posts!");
    return;
  }
  let postTitle = prompt("Enter post title");
  let postObj = {
    id: Date.now(),
    title: postTitle,
    user: inSystem,
    likes: 0,
  };
  posts.push(postObj);
  readPost();
}
//!post scripts logic end

//!updatepost

function getPostObj(id) {
  return posts.find((item) => item.id == id);
}
function checkOwnerPost(id) {
  let postObj = getPostObj(id);
  return postObj && postObj.user === inSystem;
}
function updatePost() {
  if (!inSystem) {
    alert("Only authorized users can create posts!");
    return;
  }
  let postId = +prompt("Enter post id");
  if (!checkOwnerPost(postId)) {
    alert("There is no post with this id or you are not auhor of such a post");
    return;
  }
  let postObj = getPostObj(postId);
  let newPostData = prompt("Enter new post data");
  postObj.title = newPostData;
  readPost();
}
function deletePost() {
  if (!inSystem) {
    alert("Only authorized users can delete posts!");
    return;
  }

  let postId = +prompt("Enter post id");

  if (!checkOwnerPost(postId)) {
    alert(
      "There is no post with this id or you are not the author of this post!"
    );
    return;
  }

  posts = posts.filter((item) => item.id !== postId);
  readPost();
}
//!updatepost end

//!delete post start

//!read posts

function readPost() {
  let list = document.querySelector("ul");
  list.innerHTML = "";
  for (let i of posts) {
    list.innerHTML += `<li>Post content : ${i.title}; post id: ${i.id}; likes: ${i.likes}</li>`;
  }
}
//!post cripts logic end (read post too)

//!comment scripts start

function checkCommentKey(obj) {
  return Object.keys(obj).some((item) => item == "comments");
}

function addComment() {
  if (!inSystem) {
    alert("Only authorized users can create comment");
    return;
  }
  let postId = +prompt("Enter post id");
  let postObj = getPostObj(postId);
  if (!postObj) {
    alert("Post not found!");
    return;
  }
  let commentContent = prompt("Enter comment content");
  let commentObj = {
    id: "comm-" + Date.now(),
    content: commentContent,
    user: inSystem,
  };
  if (checkCommentKey(postObj)) {
    postObj.comments.push(commentObj);
  } else {
    postObj.comments = [commentObj];
  }
}

function getCommentObject(id, commid) {
  let postObj = getPostObj(id);
  return postObj.comments.find((item) => item.id === commid); //вернет объект, если нет, то undefined
}

function checkOwnerComment(id, commid) {
  let commObj = getCommentObject(id, commid);
  return commObj.user === inSystem; //true true
}
function deleteComment() {
  if (!inSystem) {
    alert("Only authorized users can delete comment");
    return;
  }

  let postId = +prompt("Enter postID:");

  let commentId = prompt("Enter commentID:");

  let postObj = getPostObj(postId);

  if (!postObj) {
    return alert("Post is not found");
  }

  let commentObj = getCommentObject(postId, commentId);
  if (!checkOwnerComment(postId, commentId)) {
    alert("There is no this post or you are not the author of this comment!");
    return;
  }

  postObj.comments = postObj.comments.filter((item) => item.id !== commentId);

  console.log(posts);
  return postObj.comments;
}

//!comment scripts end

//! like scripts start
function addLike() {
  if (!inSystem) {
    alert("Only authorized users can likes post!");
    return;
  }
  let likeId = +prompt("Enter post ID to like");
  let postLike = posts.find((item) => item.id === likeId);

  //dislike
  if (postLike.nameLikes?.includes(inSystem)) {
    postLike.nameLikes.splice(postLike.nameLikes.indexOf(inSystem), 1);
    postLike.likes -= 1;
    readPost();
    return;
  }

  if (postLike) {
    postLike.likes += 1;
    postLike.nameLikes
      ? postLike.nameLikes.push(inSystem)
      : (postLike.nameLikes = [inSystem]);
  }

  console.log(posts);
  readPost();
  return;
}

//! like scipts end

console.log(posts);