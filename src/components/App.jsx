import { useState, useEffect } from 'react'
import Game from './Game'
import '../styles/App.css'

export default function App(){
  return(
    <div className='content'>
      <div className='header-container'>
        <h1>Welcome to Memory Game!</h1>
        <i>Made with React utilizing PokeAPI <a href="" target='_blank'>[GitHub]</a></i>
      </div>
        
      <div className='instruction-container'>
        <h3>Instructions</h3>
        <ul className='instruction-list'>
          <li>3 Images will appear on the screen.</li>
          <li>Select an image that has NOT been shown before.</li>
          <li>Correctly selecting an image adds a point to your overall score.</li>
          <li>Incorrectly selecting an image is game over - game will restart.</li>
        </ul>
      </div>
      

      <div className='game-container'>
        <h1>Select a Pokemon!</h1>
        <Game />
      </div>
    
    
    </div>
  )
}
