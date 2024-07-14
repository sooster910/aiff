import { NextPage } from "next";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text } from "@geist-ui/core";
import MobileLayout from "@app/layouts/MobileLayout";
import PageLayout from "@app/layouts/PageLayout";
import Image from "next/image";
import ImageComp from "@app/components/ImageComp";

import {
  motion,
  useScroll,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import CustomSpacer from "@app/components/\bCustomSpacer";

interface AboutProps {}

const AboutPage: NextPage = (props) => {
  return (
    <>
      <section style={{ backgroundColor: "#FFE7DF", padding: "7rem 2rem" }}>
        <ScrollHeightTransition>
          <PageLayout>
            <div><p>hi</p></div>
            <CustomSpacer y={8}/>
            <Text h2 style={{ marginBottom: "2rem" }}>
              1.
            </Text>
            <CustomSpacer y={8}/>
            <Text
              color="#666"
              style={{
                lineHeight: "1.8em",
                marginBottom: "4rem",
              }}
            >
              "아이프" 는 영국 버밍엄대에서 베이킹을 전공하고, 다빈치 프로젝트에
              선발되어 프랑스 마르세유에서 이수를 받아 유럽식 클래식 제빵기술에
              정통한 김현정 파티시에의 베이커리입니다. 스케치(Sketch), 해러즈
              백화점(Harrods), 랭함 호텔(Langham Hotel) 등 런던 유수의
              페이스트리 팀에서 경험을 쌓고 영국 베이커리의 매력을 한국에
              알리고자 "아이프"를 열었습니다. 영국 여왕의 생일(Queen's birthday)
              한국 행사에서 대표 케이크를 제작하였으며, 보존제 프리/최상급
              재료/홈메이드 현태 제조로 빅토리아 케익 베이스인 자이언트 컴케익과
              스콘 등의 스위츠를 제공합니다. 영국 정통 베이킹 철학과 독창적인
              디자인, 정직한 재료 사용으로 "아이프" 만의 차별화된 베이킹을
              한국에 선보이고 있습니다.
            </Text>

            <Image
              src="/about-1.jpg"
              width={500}
              height={250}
              // style={{ borderRadius: "4px" }}
            />
          </PageLayout>
        </ScrollHeightTransition>
      </section>
      <section
        style={{
          backgroundImage: `url("./about-2.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          minHeight: "700px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(254, 244, 240)",
          lineHeight: "1.8em",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          //   padding: "auto 2rem",
        }}
      >
        <PageLayout>
          <ScrollXTransition>
            <Text h2 style={{ marginBottom: "2rem" }}>
              2.
            </Text>
            <p>
              "아이프스쿨" 은 아이프만의 베이킹 철학과 레시피를 아이들이
              이해하고 표현하기 쉽게 구성한 베이킹 클래스로, 아이들의 눈높이에
              맞 베이킹 재료 탐색 및 베이킹의 과학적 원리를 스스로 익힐 수 있는
              커리큘럼을 체험할 수 있습니다. 또한 전문 베이킹 교육을 수료한
              원어민 교사와 영어로 진행하는 클래스도 준비되어있어, 베이킹과 영어
              공부를 동시에 할 수 있습니다. "아이프스쿨"만의 퀄리티를 전국
              어디서나 동일하게 체감할 수 있도록 가맹점을 운영 및 모집 중에
              있으며 현재 본점인 용산점 외에도 판교점/대구점 이
              오픈되어있습니다. 가맹점은 엄격한 선별을 통해 추가로 오픈
              예정입니다.
            </p>
          </ScrollXTransition>
        </PageLayout>
      </section>
      <section
        style={{
          padding: "7rem 2rem",
          color: "#5b2554",
          backgroundColor: "rbga(251,236,239,0.3)",
        }}
      >
        <PageLayout>
          <ScrollXTransition>
            <Text h2 style={{ marginBottom: "2rem" }}>
              3.
            </Text>
            <p style={{ lineHeight: "2em" }}>
              "아이프스쿨 키트" 는 아이프만의 노하우로 여러 지역에 있는
              아이프스쿨에서 본사와 동일한 구성의 클래스를 진행할 수 있도록 하기
              위한 키트입니다. 엄선된 퀄리티의 유기농 레시피 재료 및 창의력에
              도움을 주는 워크북, 그리고 귀여운 포장 패키지로 구성된 "아이프스쿨
              키트" 는 아이프 본사에서 전 지점으로 공급되어 전국 어디서나 동일한
              퀄리티의 베이킹 클래스 진행이 가능하도록 합니다. 추후 온라인으로도
              판매될 예정입니다.
            </p>
          </ScrollXTransition>
        </PageLayout>
      </section>
      <section style={{ marginBottom: "10rem" }}>
        <div
          style={{
            flexDirection: "column",
            backgroundImage: `url("./about-3.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minHeight: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgb(254, 244, 240)",
            lineHeight: "1.8em",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            borderRadius: "4px",
          }}
        >
          <div
            className={"applyBtn"}
            style={{
              color: "#FFE7DF",
              backgroundColor: "transparent",
              border: "1px solid #FFE7DF",
              borderRadius: "10px",
              cursor: "pointer",
              padding: "1rem 2rem",
              fontWeight: "bold",
            }}
          >
            신청하러 가기
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

export const ScrollHeightTransition = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const boxVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "easeIn", duration: 1.5 },
    },
    hidden: { opacity: 0, scale: 1, y: 500 },
  };
  const viewRef = useRef(null);
  const control = useAnimation();
  const isInView = useInView(viewRef);
  console.log("isInview", isInView);
  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [isInView, control]);
  return (
    <AnimatePresence>
      <motion.div
        ref={viewRef}
        variants={boxVariant}
        initial="hidden"
        animate={control}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const ScrollXTransition = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const boxVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { type: "easeIn", duration: 1.5 },
    },
    hidden: { opacity: 0, scale: 1, x: 500 },
  };
  const viewRef = useRef(null);
  const control = useAnimation();
  const isInView = useInView(viewRef);
  console.log("isInview", isInView);
  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [isInView, control]);
  return (
    <AnimatePresence>
      <motion.div
        ref={viewRef}
        variants={boxVariant}
        initial="hidden"
        animate={control}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
