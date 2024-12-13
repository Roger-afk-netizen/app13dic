import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

interface Pokemon {
  name: string;
  url: string;
}

interface LoaderData {
  pokemon: Pokemon[];
  nextPage: number;
  previousPage: number | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  return json<LoaderData>({
    pokemon: data.results,
    nextPage: page + 1,
    previousPage: page > 1 ? page - 1 : null,
  });
};

export default function PokemonList() {
  const { pokemon, nextPage, previousPage } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {pokemon.map((p) => (
          <li key={p.name}>
            <a href={`/pokemon/${p.name}`}>{p.name}</a>
          </li>
        ))}
      </ul>
      <div>
        {previousPage && (
          <a href={`/?page=${previousPage}`}>
            <button>Previous</button>
          </a>
        )}
        {nextPage && (
          <a href={`/?page=${nextPage}`}>
            <button>Next</button>
          </a>
        )}
      </div>
    </div>
  );
}
