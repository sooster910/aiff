import * as React from 'react'
import { Image } from '@geist-ui/core'

import { useAuth } from '@app/hooks/useAuth'
interface INavbarProps {}
const Navbar: React.FunctionComponent<INavbarProps> = props => {
  const auth = useAuth()
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        padding: '2rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: '2',
        height: '70px',
        maxWidth: '28rem',
        width: '100%',
        margin: '0 auto',
        background: '#ffffff',
      }}
    >
      <a href="/" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/aiffschool_logo.svg"
            alt="AIFF Logo"
            width={5}
            // height={1}
          />
        </div>
        {/* <img src="/aiffschool_logo1.svg" alt="AIFF Logo" /> */}
        {/* <a href="/login">login</a> */}
      </a>
      <nav>{!auth?.user && <a></a>}</nav>
    </header>
  )
}

export default Navbar
