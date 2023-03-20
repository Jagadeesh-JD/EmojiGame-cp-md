/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojiList: [],
    topScore: 0,
    gameIsRunning: true,
  }

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  getShuffledList = () => {
    const shuffledList = this.shuffledEmojisList()

    return (
      <ul className="emojicardUl">
        {shuffledList.map(eachItem => (
          <EmojiCard
            key={eachItem.id}
            onEmoji={this.onEmoji}
            emojiDetails={eachItem}
          />
        ))}
      </ul>
    )
  }

  resetGame = () => {
    this.setState({clickedEmojiList: [], gameIsRunning: true})
  }

  onEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const alreadyClicksEmoji = clickedEmojiList.includes(id)
    const clicksEmojiLength = clickedEmojiList.length

    if (alreadyClicksEmoji) {
      this.finishGameAndShowScore(clicksEmojiLength)
    } else {
      if (clicksEmojiLength === clickedEmojiList.length - 1) {
        this.finishGameAndShowScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojiList: [...prevState.clickedEmojiList, id],
      }))
    }
  }

  finishGameAndShowScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, gameIsRunning: false})
  }

  getScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isWon = emojisList.length === clickedEmojiList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        score={clickedEmojiList.length}
        onClickPlayAgain={this.resetGame}
      />
    )
  }

  render() {
    const {clickedEmojiList, topScore, gameIsRunning} = this.state

    return (
      <div className="game-container">
        <NavBar
          currentScore={clickedEmojiList.length}
          topScore={topScore}
          gameIsRunning={gameIsRunning}
        />
        <div className="body-container">
          {gameIsRunning ? this.getShuffledList() : this.getScoreCard()}
        </div>
      </div>
    )
  }
}
export default EmojiGame
