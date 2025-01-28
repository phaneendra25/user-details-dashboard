import {Component} from 'react'

import UserItem from '../UserItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserManagementDashboard extends Component {
  state = {
    id: '',
    firstNameInput: '',
    lastNameInput: '',
    emailInput: '',
    departmentInput: '',
    usersList: [],
    previousList: [],
    apiStatus: apiStatusConstants.initial,
    showIdError: false,
    showFirstNameError: false,
    showLastNameError: false,
    showEmailError: false,
    showDepartmentError: false,
    isFormSubmitted: false,
    isEditClick: false,
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://jsonplaceholder.typicode.com/users'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.map(eachData => ({
        id: eachData.id,
        firstName: eachData.name,
        lastName: '',
        email: eachData.email,
        department: eachData.company.name,
      }))

      console.log(updatedData)
      this.setState({
        usersList: [...updatedData],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onBlurId = () => {
    const isValidId = this.validateId()

    this.setState({showIdError: !isValidId})
  }

  onChangeId = event => {
    const valueUser = event.target.value

    this.setState({
      id: valueUser,
    })
  }

  renderIdField = () => {
    const {id, showIdError} = this.state
    const className = showIdError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="id">
          ID
        </label>
        <input
          type="text"
          id="id"
          className={className}
          value={id}
          placeholder="Id"
          onChange={this.onChangeId}
          onBlur={this.onBlurId}
        />
      </div>
    )
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()

    this.setState({showLastNameError: !isValidLastName})
  }

  onChangeLastName = event => {
    const valueUser = event.target.value

    this.setState({
      lastNameInput: valueUser,
    })
  }

  renderLastNameField = () => {
    const {lastNameInput, showLastNameError} = this.state
    const className = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className={className}
          value={lastNameInput}
          placeholder="Last name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </div>
    )
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()

    this.setState({showFirstNameError: !isValidFirstName})
  }

  onChangeFirstName = event => {
    const valueUser = event.target.value

    this.setState({
      firstNameInput: valueUser,
    })
  }

  renderFirstNameField = () => {
    const {firstNameInput, showFirstNameError} = this.state
    const className = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={className}
          value={firstNameInput}
          placeholder="First name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </div>
    )
  }

  onBlurDepartment = () => {
    const isValidDepartment = this.validateDepartment()

    this.setState({showDepartmentError: !isValidDepartment})
  }

  onChangeDepartment = event => {
    const valueUser = event.target.value

    this.setState({
      departmentInput: valueUser,
    })
  }

  renderDepartmentField = () => {
    const {departmentInput, showDepartmentError} = this.state
    const className = showDepartmentError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="department">
          Department
        </label>
        <input
          type="text"
          id="department"
          className={className}
          value={departmentInput}
          placeholder="Department"
          onChange={this.onChangeDepartment}
          onBlur={this.onBlurDepartment}
        />
      </div>
    )
  }

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail()

    this.setState({showEmailError: !isValidEmail})
  }

  onChangeEmail = event => {
    const valueUser = event.target.value

    this.setState({
      emailInput: valueUser,
    })
  }

  renderEmailField = () => {
    const {emailInput, showEmailError} = this.state
    const className = showEmailError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          className={className}
          value={emailInput}
          placeholder="Email"
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
        />
      </div>
    )
  }

  validateId = () => {
    const {id} = this.state

    return id !== ''
  }

  validateEmail = () => {
    const {emailInput} = this.state

    return emailInput !== ''
  }

  validateDepartment = () => {
    const {departmentInput} = this.state

    return departmentInput !== ''
  }

  validateLastName = () => {
    const {lastNameInput} = this.state

    return lastNameInput !== ''
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state

    return firstNameInput !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()
    const isValidEmail = this.validateEmail()
    const isValidDepartment = this.validateDepartment()

    const {
      id,
      firstNameInput,
      lastNameInput,
      emailInput,
      departmentInput,
      usersList,
    } = this.state

    const idAddorUpdate = id

    const userObj = {
      id: idAddorUpdate,
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      department: departmentInput,
    }

    if (
      isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidDepartment
    ) {
      this.setState({usersList: [...usersList, userObj], isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        showEmailError: !isValidEmail,
        showDepartmentError: !isValidDepartment,
        isFormSubmitted: false,
      })
    }
  }

  renderUserForm = () => {
    const {
      showFirstNameError,
      showLastNameError,
      showEmailError,
      showDepartmentError,
      showIdError,
      isEditClick,
    } = this.state

    return (
      <>
        {isEditClick ? (
          <form className="form-container" onSubmit={this.onSubmitForm}>
            {this.renderFirstNameField()}
            {showFirstNameError && <p className="error-message">Required</p>}
            {this.renderLastNameField()}
            {showLastNameError && <p className="error-message">Required</p>}
            {this.renderEmailField()}
            {showEmailError && <p className="error-message">Required</p>}
            {this.renderDepartmentField()}
            {showDepartmentError && <p className="error-message">Required</p>}

            <button
              type="button"
              className="submit-button"
              onClick={this.onSubmitForm}
            >
              Update
            </button>
            <button
              type="button"
              className="submit-button"
              onClick={this.onCancelSubmit}
            >
              Cancel
            </button>
          </form>
        ) : (
          <form className="form-container" onSubmit={this.onSubmitForm}>
            {this.renderIdField()}
            {showIdError && <p className="error-message">Required</p>}
            {this.renderFirstNameField()}
            {showFirstNameError && <p className="error-message">Required</p>}
            {this.renderLastNameField()}
            {showLastNameError && <p className="error-message">Required</p>}
            {this.renderEmailField()}
            {showEmailError && <p className="error-message">Required</p>}
            {this.renderDepartmentField()}
            {showDepartmentError && <p className="error-message">Required</p>}

            <button type="submit" className="submit-button">
              Add
            </button>
          </form>
        )}{' '}
      </>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState({
      isFormSubmitted: false,
      isEditClick: false,
      id: '',
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      departmentInput: '',
    })
  }

  renderSubmissionSuccessView = () => (
    <>
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  onCancelSubmit = () => {
    const {previousList} = this.state
    this.setState({
      id: '',
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      departmentInput: '',
      usersList: [...previousList],
      isEditClick: false,
    })
  }

  onClickingEdit = userDetail => {
    const {usersList} = this.state

    const filteredList = usersList.filter(
      eachUser => eachUser.id !== userDetail.id,
    )

    console.log(filteredList[0])

    this.setState({
      id: userDetail.id,
      firstNameInput: userDetail.firstName,
      lastNameInput: userDetail.lastName,
      emailInput: userDetail.email,
      departmentInput: userDetail.department,
      usersList: [...filteredList],
      previousList: [...usersList],
      isEditClick: true,
    })
  }

  onClickingDelete = userDetail => {
    const {usersList} = this.state

    const filteredList = usersList.filter(
      eachUser => eachUser.id !== userDetail.id,
    )

    console.log(filteredList[0])

    this.setState({
      usersList: [...filteredList],
      previousList: [...usersList],
      isEditClick: false,
    })
  }

  render() {
    const {isFormSubmitted, usersList, apiStatus} = this.state
    console.log(apiStatus)

    return (
      <div className="user-form-container">
        <h1 className="form-title">User Details</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderUserForm()}
        </div>

        <hr className="hr" />
        <h1 className="form-title">UserList</h1>
        <ul className="users-list">
          {usersList.map(eachUser => (
            <UserItem
              key={eachUser.id}
              userDetails={eachUser}
              clickToEdit={this.onClickingEdit}
              clickToDelete={this.onClickingDelete}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default UserManagementDashboard
