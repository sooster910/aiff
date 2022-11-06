import * as React from 'react'
import { useRouter } from 'next/router'
interface LeftNavPaneProps {}

export const LeftNavPane: React.FunctionComponent<LeftNavPaneProps> = props => {
  const router = useRouter()
  return (
    <div style={{ width: '20%' }}>
      <nav>
        <a onClick={() => router.replace('/adminDashboard')}> 가맹점 관리 </a>
      </nav>
      {/* <nav>
        <a onClick={() => router.replace('/adminRegularClass')}>
          {' '}
          클래스 생성{' '}
        </a>
      </nav> */}
      <nav>
        <a onClick={() => router.replace('/adminWeeklySchedule')}>
          {' '}
          weekly 스케쥴 생성{' '}
        </a>
      </nav>
    </div>
  )
}
