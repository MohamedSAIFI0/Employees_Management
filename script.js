//Mohamed SAIFI
// saifimsc@gmail.com

let nom = document.getElementById('nom');
let prenom = document.getElementById('prenom');
let cin = document.getElementById('cin');
let role = document.getElementById('role');
let submit = document.getElementById('submit');

let dataPersonnel = localStorage.getItem('personnel') ? JSON.parse(localStorage.getItem('personnel')) : [];
let mode = "create";
let tempIndex;

submit.addEventListener('click', function() {
    let personnel = {
        nom: nom.value,
        prenom: prenom.value,
        cin: cin.value,
        role: role.value
    };

    if (personnel.nom && personnel.prenom && personnel.cin && personnel.role) {
        if (mode === "create") {
            dataPersonnel.push(personnel);
        } else {
            dataPersonnel[tempIndex] = personnel;
            mode = "create";
            submit.innerText = "Ajouter";
        }

        localStorage.setItem('personnel', JSON.stringify(dataPersonnel));
        clearFields();
        showData();
    } else {
        alert("Veuillez remplir tous les champs !");
    }
});

function clearFields() {
    nom.value = '';
    prenom.value = '';
    cin.value = '';
    role.value = '';
}

function showData() {
    let table = '';
    dataPersonnel.forEach((person, index) => {
        table += `
        <tr>
            <td>${index + 1}</td>
            <td>${person.nom}</td>
            <td>${person.prenom}</td>
            <td>${person.cin}</td>
            <td>${person.role}</td>
            <td><button class="btn btn-warning" onclick="updateItem(${index})">Modifier</button></td>
            <td><button class="btn btn-danger" onclick="deleteItem(${index})">Supprimer</button></td>
        </tr>`;
    });
    document.getElementById('tbody').innerHTML = table;
}

function deleteItem(index) {
    dataPersonnel.splice(index, 1);
    localStorage.setItem('personnel', JSON.stringify(dataPersonnel));
    showData();
}

function updateItem(index) {
    let person = dataPersonnel[index];
    nom.value = person.nom;
    prenom.value = person.prenom;
    cin.value = person.cin;
    role.value = person.role;
    submit.innerText = "Mettre à jour";
    mode = "update";
    tempIndex = index;
}

// Recherche par Nom
document.getElementById('searchNom').addEventListener('click', function() {
    let searchValue = document.getElementById('search').value.toLowerCase();
    let filteredData = dataPersonnel.filter(person => person.nom.toLowerCase().includes(searchValue));
    displayFilteredData(filteredData);
});

// Recherche par CIN
document.getElementById('searchCIN').addEventListener('click', function() {
    let searchValue = document.getElementById('search').value.toLowerCase();
    let filteredData = dataPersonnel.filter(person => person.cin.toLowerCase().includes(searchValue));
    displayFilteredData(filteredData);
});

function displayFilteredData(data) {
    let table = '';
    data.forEach((person, index) => {
        table += `
        <tr>
            <td>${index + 1}</td>
            <td>${person.nom}</td>
            <td>${person.prenom}</td>
            <td>${person.cin}</td>
            <td>${person.role}</td>
            <td><button class="btn btn-warning" onclick="updateItem(${index})">Modifier</button></td>
            <td><button class="btn btn-danger" onclick="deleteItem(${index})">Supprimer</button></td>
        </tr>`;
    });
    document.getElementById('tbody').innerHTML = table;
}

showData();
