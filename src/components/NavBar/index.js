// Write your code here.
import './index.css'

const NavBar = props => {
  const {currentScore, topScore,isGameInProgress} = props

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
          alt="emoji logo"
          className="image"
        />
        <h1 className="game-name">Emoji Game</h1>
      </div>
      {gameIsRunning && (
        <div className="nav-right">
          <p className="navItem">{`Score: ${currentScore}`}</p>
          <p className="navItem">{`Top Score: ${topScore}`}</p>
        </div>
      )}
    </nav>
  )
}
export default NavBar
