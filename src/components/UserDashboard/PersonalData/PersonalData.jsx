import styles from "../ProfileForm/ProfileForm.module.scss"

export default function PersonalData({profileData, handleInputChange, handleEditClick, handleSaveClick, editMode, errors}) {
    return (
      <section>
          <form>
            <div>
              <label>
                <span>Email:</span>
                  <p className={styles['user-data-label']}>{profileData?.email}</p>
              </label>
            </div>

            {
              editMode
              ? <div style={{ height: '1px', width: '100%', background: '#888'}}></div>
              : null
            }
  
            <div>
              <label >
                <span>
                First Name:
                </span>
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
                {errors.firstName ? <p className={styles['labelError']}>{errors.firstName}</p> : null}
              </label>
            </div>
  
            <div>
              <label >
                <span>
                Last Name:
                </span>
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
                {errors.lastName ? <p className={styles['labelError']}>{errors.lastName}</p> : null}
              </label>
            </div>
  
            <div>
              <label>
                <span>
                Phone Number:
                </span>
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
                {errors.phoneNumber ? <p className={styles['labelError']}>{errors.phoneNumber}</p> : null}
              </label>
            </div>
  
            <div>
              <label >
                <span>
                ID Number:
                </span>
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
                {errors.idNumber ? <p className={styles['labelError']}>{errors.idNumber}</p> : null}
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
    )  
}