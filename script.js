// Obtengo los datos desde la API: "Fake Coffee API"
const fetchCoffees = () => {
  fetch('https://fake-coffee-api.vercel.app/api')
    .then((response) => {
      if (!response.ok) throw new Error('Error fetching los datos de cafés')
      return response.json()
    })
    .then((data) => { showCoffees(data) })
    .catch((error) => { console.error('Error fetching los datos de cafés:', error) })
}

// Ejecuto la función para obtener los datos cuando la página cargue
window.onload = fetchCoffees

// Muestro los productos de café en la web
const showCoffees = (coffees) => {
  const coffeeList = document.getElementById('coffee-list')

  coffees.forEach(
    ({ name, description, price, region, weight, flavor_profile, grind_option, roast_level, image_url }) => {
      // Convierto los arrays en una cadena de texto, separando los elementos por comas
      const flavorProfile = flavor_profile.join(', ')
      const grindOptions = grind_option.join(', ')
      
      // Genero el nivel de tostado con emojis de 🔥
      const roastLevelEmoji = generateRoastLevel(roast_level) 

      const coffeeCard = `
        <div class="col-md-4 p-3">
          <div class="card">
            <img src="${image_url}" class="card-img-top" alt="${name}">
            <div class="card-body">
              <h3 class="card-title text-center mx-3">${name}</h5>
              <p class="card-text mx-3 description">${description}</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Precio:</strong> U$S ${price.toFixed(2)}</li>
                <li class="list-group-item"><strong>Región:</strong> ${region}</li>
                <li class="list-group-item"><strong>Peso:</strong> ${weight}g</li>
                <li class="list-group-item"><strong>Perfil de sabor:</strong> ${flavorProfile}</li>
                <li class="list-group-item"><strong>Opciones de molienda:</strong> ${grindOptions}</li>
                <li class="list-group-item"><strong>Nivel de tostado:</strong> ${roastLevelEmoji}</li>
              </ul>
            </div>
          </div>
        </div>
      `

      coffeeList.innerHTML += coffeeCard
    }
  )
}

// Función para generar el nivel de tostado en emojis
const generateRoastLevel = (roastLevel) => {
  const emoji = '🔥'
  return emoji.repeat(roastLevel) // Repito el emoji tantas veces como sea el roast_level
}

// Función para cargar el ícono SVG logo de la página para no estorbar en el index.html
const loadCoffeeIcon = () => {
  const coffeeIcon = document.getElementById('coffee-icon')

  if (coffeeIcon) {
    coffeeIcon.insertAdjacentHTML(
      'afterbegin',
      `
        <svg class="me-3" width="48" height="48" viewBox="0 0 24 24">
          <g fill="none" stroke="#ffd66b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9c0 1.66 -1.34 3 -3 3h-6c-1.66 0 -3 -1.34 -3 -3v-9Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0" />
            </path>
            <path stroke-dasharray="14" stroke-dashoffset="14" d="M17 9h3c0.55 0 1 0.45 1 1v3c0 0.55 -0.45 1 -1 1h-3">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0" />
            </path>
            <mask id="lineMdCoffeeLoop0">
              <path stroke="#ffd66b" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4">
                <animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite" />
              </path>
            </mask>
            <rect width="24" height="0" y="7" fill="#ffd66b" mask="url(#lineMdCoffeeLoop0)">
              <animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2" />
              <animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5" />
            </rect>
          </g>
        </svg>
      `
    )
  }
}

// Cargo el SVG al cargar la página
document.addEventListener('DOMContentLoaded', loadCoffeeIcon)
