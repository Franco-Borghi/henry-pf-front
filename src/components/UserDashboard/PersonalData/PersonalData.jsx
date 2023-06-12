import styles from "../ProfileForm/ProfileForm.module.css"

export default function PersonalData({profileData, handleInputChange, handleEditClick, handleSaveClick, editMode}) {
    return<section>
    <form>
      <div >
        <label className={styles.labelElement}>
          Email:
          <input className={styles.inputField}
            type="text"
            disabled
            value={profileData?.email}
          />
        </label>
      </div>

      <div>
      <label className={styles.labelElement}>
          First Name:
          {editMode ? (
            <input className={styles.inputField}
              type="text"
              name="firstName"
              value={profileData?.firstName}
              onChange={handleInputChange}
            />
          ) : (
            <p className={styles['user-data-label']}>{profileData?.firstName}</p>
          )}
        </label>
      </div>

      <div>
      <label className={styles.labelElement}>
          Last Name:
          {editMode ? (
            <input className={styles.inputField}
              type="text"
              name="lastName"
              value={profileData?.lastName}
              onChange={handleInputChange}
            />
          ) : (
            <p className={styles['user-data-label']}>{profileData?.lastName}</p>
          )}
        </label>
      </div>

      <div>
      <label className={styles.labelElement}>
          Phone Number:
          {editMode ? (
            <input className={styles.inputField}
              type="tel"
              name="phoneNumber"
              value={profileData?.phoneNumber}
              onChange={handleInputChange}
            />
          ) : (
            <p className={styles['user-data-label']}>{profileData?.phoneNumber}</p>
          )}
        </label>
      </div>

      <div>
      <label className={styles.labelElement}>
          ID Number:
          {editMode ? (
            <input className={styles.inputField}
              type="text"
              name="idNumber"
              value={profileData?.idNumber}
              onChange={handleInputChange}
            />
          ) : (
            <p className={styles['user-data-label']}>{profileData?.idNumber}</p>
          )}
        </label>
      </div>
  


    <section>
      {editMode ? (
        <button className={styles.saveBtn} onClick={handleSaveClick}>Save</button>
      ) : (
        <button className={styles.editBtn} onClick={handleEditClick}>Edit</button>
      )}
    </section>
  </form>
</section>
    
}