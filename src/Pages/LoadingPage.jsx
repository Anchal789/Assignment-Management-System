import React from 'react'
import LoadingGif from '../Assets/loading.gif'

const Loading = () => {
  return (
    <div><img src={LoadingGif} alt="" style={{width: "-webkit-fill-available"}}/></div>
  )
}

export default Loading