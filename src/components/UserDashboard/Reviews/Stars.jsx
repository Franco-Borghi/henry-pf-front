import styles from "./Review.module.scss"

export default function Stars({inputs, handleRatingChange, item}){
    if(!handleRatingChange){
        return <div className={styles.reviewContainer}>
        <input type="radio" id={`star5-${item.id}`} name={`rating-${item.id}`} value="5" checked={inputs[`rating-${item.id}`] === 5} disabled/>
        <label htmlFor={`star5-${item.id}`} title="text">5 stars</label>
        <input type="radio" id={`star4-${item.id}`} name={`rating-${item.id}`} value="4" checked={inputs[`rating-${item.id}`] === 4} disabled/>
        <label htmlFor={`star4-${item.id}`} title="text">4 stars</label>
        <input type="radio" id={`star3-${item.id}`} name={`rating-${item.id}`} value="3" checked={inputs[`rating-${item.id}`] === 3} disabled/>
        <label htmlFor={`star3-${item.id}`} title="text">3 stars</label>
        <input type="radio" id={`star2-${item.id}`} name={`rating-${item.id}`} value="2" checked={inputs[`rating-${item.id}`] === 2} disabled/>
        <label htmlFor={`star2-${item.id}`} title="text">2 stars</label>
        <input type="radio" id={`star1-${item.id}`} name={`rating-${item.id}`} value="1" checked={inputs[`rating-${item.id}`] === 1} disabled/>
        <label htmlFor={`star1-${item.id}`} title="text">1 star</label>
        </div>
    }else{
        return <div className={styles.rate}>
        <input type="radio" id={`star5-${item.id}`} name={`rating-${item.id}`} value="5" checked={inputs[`rating-${item.id}`] === 5} onClick={handleRatingChange}/>
        <label htmlFor={`star5-${item.id}`} title="text">5 stars</label>
        <input type="radio" id={`star4-${item.id}`} name={`rating-${item.id}`} value="4" checked={inputs[`rating-${item.id}`] === 4} onClick={handleRatingChange}/>
        <label htmlFor={`star4-${item.id}`} title="text">4 stars</label>
        <input type="radio" id={`star3-${item.id}`} name={`rating-${item.id}`} value="3" checked={inputs[`rating-${item.id}`] === 3} onClick={handleRatingChange}/>
        <label htmlFor={`star3-${item.id}`} title="text">3 stars</label>
        <input type="radio" id={`star2-${item.id}`} name={`rating-${item.id}`} value="2" checked={inputs[`rating-${item.id}`] === 2} onClick={handleRatingChange}/>
        <label htmlFor={`star2-${item.id}`} title="text">2 stars</label>
        <input type="radio" id={`star1-${item.id}`} name={`rating-${item.id}`} value="1" checked={inputs[`rating-${item.id}`] === 1} onClick={handleRatingChange}/>
        <label htmlFor={`star1-${item.id}`} title="text">1 star</label>
        </div>
    }
}