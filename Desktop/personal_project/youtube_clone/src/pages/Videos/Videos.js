import { useParams } from "react-router-dom"

export const Videos = () => {
    const {keyword} = useParams() //get from url
    return <div>Videos/{`${keyword ? keyword : ""}`}</div>
}