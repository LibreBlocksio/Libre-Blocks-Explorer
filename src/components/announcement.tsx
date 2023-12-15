export default function Announcement() {
  return (
    <div className='announcement-bar'>
      <p className='announcement-message '>
        Libre Blocks is currently in beta. Please try it out and{' '}
        <a href='mailto:libreblocks@gmail.com'>share your feedback with us.</a>
      </p>
      <button className='close-button' aria-label='Close'>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
}
