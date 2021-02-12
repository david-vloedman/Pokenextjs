import { useSelector, useDispatch } from 'react-redux'
import useSearchForm from '../../custom-hooks/useSearchForm'
import Button from '../../components/nes-css/Button'
import Input from '../../components/nes-css/Input'
import Field from '../../components/nes-css/Field'
import {variants} from '../../lib/nes-css-helpers'


export default function SearchForm({props}) {

	const { 
    form, 
    onChange, 
    onSubmit
  } = useSearchForm({ useSelector, useDispatch})
 
  console.log(form)
	return (
  
  <form>
    <Field isInline={true}>
      <label>Name</label>
      <Input 
      variant={form?.hasError ? variants.error : variants.normal}
      type='text' 
      name='pokemonName'
      value={form?.pokemonName}
      onChange={(e) => onChange(e)}
      />
    </Field>

    <div className="p-2">
      <Button label="Search" type='submit' onClick={(e) => onSubmit(e)} />
    </div>
  </form>
  )
}

