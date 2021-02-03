import ListView from '../../../components/pokemon/ListView'
import Layout from '../../../components/Layout'
import { getPokemonDetails } from '../../../helpers/request-helpers'
import Styles from '../../../styles/List.module.css'
import Pagination from 'react-bootstrap/Pagination'

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
		const last = index < paginationHrefs.length ? paginationHrefs[paginationHrefs.length - 1] : null // last page
		const next = index < paginationHrefs.length ? paginationHrefs[index + 1] : null// get the next page link
		const previous = index >= 1 ? paginationHrefs[index - 1] : null // get the previous page

    const items = []
    
		if (previous) {
			first.display = '<<'
      previous.display = '<'
      items.push(first)
			items.push(previous)
    }
    if(next){
      next.display = '>'
      last.display = '>>'
      items.push(next)
      items.push(last)
    }

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
			</main>
			<div className={Styles.pagination_container}>
				<Pagination className={'mx-auto text-center'}>
					{paginationComponents(props.currentPage)}
				</Pagination>
			</div>
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
    console.log(firstData)
		const pageCount = Math.floor(firstData.count / 20)

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
