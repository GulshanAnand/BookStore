document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("show");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  // Your code to run since DOM is loaded and ready


});

google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
// google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows([
    ["Mushrooms", 3],
    ["Onions", 1],
    ["Olives", 1],
    ["Zucchini", 1],
    ["Pepperoni", 2],
  ]);

  // Set chart options
  var options = {
    title: "How Much Pizza I Ate Last Night",
    width: 400,
    height: 300,
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

function getBookComp() {
  return `
        <div class="height-100 bg-light">
            <h4>Add Book</h4>
            <div class="container-add">
                <form id="addbookform" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="title">Book Title</label>
                        <input type="text" class="form-control" name="title" id="title" placeholder="Book Title" required>
                    </div>
                    <div class="form-group">
                        <label for="author">Author</label>
                        <input type="text" class="form-control" name="author" id="author" placeholder="Author" required>
                    </div>
                    <div class="form-group">
                        <label for="pub">Publication</label>
                        <input type="text" class="form-control" name="publisher" id="publisher" placeholder="Publication" required>
                    </div>
                    <div class="form-group">
                        <label for="mrp">MRP</label>
                        <input type="number" class="form-control" name="mrp" id="mrp" placeholder="MRP" required>
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" class="form-control" name="price" id="price" placeholder="Price" required>
                    </div>
                    <div class="form-group">
                        <label for="quantity">Quantity</label>
                        <input type="number" class="form-control" name="quantity" id="quantity" placeholder="Quantity" required>
                    </div>
                    <input type="file" name="image" accept="image/*" id ="idimage" required>

                    <div class="form-group divcenter">
                        <button class="btn btn-primary btn-submit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function getStaffComp() {
  return `
        <div class="height-100 bg-light">
            <h4>Add Staff</h4>
            <div class="container-add">
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" name="name" id="name" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" class="form-control" name="email" id="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="number" class="form-control" name="phone" id="phone" placeholder="Phone Number">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea type="text" class="form-control txtarea" name="address" id="address" placeholder="Address"></textarea>
                    </div>
                    <div class="form-group divcenter">
                        <input class="btn btn-primary btn-submit" type="submit" value="Submit">
                    </div>
                </form>
            </div>
        </div>
    `;
}

function getStatsComp() {
  return `
        <div id="chart_div"></div>
    `;
}

const contentDiv = document.getElementById("main-content");
const addBookDiv = document.getElementById("add_book");
const addAllBooksDiv = document.getElementById("all_books");
// const addStaffDiv = document.getElementById("add_staff");
// const statsDiv = document.getElementById("stats");
const logoutButton = document.getElementById("logout");
document.addEventListener("DOMContentLoaded", function (event) {
  
addAllBooksDiv.addEventListener("click", async function (event) {
  event.preventDefault();
  const newdiv = ` <div class="container flex">
      <div class="row" id="bookListContainer"></div>
    </div>`;
    contentDiv.innerHTML = newdiv;
  
  // contentDiv.innerHTML = getAllBooksComp();
    await fetch("/manage/listallbooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((bookList) => {
        // console.log(bookList);
        const bookListContainer = document.getElementById("bookListContainer");

        // Loop through the book data and create cards for each book
        for (const bookData of bookList) {
          const cardDiv = document.createElement("div");
          cardDiv.className = "col-sm-6 col-md-4 col-lg-3 card-img-top";

          const card = document.createElement("div");
          card.className = "card mx-1 my-1 p-1 bg-light";

          const cardBody = document.createElement("div");
          cardBody.className = "card-body";

          const titleElement = document.createElement("h5");
          titleElement.className = "card-title mb-1";
          titleElement.textContent = bookData.title;

          const authorElement = document.createElement("p");
          authorElement.className = "card-text text-muted mb-1";
          authorElement.textContent = bookData.author;

          const publicationYearElement = document.createElement("p");
          publicationYearElement.className = "card-text text-muted mb-2";
          publicationYearElement.textContent = `Publication : ${bookData.publisher}`;

          const priceElement = document.createElement("h6");
          priceElement.className = "card-subtitle mb-2 text-primary";
          priceElement.textContent = `$ ${bookData.price}`;

          const buttonElement = document.createElement("button");
          buttonElement.className = "btn btn-outline-primary btn-sm";
          if(bookData.available) buttonElement.innerHTML = "Disable";
          else buttonElement.innerHTML = "Enable";

          buttonElement.addEventListener("click", async (event) => {
            const fdata = {
              _id: bookData._id
            };
            const status = buttonElement.innerHTML;
            await fetch("/manage/toggle", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(fdata), // JSON.stringify the data
            }).then((res) => {
              if (res.status === 200) {
                return res.json(); // Parse the response JSON
              } else {
                alert("Failed to toggle availability");
              }
            }).then((data) => {
              // Handle the response data if needed
              // console.log(data);
            }).catch((error) => {
              console.error("Error:", error);
            });            
            if(status == "Enable"){
              buttonElement.innerHTML = "Disable";
            }
            else{
              buttonElement.innerHTML = "Enable";
            }
          });

          cardBody.appendChild(titleElement);
          cardBody.appendChild(authorElement);
          cardBody.appendChild(publicationYearElement);
          cardBody.appendChild(priceElement);
          cardBody.appendChild(buttonElement);
          card.appendChild(cardBody);

          cardDiv.appendChild(card);

          bookListContainer.appendChild(cardDiv);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  });
});


addBookDiv.addEventListener("click", function (event) {
  event.preventDefault();
  contentDiv.innerHTML = getBookComp();
  var form = document.getElementById("addbookform");
// Add a submit event listener to the form
  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting normally

      // Create a FormData object to collect form data
      var formData = new FormData(form);

      // Send a fetch request to the server
      fetch("/manage/addbook", {
          method: "POST",
          body: formData
      })
      .then(response => {
        if(response.status === 200) return response.json();
        else console.error("Error: " + response.status);
      }) // Assuming the response is JSON
      .then(data => {
          // You can now access the response data in the 'data' variable
          // console.log(data);
          alert("Book added successfully");
          window.location.href = "./manager.html";
          // Here, you can write code to handle the response data as needed
      })
      .catch(error => {
          console.error("Error:", error);
      });
  });
});

// addStaffDiv.addEventListener("click", function (event) {
//   event.preventDefault();
//   contentDiv.innerHTML = getStaffComp();
// });

// statsDiv.addEventListener("click", function (event) {
//   event.preventDefault();
//   contentDiv.innerHTML = getStatsComp();
//   drawChart();
// });

logoutButton.addEventListener("click", function (event) {
  event.preventDefault();
  try {
    deleteCookie("token");
    deleteCookie("userID");
    window.location.href = "../index.html";
  } catch (error) {
    console.error("Error: ", error);
  }
});