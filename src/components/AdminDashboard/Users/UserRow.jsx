import axios from 'axios';
import React from 'react';
import swal from 'sweetalert2';
import styles from './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import validateUser from './validationsUser';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

export function UserRow({user, getUsers}) {

  const [edit, setEdit] = React.useState(false);
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = React.useState(user.phoneNumber);
  const [idNumber, setIdNumber] = React.useState(user.idNumber);
  const [active, setActive] = React.useState(user.active);
  const [role, setRole] = React.useState(user.role);
  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);
 

  const handlePut = () => {
    const auxErrors = validateUser({firstName, lastName, phoneNumber, idNumber})
    if(Object.keys(auxErrors).length === 0){
    axios.put(`${process.env.REACT_APP_HOST_NAME}/users/${user.id}`, {
      // editedFromAdmin: true,
      firstName,
      lastName,
      phoneNumber,
      idNumber,
      active,
      role
        
    })
    .then(() => {
      setEdit(false);
      getUsers();
    })
    .then(res => {
      return new swal({
        title: "Success",
        text: "The user was successfully edited",
        icon: "success",
        buttons: true,
      })
    })
    .catch(err => {
      return new swal({
        title: "Error",
        text: "There was an error updating the user",
        icon: "error",
        buttons: true,
      })
      }) }
      else{
         mySwal.fire({
          html: <div>
            {Object.values(auxErrors).map(e => <p>{e}</p>)}
            </div>,
          icon: "warning",
        })
      }
  }

  const refreshState = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhoneNumber(user.phoneNumber);
    setIdNumber(user.idNumber);
    setActive(user.active);
    setRole(user.role);
  }

  return (
    <tr className={!edit ? styles.tr : styles['tr-true']}>
      {
        edit
        ? <>
            <td className={styles.td}>{`${user.id}`}</td>
            <td className={styles.td}><input placeholder='empty' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></td>
            <td className={styles.td}><input placeholder='empty' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></td>
            <td className={styles.td}>{`${user.email}`}</td>
            <td className={styles.td}><input placeholder='empty' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></td>
            <td className={styles.td}><input placeholder='empty' type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} /></td>
            {/* <td><input placeholder='Active' type="text" value={active} onChange={(e) => setActive(e.target.value)} /></td> */}
            <td className={styles.td}>
              <select value={active} onChange={(e) => setActive(e.target.value === "true")}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </td>
            
            <td className={styles.td}>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="client">client</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
            <td className={styles.td}>{user.orders.length}</td>
          </>
        : <>
            <td className={styles.td}>{`${user.id}`}</td>
            <td className={styles.td}>{`${user.firstName}`}</td>
            <td className={styles.td}>{`${user.lastName}`}</td>
            <td className={styles.td}>{`${user.email}`}</td>
            <td className={styles.td}>{`${user.phoneNumber}`}</td>
            <td className={styles.td}>{`${user.idNumber}`}</td>
            <td className={styles.td}>{`${user.active}`}</td>
            <td className={styles.td}>{`${user.role}`}</td>
            <td className={styles.td}>{user.orders.length}</td>
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
                (user.role !== 'admin' ? <button className={styles.edit} onClick={() => setEdit(true)} type='button'>Edit</button> : null)
              }
              <button className={styles.view} onClick={() => navigate(`/admin/users/${user.id}`)} type='button'>View Profile</button>
            </>
        }
      </td>
    </tr>
  )
}
