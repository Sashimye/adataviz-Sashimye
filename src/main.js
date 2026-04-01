// Afficher les cartes de toilettes

function displayCards(results) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    results.forEach((toilette) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <h2>${toilette.adresse}</h2>
        <p>📍 ${toilette.arrondissement} - ${toilette.horaire}</p>
        <div class="extra" style="display: none;">
            
        </div>
        <button class="see-more">Voir plus</button>
    `;

        const button = card.querySelector(".see-more");
        const extra = card.querySelector(".extra");

        button.addEventListener("click", () => {
            if (extra.style.display === "none") {
                extra.style.display = "block";
                button.textContent = "Voir moins";
            } else {
                extra.style.display = "none";
                button.textContent = "Voir plus";
            }
        });

        app.appendChild(card);
    });
}

function fetchToilettes(searchTerm = "") {
    const searchQuery = searchTerm
        ? `&where=adresse+like+"%25${searchTerm}%25"+or+arrondissement+like+"%25${searchTerm}%25"`
        : "";

    fetch(
        `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sanisettesparis/records?limit=100&refine=statut%3A%22En%20service%22${searchQuery}`,
    )
        .then((response) => response.json())
        .then((data) => displayCards(data.results))
        .catch((error) => console.log(error));
}

// Initial load
fetchToilettes();

// Search on button click
document.querySelector(".search-bar button").addEventListener("click", () => {
    const searchTerm = document.querySelector(".search-bar input").value;
    fetchToilettes(searchTerm);
});

// Search on Enter key
document.querySelector(".search-bar input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchToilettes(e.target.value);
    }
});
