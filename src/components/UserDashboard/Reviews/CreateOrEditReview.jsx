import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import styles from "./Review.module.scss"
import Stars from "./Stars";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

export default function CreateOrEditReview ({item, userReviews}){

    const [addReview, setAddReview] = useState(false)
    const [inputs, setInputs] = useState({[`rating-${item.id}`]: 0, comment: ""})
    const reduxUser = useSelector(state => state.user);
    const [existingReview, setExisitngReview] = useState(false)
    const mySwal = withReactContent(Swal);


    useEffect(() => {
        if (userReviews?.some(r => r.motorcycleId === item.id)) {
          setInputs({
            [`rating-${item.id}`]: userReviews?.find(r => r.motorcycleId === item.id).rating,
            comment: userReviews?.find(r => r.motorcycleId === item.id).comment
          });
          setExisitngReview(true)
        }
      }, [item?.id, userReviews]);

    const handleRatingChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: name === `rating-${item.id}` ? Number(value) : value }));
      };

    const handleRatingSubmit = (reviewId) => {
        if(inputs[`rating-${item.id}`] !== 0){
            if(!reviewId){
                axios.post(`${process.env.REACT_APP_HOST_NAME}/reviews/`, {...inputs, rating: inputs[`rating-${item.id}`], motorcycleId: item.id, userId:reduxUser?.id})
                .then(d => {
                    setInputs({[`rating-${item.id}`]: d.data.rating, comment: d.data.comment})
                    mySwal.fire({
                        html: <strong>Review Submitted!</strong>,
                        icon: "success",
                      })
                    setExisitngReview(true)
                })
                .catch(err => mySwal.fire({
                    html: <strong>Something happened, try again!</strong>,
                    icon: "error",
                  }))
            }else{
                axios.put(`${process.env.REACT_APP_HOST_NAME}/reviews/${reviewId}`, {...inputs, rating: inputs[`rating-${item.id}`], motorcycleId: item.id, userId:reduxUser?.id})
                .then(d => {
                    setInputs({[`rating-${item.id}`]: d.data.rating, comment: d.data.comment})
                    mySwal.fire({
                        html: <strong>Review Changed!</strong>,
                        icon: "success",
                      })
                })
                .catch(err => mySwal.fire({
                    html: <strong>Something happened, try again!</strong>,
                    icon: "error",
                  }))
            }
        }
           setAddReview(false)
    }

    return (
            <tr className={styles['order-item-row']}>
                <td>{item?.brand} {item?.model} {item?.year}</td>
                {!addReview ? 
                (existingReview ? 
                <>
                <td><Stars inputs={inputs} item={item} /></td>
                <td><p>{inputs.comment}</p></td>
                <td><button onClick={() => setAddReview(true)} type="button">Update</button></td>
                </>
                : <>
                <td></td>
                <td></td>
                <td><button onClick={() => setAddReview(true)} type="button">Add</button></td>
                </>)
                : (!existingReview ? (<>
                <td><Stars inputs={inputs} item={item} handleRatingChange={handleRatingChange} /></td>
                    <td><textarea name="comment" cols="30" rows="10" value={inputs.comment} onChange={handleRatingChange}></textarea></td>
                    <td><button onClick={() => handleRatingSubmit()} type="button">Add</button></td> 
                    </>)
                    : (<>
                    <td><Stars inputs={inputs} item={item} handleRatingChange={handleRatingChange} /></td>
                    <td><textarea name="comment" cols="30" rows="10" value={inputs.comment} onChange={handleRatingChange}></textarea></td>
                    <td><button onClick={() => handleRatingSubmit(userReviews.find(r => r.motorcycleId === item.id).id)} type="button">Update</button></td>
                    </>))}
            </tr>
    )
}