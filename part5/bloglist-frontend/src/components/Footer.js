const Footer = () => {
  const footerStyle = {
    color: 'blue',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Created By Michael Thompson</em>
      <br />
      <em>GitHub: <a target='_blank' rel='noreferrer' href="https://github.com/michaelt0802">https://github.com/michaelt0802</a></em>
    </div>
  )
}

export default Footer