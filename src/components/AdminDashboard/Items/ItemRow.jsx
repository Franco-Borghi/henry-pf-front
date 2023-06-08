import axios from 'axios';
import React from 'react';
import swal from 'sweetalert2';
import styles from './Items.module.scss';
import { useNavigate } from 'react-router-dom';

export function ItemRow({item, getItems}) {

  const [edit, setEdit] = React.useState(false);
  const [sold, setSold] = React.useState(item.sold);
  const navigate = useNavigate();

  const handlePut = () => {
    console.log(sold);
    axios.put(`${process.env.REACT_APP_HOST_NAME}/item/${item.chassisId}`, {
      sold,
    })
    .then(() => {
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
  }

  const refreshState = () => {
    setSold(item.sold);
  }

  return (
    <tr className={!edit ? styles.tr : styles['tr-true']}>
      {
        edit
        ? <>
            <td className={styles.td}>{`${item.chassisId}`}</td>
            <td className={styles.td}>{`${item.color}`}</td>
            <td className={styles.td}>
              <select value={sold} onChange={(e) => setSold(e.target.value === "true")}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </td>
            <td className={styles.td}>{`${item.motorcycle.brand} ${item.motorcycle.model}`}</td>
            <td className={styles.td}>{`${item.orderNumber || 'N/A'}`}</td>
          </>
        : <>
            <td className={styles.td}>{`${item.chassisId}`}</td>
            <td className={styles.td}>{`${item.color}`}</td>
            <td className={styles.td}>{`${item.sold}`}</td>
            <td className={styles.td}>{`${item.motorcycle.brand} ${item.motorcycle.model}`}</td>
            <td style={{ cursor: item.orderNumber ? 'pointer' : ''}} onClick={() => item.orderNumber && navigate(`/admin/order/${item.orderNumber}`)} className={styles.td}>{`${item.orderNumber || 'N/A'}`}</td>
          </>
      }   
      <td style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px'}} className={styles.td}>
        {
          edit
          ? <>
              <button className={styles.save} onClick={() => {handlePut(); setEdit(false)}} type='button'>Save</button>
              <button className={styles.cancel} onClick={() => {refreshState(); setEdit(false)}} type='button'>Cancel</button>
            </>
          : <>
              <button className={styles.edit} onClick={() => setEdit(true)} type='button'>Edit</button>
            </>
        }
      </td>
    </tr>
  )
}
