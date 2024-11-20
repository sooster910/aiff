import type {NextPage} from "next"
import Head from "next/head"
// import Image from 'next/image'
import {Card, Text, Image} from "@geist-ui/core"
import PageLayout from "@app/layouts/PageLayout"
import Link from "next/link"
// import { NEXT_PUBLIC_FRONTEND_BASE_URL } from '../utils/constants'

const Home: NextPage = () => {
  console.log("version 2")
  // const RedirectLink = () => <Link href="/booking">클래스 예약 하러 가기</Link>
  return (
    <PageLayout>
      <Head>
        <title>AIFF 베이킹</title>
        <meta name="description" content="AIFF 베이킹 클래스" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text h2 style={{marginTop: "2rem"}}>
          Welcome to AIFF!
        </Text>

        <Card width="100%" marginTop={"3rem"}>
          <Image
            src="/banner2.jpg"
            height="auto"
            width="100%"
            style={{objectFit: "contain"}}
            draggable={false}
          />
          <Text
            mb={0}
            style={{
              fontSize: "1.25rem",
              fontFamily: "inherit",
            }}
          >
            클래스 예약
          </Text>
          <Card.Footer>
            <Link href={`/booking`}>
              <Text style={{fontSize: "1.4rem", fontFamily: "inherit"}}>
                {"지점 시간표 / 예약"}
              </Text>
            </Link>
          </Card.Footer>
        </Card>
      </main>
    </PageLayout>
  )
}

export default Home
