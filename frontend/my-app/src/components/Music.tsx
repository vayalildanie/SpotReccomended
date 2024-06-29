import songs from '../data/songs.json'

function Music () {
  return (
  <div id='music-cards'>
    {songs.songs.map((song: any, index: number) => {
      return (
        <div key={index} className='card'>
          <img src={song.cover} alt='album art' />
          <div className='content'>
            <p>{song.title}</p>
            <p>{song.artist}</p>
          </div>
        </div>
      )
    })}
  </div>
  )
}

export default Music;