const indicados = document.getElementById("indicados");

const apiURL = "http://localhost:3001/filmes";

let edition = false;
let idEdition = 0;

let nome = document.getElementById("nome");
let imgURL = document.getElementById("imgURL");
let genero = document.getElementById("genero");
let nota = document.getElementById("notas");
let pesquisar = document.getElementById("pesquisar");

const getFilmes = async () => {
  const res = await fetch(apiURL);

  const filmes = await res.json();

  console.log(filmes);

  filmes.map((filme) => {
    indicados.insertAdjacentHTML(
      "beforeend",
      `

    <div class="card mb-3 " style="max-width: 540px;">

      <div class="row g-0">

        <div class="col-md-4">
          <img src="${filme.imgURL}" class="img-fluid rounded-start" alt="...">
        </div>

        <div class="col-md-8">

          <div class="card-body">
            <h5 class="card-title">${filme.nome}</h5>
            <span class="badge bg-dark">${filme.genero}</span>
            <p class="card-text">NOTA: <span class="badge bg-dark">${filme.nota}</span></p>
            <button onclick="editarFilmes('${filme._id}')" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">editar</button>
            <button onclick="deleteFilmes('${filme._id}')" class="btn btn-outline-danger">excluir</button>
          </div>

        </div>

      </div>

    </div>

    `
    );
  });
};

const submitForm = async (event) => {
  event.preventDefault();

  const filme = {
    nome: nome.value,
    imgURL: imgURL.value,
    genero: genero.value,
    nota: parseInt(nota.value)
  };

  if (edition) {
    editFilme(filme, idEdition);
  } else {
    createFilme(filme);
  }

  limparCampos();
  indicados.innerHTML = "";
};

const createFilme = async (filme) => {
  const req = new Request(`${apiURL}/adicionar`, {
    method: "POST",
    body: JSON.stringify(filme),
    headers: new Headers({
      "Content-Type": "application/json",
    })
  })

  const res = await fetch(req);
  const result = await res.json();

  alert(result.message);

  getFilmes();

};

const putFilme = async (filme,_id) => {

  const req = new Request(`${apiURL}/editar/${_id}`,{
    method: "PUT",
    body: JSON.stringify(filme),
    headers: new Headers({
      'Content-Type':'application/json'
    })
  })

  const res = await fetch(req);

  const result = await res.json();
  alert(result.message);
  edition = false;
  idEdition = 0;
  getFilmes();

};

const deleteFilmes = async (_id) => {
  const req = new Request(`${apiURL}/deletar/${_id}`, {
    method: "DELETE",
  });

  const res = await fetch(req);
  const result = await res.json();

  alert(result.message);
  indicados.innerHTML = "";
  getFilmes();
};

const getFilmeById = async (_id) => {
  const res = await fetch(`${apiURL}/${_id}`);
  return await res.json();
};

const editarFilmes = async (_id) => {
  edition = true;
  idEdition = _id;

  const filme = await getFilmesById(_id);

  nome.value = filme.nome;
  imgURL.value = filme.imgURL;
  genero.value = filme.genero;
  nota.value = filme.nota;
}

const limparCampos = () => {
  nome.value = "";
  imgURL.value = "";
  genero.value = "";
  nota.value = "";
};

getFilmes();

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
