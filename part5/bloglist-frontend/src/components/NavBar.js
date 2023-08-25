import { Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../bootstrap.css'

const NavBar = ({ handleLogOut }) => {

  const padding = {
    padding: 5
  }

  const user = useSelector((state) => state.user.user)

  return (
    <div>
      <Navbar collapseOnSelect expand='lg'>
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
              <em><Link to={`/users/${user._id}`}>{user.username}</Link></em>
              <em style={{ color: 'white' }}> Logged in{' '}</em>
              <Button size='sm' variant="secondary" onClick={handleLogOut}>Log out</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar