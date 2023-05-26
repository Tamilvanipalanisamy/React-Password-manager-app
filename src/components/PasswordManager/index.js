import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialBackgroundClass = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
]

const initialList = []

class PasswordManager extends Component {
  state = {
    passwordList: initialList,
    websiteName: '',
    username: '',
    password: '',
    searchInput: '',
    showPasswords: false,
  }

  onAddPassword = event => {
    event.preventDefault()

    const {websiteName, username, password} = this.state
    const initialBackgroundIndex = Math.ceil(
      Math.random() * initialBackgroundClass.length - 1,
    )
    const initialBackgroundColor =
      initialBackgroundClass[initialBackgroundIndex]

    const newPassword = {
      id: uuidv4(),
      websiteName,
      username,
      password,
      initialBackgroundColor,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteName: '',
      username: '',
      password: '',
    }))
  }

  onChangeWebsiteName = event => {
    this.setState({
      websiteName: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  getSearchedResult = () => {
    const {passwordList, searchInput} = this.state
    const searchedResult = passwordList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchedResult
  }

  deletePasswordItem = id => {
    const {passwordList} = this.state
    const filteredItem = passwordList.filter(eachItem => eachItem.id !== id)

    this.setState({passwordList: filteredItem})
  }

  toggleChechbox = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  render() {
    const {
      passwordList,
      websiteName,
      username,
      password,
      searchInput,
      showPasswords,
    } = this.state

    const searchedResult = this.getSearchedResult()

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="pm-image"
          />
          <form className="form-container" onSubmit={this.onAddPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="form-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="form-icon"
              />
              <hr className="line" />
              <input
                type="text"
                value={websiteName}
                onChange={this.onChangeWebsiteName}
                placeholder="Enter Website"
                className="input-style"
              />
            </div>
            <div className="form-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="form-icon"
              />
              <hr className="line" />
              <input
                type="text"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Enter Username"
                className="input-style"
              />
            </div>
            <div className="form-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="form-icon"
              />
              <hr className="line" />
              <input
                type="password"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Enter Password"
                className="input-style"
              />
            </div>
            <div className="button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="bottom-card-container">
          <div className="count-search-container">
            <div className="pass-count-container">
              <h1 className="password-count-text">Your Passwords</h1>
              <p className="pass-count">{passwordList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="form-icon"
              />
              <hr className="line" />
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                className="input-style"
              />
            </div>
          </div>
          <hr />
          <div className="show-pass-container">
            <input
              type="checkbox"
              id="showPasswords"
              className="checkbox"
              onChange={this.toggleChechbox}
            />
            <label htmlFor="showPasswords" className="show-pass-text">
              Show Passwords
            </label>
          </div>

          {searchedResult.length !== 0 ? (
            <ul className="password-list">
              {searchedResult.map(eachItem => (
                <PasswordItem
                  eachItem={eachItem}
                  key={eachItem.id}
                  deletePasswordItem={this.deletePasswordItem}
                  showPasswords={showPasswords}
                />
              ))}
            </ul>
          ) : (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="pm-image"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
