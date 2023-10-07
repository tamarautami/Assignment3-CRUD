const xhr = new XMLHttpRequest();
const url = "http://localhost:3004/data";
const result = document.getElementById("result");

// Untuk Get All
function getData() {
  xhr.onerror = function () {
    alert("error");
  };

  xhr.onloadstart = function () {
    result.innerHTML = "Start";
  };

  xhr.onloadend = function () {
    result.innerHTML = "";
    const data = JSON.parse(this.response);
    for (let i = 0; i < data.length; i++) {
      const node = document.createElement("div");
      node.innerHTML = `
                <div class="card mb-3 text-bg-dark" style="width: 18rem;">
                    <img src="${data[i].image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Title : ${data[i].title}</h5>
                        <h5 class="card-text">Price: ${data[i].price}</h5>
                        <button onclick="deleteData(${data[i].id})" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                        <button onclick="putData(${data[i].id})" class="btn btn-danger"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="detailData(${data[i].id})" class="btn btn-danger"><i class="fa-solid fa-eye"></i></button>
                    </div>
                </div>
            `;
      result.appendChild(node);
    }
  };

  xhr.onprogress = function () {
    result.innerHTML = "Loading";
  };

  xhr.open("GET", url);
  xhr.send();
}


// untuk POST atau tambah data
function postData(event) {
  event.preventDefault();
  const data = JSON.stringify({
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    descriptions: document.getElementById("descriptions").value,
    category: document.getElementById("category").value,
    image: document.getElementById("image").value,
  });

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    console.log(this.responseText);
  };

  xhr.send(data);
}

// untuk Get Detail dari Id atau menampilkan salah satu data
function detailData(id) {
  xhr.onerror = function () {
    alert("error");
  };

  xhr.onloadstart = function () {
    result.innerHTML = "Start";
  };

  xhr.onloadend = function () {
    const data = JSON.parse(this.response);
    const modal = document.getElementById("resultModal");
    modal.innerHTML = `
        <div class="card mb-3 text-bg-dark justify-content-center">
        <img src="${data.image}" class="card-img-top" alt="..." style = "width: 100%">
        <h5 class="card-title">Title : ${data.title}</h5>
        <h5 class="card-text">Price: ${data.price}</h5>
        <h5 class="card-text">Description: ${data.description}</h5>
        <h5 class="card-text">Category: ${data.category}</h5>
        </div>
    </div>
        `;

    const modalId = document.getElementById("detailModal");
    const openModal = new bootstrap.Modal(modalId);
    openModal.show();
  };

  xhr.onprogress = function () {
    result.innerHTML = "Loading";
  };

  xhr.open("GET", url + `/${id}`);
  xhr.onload = function () {
    console.log(this.responseText);
  };
  xhr.send();
}

// Untuk PUT Data atau mengubah data disini baru mebgisi formnya saja
function putData(id) {
  xhr.onerror = function () {
    alert("error");
  };

  xhr.onloadstart = function () {
    result.innerHTML = "Start";
  };

  xhr.onloadend = function () {
    const data = JSON.parse(this.response);
    const modal = document.getElementById("resultUpdate");
    modal.innerHTML = `
        <form id="formModal""
        <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="titleModal" value="${data.title}" required>
        </div>
        <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input type="text" class="form-control" id="priceModal" value="${data.price}" required>
        </div>
        <div class="mb-3">
        <label for="descriptions" class="form-label">Descriptions</label>
        <input type="text" class="form-control" id="descriptionsModal" value="${data.description}" required>
        </div>
        <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <input type="text" class="form-control" id="categoryModal" value="${data.category}" required>
        </div>
        <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input type="text" class="form-control" id="imageModal" value="${data.image}" required>
        </div>
        <div class="d-grid justify-content-end">
        <button type="button" onclick="saveUpdateData(${data.id})" class="btn btn-primary">Save Update</button>
        </div>
        </form>   
        `;

    const modalId = document.getElementById("updateModal");
    const openModal = new bootstrap.Modal(modalId);
    openModal.show();
  };

  xhr.onprogress = function () {
    result.innerHTML = "Loading";
  };

  xhr.open("GET", url + `/${id}`);
  xhr.send();
}

// sambungan dari PUT Data atau mengubah data disini untuk menyimpan hasil perubahannya
function saveUpdateData(id){
    const data = JSON.stringify({
    title: document.getElementById("titleModal").value,
    price: document.getElementById("priceModal").value,
    descriptions: document.getElementById("descriptionsModal").value,
    category: document.getElementById("categoryModal").value,
    image: document.getElementById("imageModal").value,
  });

  xhr.open("PUT", url + `/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    console.log(this.responseText);
  };

  xhr.send(data);
}

// untuk Delete Data atau menghapus data
function deleteData(id) {
  xhr.open("DELETE", url + `/${id}`);
  xhr.send();
}
