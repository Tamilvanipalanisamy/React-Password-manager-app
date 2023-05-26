import './index.css'

const PasswordItem = props => {
  const {eachItem, deletePasswordItem, showPasswords} = props
  const {id, websiteName, username, password, initialBackgroundColor} = eachItem
  const initial = websiteName.slice(0, 1).toUpperCase()
  const onClickDeleteButton = () => {
    deletePasswordItem(id)
  }

  const passwardPattern = showPasswords ? (
    <p className="username">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star-image"
    />
  )

  return (
    <li className="each-item">
      <p className={`initial ${initialBackgroundColor}`}>{initial}</p>
      <div className="website-password-delete">
        <div>
          <p className="website-name">{websiteName}</p>
          <p className="username">{username}</p>
          {passwardPattern}
        </div>
        <div>
          <button
            type="button"
            className="delete-button"
            onClick={onClickDeleteButton}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
              className="delete-icon"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default PasswordItem
