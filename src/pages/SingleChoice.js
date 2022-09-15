import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";

const SingleChoice = (props) => {

    let { id } = useParams()
    const [choice, setChoice] = useState(null)

    useEffect(() => {grabChoice()},[id])

    const grabChoice = () => {
        const REACT_APP_DATABASE_URL_DJANGO = process.env.REACT_APP_DATABASE_URL_DJANGO+id;
        // const loginEndpoint = "gfoods_view_protected/";
        console.log(REACT_APP_DATABASE_URL_DJANGO)
        const headers = {
          headers: {
            "Content-Type": "application/json",
            //   'Authorization': `Bearer ${accessToken}`,
          },
        };
    
        axios.get(REACT_APP_DATABASE_URL_DJANGO, headers).then((res) => {
          console.log("data insisde DjGfood fetch", res.data);
          setChoice(res.data);
        });
      };


  return (
    <div>SingleChoice ID={id}</div>
  )
}

export default SingleChoice