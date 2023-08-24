import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavBar = ({ handleLogOut }) => {

  const padding = {
    padding: 5
  }

  const user = useSelector((state) => state.user.user)
  console.log(user)

  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-between'>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>Home</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/blogs'>Blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>Users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/submitForm'>Submit</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href='#' as='span'>
              <em><Link to={`/users/${user._id}`}>{user.username}</Link> Logged in{' '}</em>
              <button onClick={handleLogOut}>Log out</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar