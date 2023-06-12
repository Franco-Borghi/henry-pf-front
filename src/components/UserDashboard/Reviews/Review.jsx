import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Review.module.scss"
import CreateOrEditReview from "./CreateOrEditReview";
import axios from "axios";

export default function Review ({orders, user}){

    const allMotorcycles = useSelector(state => state.allMotorcycles)
    const [motorcyclesList, setMotorcyclesList] = useState([])
    const [userReviews, setUserReviews] = useState([])

    useEffect(() => {
        const auxIds = [];
        orders?.forEach(o => {
            if(o.orderStatus === "Delivered"){o?.items.forEach(i => {
                if(!auxIds.includes(i.motorcycleId)) auxIds.push(i.motorcycleId)
            })}
        })
        setMotorcyclesList(allMotorcycles.filter(m => auxIds.includes(m.id)))


        axios.get(`${process.env.REACT_APP_HOST_NAME}/reviews/users/${user?.sub}`)
        .then(d => setUserReviews(d.data))
        .catch(err => console.log(err))

    }, [orders])

    return <>
    {motorcyclesList.length === 0 ? <div><h3>No orders made/delivered</h3></div> :
        <table className={styles['order-details-table']}>
            <thead>
                <tr className={styles['order-item-row']}>
                <th>Motorcycle</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Review</th>
                </tr>
            </thead>
            <tbody>
                {motorcyclesList?.map((item) => {
                    return <CreateOrEditReview item={item} userReviews={userReviews}/>}
                )}
            </tbody>
            </table>
}
    </>
}