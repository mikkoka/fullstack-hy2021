// import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux' 

const FilterInput = (props) => {

  // const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    //dispatch(setFilter(event.target.value.toLowerCase()))  
    props.setFilter(event.target.value.toLowerCase())
  }

  return ( 
    <div>   

      filter <input onChange={handleFilterChange}/>

    </div>  
    )
}


export default connect(
  null,
  { setFilter }
)(FilterInput)

// export default FilterInput