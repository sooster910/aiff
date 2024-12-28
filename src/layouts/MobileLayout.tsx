import * as React from 'react'
import { useRouter } from 'next/router'
import booking from '@app/pages/booking'

export interface MobileLayoutProps {
  children: React.ReactNode
  maxWidth: string
}

const MobileLayout: React.FunctionComponent<MobileLayoutProps> = ({
  maxWidth,
  children,
  ...props
}) => {
  const router = useRouter()

  return (
    <div
      className={`min-h-screen flex flex-col ${
        router.pathname === '/booking' ? 'bg' : 'mobile'
      }`}
      style={{
        maxWidth:
          router.pathname === '/adminDashboard' ||
          router.pathname === '/adminWeeklySchedule'
            ? '1200px'
            : maxWidth,
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  )
}

export default MobileLayout
