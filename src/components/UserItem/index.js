import './index.css'

const UserItem = props => {
  const {userDetails, clickToEdit, clickToDelete} = props

  const {id, firstName, lastName, email, department} = userDetails
  const fullName = `${firstName} ${lastName}`

  const editOption = () => {
    clickToEdit(userDetails)
  }

  const deleteOption = () => {
    clickToDelete(userDetails)
  }

  return (
    <li className="user-item">
      <div>
        <p className="user-id">{id}</p>
        <p className="title">{fullName}</p>
        <p className="details">Email: {email}</p>
        <p className="details">Department: {department}</p>
        <div className="user-button-container">
          <button type="button" className="user-button" onClick={editOption}>
            Edit
          </button>
          <button type="button" className="user-button" onClick={deleteOption}>
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default UserItem
