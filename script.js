const apiEndpoints = "https://randomuser.me/api?results=10";

let userList = [];

const slider = document.getElementById("myslider");

slider.addEventListener("change", (e) => {
  const { value } = e.target;
  const label = document.getElementById("label");

  if (value > 70) {
    label.textContent = "";
    displayApp();
  } else {
    label.textContent = "Slide To Unlock";
  }
});

const displayApp = () => {
  document.querySelector(".homescreen").remove();
  document.querySelector(".appScreen").style.display = "block";
};

const displayContactScreen = () => {
  document.querySelector(".appScreen").remove();

  document.querySelector(".contactList").style.display = "block";

  fetchUsers(apiEndpoints);
};

const fetchUsers = async (url) => {
  //  fetch the users using async await

  const response = await fetch(url);
  const data = await response.json();
  userList = data.results;
  console.log(userList);
  document.querySelector(".spinner").style.display = "none";

  displayContactList(userList);
};

// hide the spinner

// display contact lists

const displayContactList = (userList) => {
  document.getElementById("list").style.display = "block";

  let str = "";

  userList.map((item, i) => {
    str += `
   <div class="accordion-item mt-2">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#${i}"
                      aria-expanded="false"
                      aria-controls="${i}"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="50px"
                        class="rounded-circle"
                      />

                      <div class="ms-3">
                        <div class="fw-bolder">${item.name.first} ${item.name.last} </div>
                        <small>${item.location.city} ${item.location.country}</small>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="${i}"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body d-flex flex-column align-items-center"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="150px"
                        class="rounded-circle"
                      />

                      <div>
                        <div class="fw-bolder">
                          <i class="bi bi-person-circle"></i>
                          ${item.name.first} ${item.name.last}
                        </div>
                        <div>
                          <a href="tel:${item.phone}"
                            ><i class="bi bi-phone"></i>${item.phone}</a
                          >
                        </div>
                        <div>
                          <a href="mailto:${item.email}"
                            ><i class="bi bi-envelope"></i>${item.email}</a
                          >
                        </div>
                        <div>
                          <a
                            href="${item.location.city} ${item.location.country}"
                            target="_blank"
                            ><i class="bi bi-geo-alt"></i> ${item.location.city} ${item.location.country}</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;

    document.getElementById("userCount").innerText = userList.length;
  });

  document.getElementById("userAccordion").innerHTML = str;
};

// Search Contacts

document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  console.log(value);

  const filteredUsers = userList.filter((item) => {
    const name = item.name.first + "" + item.name.last;

    return name.includes(value);
  });
  displayContactList(filteredUsers);
});
