import type { NextPage } from "next";
import Head from "next/head";
// import Image from 'next/image'
import { Card, Text, Image } from "@geist-ui/core";
import PageLayout from "@app/layouts/PageLayout";
import Link from "next/link";
import {useQueryLoader} from "react-relay";
import {BookingQuery} from "@app/pages/booking";
import {useEffect} from "react";
// import { NEXT_PUBLIC_FRONTEND_BASE_URL } from '../utils/constants'

const Home: NextPage = () => {
  const [queryRef, loadQuery] = useQueryLoader(BookingQuery);
  return (
    <PageLayout>
      <Head>
        <title>AIFF 베이킹</title>
        <meta name="description" content="AIFF 베이킹 클래스" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text h2 style={{ marginTop: "2rem" }}>
          Welcome to AIFF!
        </Text>

        <Card width="100%" marginTop={"3rem"}>
          <Image
            src="/banner2.jpg"
            height="auto"
            width="100%"
            style={{ objectFit: "contain" }}
            draggable={false}
          />
          <Text h4 mb={0}>
            클래스 예약
          </Text>
          <Card.Footer>
            <Text h3>
              <Link  onMouseEnter={()=>{
                loadQuery({});
              }} href= {"/booking"} style={{ font: "2rem" }} >
                {"본점 시간표/예약"}
              </Link>
          </Text>
          </Card.Footer>
        </Card>
      </main>
    </PageLayout>
  );
};

export default Home;
