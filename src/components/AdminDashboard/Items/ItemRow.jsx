import axios from 'axios';
import React from 'react';
import swal from 'sweetalert2';
import styles from './Items.module.scss';
import { useNavigate } from 'react-router-dom';
import validateColor from './validateColor';

export function ItemRow({item, getItems}) {

  const [edit, setEdit] = React.useState(false);
  const [color, setColor] = React.useState(item.color);
  const navigate = useNavigate();

  const handlePut = () => {
    let error = validateColor(color)
    if(error === ""){
    axios.put(`${process.env.REACT_APP_HOST_NAME}/items/${item.chassisId}`, {
      color,
    })
    .then(() => {
      setEdit(false)
      getItems();
    })
    .then(res => {
      return new swal({
        title: "Success",
        text: "The item was successfully edited",
        icon: "success",
        buttons: true,
      })
    })
    .then(() => {
      refreshState();
    })
    .catch(err => {
      return new swal({
        title: "Error",
        text: "There was an error updating the item",
        icon: "error",
        buttons: true,
      })
    })
  }else{
    return new swal({
      title: "Error",
      text: `${error}`,
      icon: "error",
      buttons: true,
    })
  }
  }

  const refreshState = () => {
    setColor(item.color);
  }

  return (
    <tr className={!edit ? styles.tr : styles['tr-true']}>
      {
        edit
        ? <>
            <td className={styles.td}>{`${item.chassisId}`}</td>
            <td className={styles.td}><input placeholder='empty' type="text" value={color} onChange={(e) => setColor(e.target.value)} /></td>
            <td className={styles.td}>{`${item.sold}`}</td>
            <td className={styles.td}>{`${item.motorcycle.brand} ${item.motorcycle.model}`}</td>
            <td className={styles.td}>{`${item.orderNumber || 'N/A'}`}</td>
          </>
        : <>
            <td className={styles.td}>{`${item.chassisId}`}</td>
            <td className={styles.td}>{`${item.color}`}</td>
            <td className={styles.td}>{`${item.sold}`}</td>
            <td className={styles.td}>{`${item.motorcycle.brand} ${item.motorcycle.model}`}</td>
            <td style={{ cursor: item.orderNumber ? 'pointer' : ''}} onClick={() => item.orderNumber && navigate(`/admin/orders/${item.orderNumber}`)} className={styles.td}>{`${item.orderNumber || 'N/A'}`}</td>
          </>
      }   
      <td style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px'}} className={styles.td}>
        {
          edit
          ? <>
              <button className={styles.save} onClick={() => {handlePut()}} type='button'>Save</button>
              <button className={styles.cancel} onClick={() => {refreshState(); setEdit(false)}} type='button'>Cancel</button>
            </>
          : <>
              {              
                !item.sold ? <button className={styles.edit} onClick={() => {refreshState(); setEdit(true)}} type='button'>Edit</button> : null
              }           
            </>
        }
      </td>
    </tr>
  )
}
