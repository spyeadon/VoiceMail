import React from 'react'
import {connect} from 'react-redux'

const AudioContainer = connect(null, null)(
  props =>
    <li>
      <div id="audio-container">
        <button
          id="audio-dropdown"
          >Record VoiceMail <span className="caret" />
        </button>
        <ul id="audio-menu" >
          <li><a href="#">Start Recording</a></li>
          <li>Stop Recording</li>
          <li>Play Recording</li>
          <li>Clear Recording</li>
          <li>Attach To Email</li>
        </ul>
      </div>
    </li>
)

export default AudioContainer
