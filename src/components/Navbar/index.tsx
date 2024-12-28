import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'start' }}>
      <Link href="/" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/aiffschool_logo.svg"
            alt="AIFF Logo"
            width={70}
            height={70}
          />
        </div>
      </Link>
    </header>
  )
}

export default Navbar
