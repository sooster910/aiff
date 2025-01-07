import type { NextPage } from 'next'
import Head from 'next/head'
import { Card, Text, Image } from '@geist-ui/core'

import PageLayout from '@app/layouts/PageLayout'
import Link from 'next/link'
import mixpanel from 'mixpanel-browser'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_BASE_URL)
  }, [])
  const handleClickLink = () => {
    mixpanel.track('goToReservation', {
      position: 'bottom',
    })
  }
  return (
    <PageLayout>
      <Head>
        <title>AIFF 베이킹</title>
        <meta name="description" content="AIFF 베이킹 클래스" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3 className={'text-amber-700'}>Gingerbread</h3>
        <Text h2 style={{ marginTop: '2rem' }}>
          Welcome to AIFF!
        </Text>

        <Card width="100%" marginTop={'3rem'}>
          <Image
            src="/banner2.jpg"
            height="auto"
            width="100%"
            style={{ objectFit: 'contain' }}
            draggable={false}
          />
          <Text
            mb={0}
            style={{
              fontSize: '1.25rem',
              fontFamily: 'inherit',
            }}
          >
            클래스 예약
          </Text>
          <Card.Footer>
            <Link href={`/booking`} onClick={handleClickLink}>
              <Text style={{ fontSize: '1.4rem', fontFamily: 'inherit' }}>
                {'지점 시간표 / 예약'}
              </Text>
            </Link>
          </Card.Footer>
        </Card>
      </main>
    </PageLayout>
  )
}

export default Home
