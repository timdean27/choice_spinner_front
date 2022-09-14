import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
const SingleChoice = (props) => {

    let { id } = useParams()
    const [choiceD, choiceID] = useState([])

  return (
    <div>SingleChoice ID={id}</div>
  )
}

export default SingleChoice