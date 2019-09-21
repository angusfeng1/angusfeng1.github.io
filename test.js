function test() {
    const pokeList = document.querySelector("#pokeList");
    console.log(pokeList);

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }

    for (let i = 1; i <= 10; i++) {
        let url =  `https://pokeapi.co/api/v2/pokemon/${i}/`;
        fetch(url, options)
            .then(response => response.json())
            .then(JSON => {
                const pokemon =  document.createElement("li");
                pokemon.innerText = JSON.name;

                pokeList.appendChild(pokemon);
                //console.log(pokemon);
            });
    }
}

test();

/*
const token = sessionStorage.getItem("token");
let url = `${API_URL}/post/public`;
if (token !== null) {
    url = `${API_URL}/user/feed?p=${p}&n=${n}`;
}

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
    }
}

fetch(url, options)
    .then(response => response.json())
    .then(JSON => {
        console.log(JSON);
    }
});

*/