const formatDate = (date: Date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} ${String(
    date.getSeconds()
  ).padStart(2, "0")}.${String(date.getMilliseconds()).padStart(3, "0")}`;

export type PokemonData = {
  id: string;
  number: string;
  name: string;
  image: string;
  fetchedAt: string;
  attacks: {
    special: Array<{ name: string; type: string; damage: number }>;
  };
};

export async function fetchPokemon(name: string) {
  const pokemonQuery = `
      query PokemonInfo($name: String) {
        pokemon(name: $name) {
          id
          number
          name
          image
          attacks {
            special {
              name
              type
              damage
            }
          }
        }
      }
    `;
  console.log(pokemonQuery);

  const response = await window.fetch("https://graphql-pokemon2.vercel.app/", {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      query: pokemonQuery,
      variables: { name: name.toLowerCase() },
    }),
  });

  type JSONResponse = {
    data?: {
      pokemon: PokemonData;
    };
    errors?: Array<{ message: string }>;
  };

  const { data, errors }: JSONResponse = await response.json();

  if (response.ok) {
    const pokemon = data?.pokemon;
    console.log(pokemon);
    if (pokemon) {
      Object.assign(pokemon, { fetchedAt: formatDate(new Date()) });
      console.log(pokemon);
      return Promise.resolve(pokemon);
    } else {
      return Promise.reject(new Error(`No pokemon with the name "${name}"`));
    }
  } else {
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    );
    return Promise.reject(error);
  }
}
