class User {
  constructor(name, mail, phone) {
    this.mail = mail;
    this.name = name;
    this.phone = phone;
  }
}
function getTodos() {
  return axios.get(
    `/api/users`
  );
}
function addTodo(appointment) {
  return axios.post(
    `/api/users,
    appointment`
  );
}
function removeTodo(id) {
  return axios.delete(`/api/users/${id}`);
}
function updateTodo(id, user) {
  return axios.put(`/api/users/${id}`, user);
}
function displayList() {
  getTodos().then((res) => {
    res.data.forEach((user) => {
      createUserLi(user);
    });
  });
}
async function deleteUser(mail) {
  let id;
  let users = await getTodos();
  users.data.forEach((user) => {
    if (user.mail === mail) {
      id = user._id;
    }
  });

  removeTodo(id).then((res) => {
    console.log("delete succesfully");
  });
}

function createUserLi(user) {
  let newLi = document.createElement("li");
  newLi.setAttribute("class", "list-group-item");

  let nameTextNode = document.createTextNode(user.name + "  ");
  let mailTextNode = document.createTextNode(user.mail + "  ");
  let phoneTextNode = document.createTextNode(user.phone);

  newLi.appendChild(mailTextNode);
  newLi.appendChild(nameTextNode);
  newLi.appendChild(phoneTextNode);

  // creating edit button to edit the data

  let edit_btn = document.createElement("button");
  edit_btn.setAttribute("class", "btn btn-sm btn-primary float-right edit");
  edit_btn.textContent = "+";

  newLi.appendChild(edit_btn);

  // creating delete button to delete the data
  let del_btn = document.createElement("button");
  del_btn.setAttribute("class", "btn btn-sm btn-danger float-right delete");
  del_btn.textContent = "X";

  newLi.appendChild(del_btn);

  const cont = document.querySelector(".li_container");
  cont.appendChild(newLi);
}
async function updateUser(mail) {
  let id;
  let u;
  let users = await getTodos();
  users.data.forEach((user) => {
    if (user.mail === mail) {
      u = user;
      id = user._id;
    }
  });
  document.getElementById("name").value = u.name;
  document.getElementById("email").value = u.mail;
  document.getElementById("phone").value = u.phone;
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    let newUser = new User(name, email, phone);
    updateTodo(id, newUser);
  });
}

window.addEventListener("DOMContentLoaded", (event) => {
  displayList();
  const frm = document.getElementById("form");

  // listening if submit button is clicked
  frm.addEventListener("submit", (e) => {
    e.preventDefault();

    //   fetching the details of form if submitted
    let name = document.getElementById("name").value;
    let mail = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    const user = new User(name, mail, phone);

    createUserLi(user);

    addTodo(user);
  });
  document.querySelector(".container").addEventListener("click", (e) => {
    let searchMail = e.target.parentElement.firstChild.textContent.trim();
    if (e.target.classList.contains("delete")) {
      deleteUser(searchMail);
      e.target.parentElement.remove();
    } else if (e.target.classList.contains("edit")) {
      updateUser(searchMail);
      e.target.parentElement.remove();
    }
  });
});
