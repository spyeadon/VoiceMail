import React from 'react'
import {connect} from 'react-redux'

const AudioContainer = connect(null, null)(
  props =>
    <li>
      <div id="audio-container">
        <button
          id="audio-dropdown"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          >Record VoiceMail <span className="caret" />
        </button>
        <ul id="audio-menu" aria-labelledby="audio-dropdown">
          <li><a className="audio-menu-btn">Start Recording</a></li>
          <li><a className="audio-menu-btn">Stop Recording</a></li>
          <li className="divider" />
          <li><a className="audio-menu-btn">Play Recording</a></li>
          <li><a className="audio-menu-btn">Clear Recording</a></li>
          <li className="divider" />
          <li><a className="audio-menu-btn">Attach To Email</a></li>
        </ul>
      </div>
    </li>
)

export default AudioContainer
