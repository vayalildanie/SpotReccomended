import React, { useState } from "react"

import './Dashboard.css'
import Chat from "./Chat"
import Music from "./Music";

function Dashboard() {
  return (
    <div id='dashboard'>
      <Music />
      <Chat />
    </div>
  )
}

export default Dashboard;