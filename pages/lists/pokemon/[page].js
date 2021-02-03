import ListView from '../../../components/pokemon/ListView'
import Layout from '../../../components/Layout'
import { getPokemonDetails } from '../../../helpers/request-helpers'
import Styles from '../../../styles/List.module.css'
import Pagination from 'react-bootstrap/Pagination'
import { ListItemSecondaryAction } from '@material-ui/core'

const POKEMON_ROOT = process.env.api.pokemon

export default function PokemonList(props) {
	const paginationHrefs = []
	const pageCountArr = new Array(props.pageCount)
	console.log(props)
	for (let i = 0; i < pageCountArr.length; i++) {
		const page = i + 1
		paginationHrefs.push({
			page: page,
			href: `/lists/pokemon/${page}`,
		})
	}

	const paginationComponents = (pageNumber) => {
		// get the pagination links that are going to be displayed
		const index = pageNumber - 1 // minus one to account for array index starting @ zero
		const first = paginationHrefs[0] // get the first page
		const last = paginationHrefs[paginationHrefs.length - 1] // last page
		const next = paginationHrefs[index + 1] // get the next page link
		const previous = index > 1 ? paginationHrefs[index - 1] : null // get the previous page

    if(previous !== null){
      first.display = '<<'
      previous.display = '<'
    }
    next.display = '>'
    last.display = '>>'
    
		const items = []
    console.log(items, "ITEMS");
    

    if (previous !== null) {
      items.push(first);
      items.push(previous)
    };
    items.push(next)
    items.push(last);
		
		

		return items.map((item) => (
			<Pagination.Item key={item.page} href={item.href} active={item.active}>
				{item.display}
			</Pagination.Item>
		))
	}

	return (
		<Layout>
			<main className={Styles.list_container}>
				<ListView props={props} />
				<Pagination>{paginationComponents(props.currentPage)}</Pagination>
			</main>
		</Layout>
	)
}

const createRequestURL = (root, offset, limit) =>
	`${root}?offset=${offset}&limit=${limit}`

export async function getServerSideProps(context) {
	const pageNumber = context.params.page

	let url

	if (pageNumber > 1) {
		const offset = 20 * parseInt(pageNumber)
		const limit = 20
		url = createRequestURL(POKEMON_ROOT, offset, limit)
	} else {
		url = `${POKEMON_ROOT}`
	}

	try {
		const res = await fetch(url)
		const firstData = await res.json()

		const pageCount = Math.ceil(firstData.count / 20)

		const pageData = await Promise.all(
			firstData.results.map(async (poke) => {
				return await getPokemonDetails(poke.url)
			})
		)

		return {
			props: {
				currentPage: pageNumber,
				pageCount: pageCount,
				results: Object.values(pageData),
			},
		}
	} catch (err) {
		console.log('not found')
		return {
			notFound: true,
		}
	}
}
