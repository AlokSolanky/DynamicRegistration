function getTodos() {
  return axios.get(
    `https://crudcrud.com/api/d80733b2e3404af8b6d3c2874fcdb944/appointements`
  );
}
function addTodo(appointment) {
  return axios.post(
    `https://crudcrud.com/api/d80733b2e3404af8b6d3c2874fcdb944/appointements`,
    appointment
  );
}
function displayList() {
  getTodos().then((res) => {
    res.data.forEach((user) => {
      createUserLi(user);
    });
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

window.addEventListener("DOMContentLoaded", (event) => {
  displayList();
  const frm = document.getElementById("form");
  class User {
    constructor(name, mail, phone) {
      this.mail = mail;
      this.name = name;
      this.phone = phone;
    }
  }

  
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
});
