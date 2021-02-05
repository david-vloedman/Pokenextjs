import Layout from '../components/Layout'
import Link from 'next/link'
import useRequest from '../custom-hooks/useRequest'

const testPokemon = {
	id: 12,
	name: 'butterfree',
	img:
		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png',
	height: 11,
	weight: 320,
	moves: [{ name: 'flash' }],
}


const Test = () => {
	const {error, data, isPending} = useRequest('https://pokeapi.co/api/v2/contest-type/');
	if(error){
		return <p>Error</p>
	}
	if(isPending){
		return <p>Loading...</p>
	}
	return <p>{JSON.stringify(data)}</p>
}


export default function Home(props) {
	return (
		<Layout>
			<h1>Welcome to PokenextJs</h1>
			<p>This project was created in order to learn some of the features of NextJS.</p>
			<h2>Some routes until navigation is setup</h2>
			<ul>
				<li>
					<Link href={'/lists/pokemon/1'}>/links/pokemon/1</Link>
					<p>
						Shows a paginated list of all Pokemon in the PokeAPI. It uses a dynamic route where 1 is the page.
						It shows a 'PokemonCard' for each pokemon and dynamically renders the background image based on the habitat of the Pokemon.
					</p>
				</li>
			</ul>

			<Test />
		</Layout>
	)
}



