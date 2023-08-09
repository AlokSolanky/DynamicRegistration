window.onload = () =>
{
  fetchAppointments();

  document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // Make an Axios POST request to add the appointment

  axios
    .post("/api/appointments", { name:name,email:email, phone:phone })
    .then((response) => {

      // console.log(response.data);
      const {id} = response.data;
      const newLi = document.createElement("li");
      newLi.setAttribute("class", "list-group-item");
      newLi.setAttribute("data-id", id);

      let nameTextNode = document.createTextNode(name + "  ");
      let mailTextNode = document.createTextNode(email + "  ");
      let phoneTextNode = document.createTextNode(phone);

      newLi.appendChild(nameTextNode);
      newLi.appendChild(mailTextNode);
      newLi.appendChild(phoneTextNode);

      let edit_btn = document.createElement("button");
      edit_btn.setAttribute("class", "btn btn-sm btn-primary float-right edit");
      edit_btn.textContent = "+";

      // edit_btn.setAttribute("href", `/${id}`);

      newLi.appendChild(edit_btn);

      edit_btn.addEventListener("click", () => {
        editLi(id);
      });

      let del_btn = document.createElement("button");
      del_btn.setAttribute("class", "btn btn-sm btn-danger float-right delete");
      del_btn.textContent = "X";

      newLi.appendChild(del_btn);
  
      
      del_btn.addEventListener("click", () => {
        deleteLi(id);
      });
      
      document.querySelector('.li_container').appendChild(newLi);
}).catch(err=>
  {
    console.log(err);
  })
});
}
function fetchAppointments()
{
  axios
    .get("/api/appointments")
    .then((response) => {
      const appointments = response.data;
      const cont = document.querySelector(".li_container");
      appointments.forEach((appointment) => {
        const { id, name, email, phone } = appointment;
        let newLi = document.createElement("li");
        newLi.setAttribute("class", "list-group-item");
        newLi.setAttribute("data-id", id);

        let nameTextNode = document.createTextNode(name + "  ");
        let mailTextNode = document.createTextNode(email + "  ");
        let phoneTextNode = document.createTextNode(phone);

        newLi.appendChild(nameTextNode);
        newLi.appendChild(mailTextNode);
        newLi.appendChild(phoneTextNode);

        let edit_btn = document.createElement("a");
        edit_btn.setAttribute(
          "class",
          "btn btn-sm btn-primary float-right edit"
        );
        // edit_btn.setAttribute('href',`/${id}`);
        edit_btn.textContent = "+";

        newLi.appendChild(edit_btn);

        edit_btn.addEventListener("click", () => {
          editLi(id);
        });

        let del_btn = document.createElement("button");
        del_btn.setAttribute(
          "class",
          "btn btn-sm btn-danger float-right delete"
        );
        del_btn.textContent = "X";

        newLi.appendChild(del_btn);

        del_btn.addEventListener("click", () => {
          deleteLi(id);
        });
        cont.appendChild(newLi);
      });
    })
    .catch((error) => console.error(error));
  }

function deleteLi(id) {
  const appointmentEntry = document.querySelector(`[data-id="${id}"]`);
  appointmentEntry.remove();
  axios
    .delete(`/api/appointments/${id}`)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));
}
function editLi(id)
{
  const appointmentEntry = document.querySelector(`[data-id="${id}"]`);
  appointmentEntry.remove();
  
  window.location.href = `/edit.html?id=${id}`;
}

