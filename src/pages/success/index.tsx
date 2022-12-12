import { Card, Text } from "@geist-ui/core";
import { DateTime } from "luxon";
import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Nullable } from "@app/types";

interface SuccessPageProps {}
type PaymentReceiptInfo = {
  requestedAt?: string;
  customerName?: string;
  orderId?: string;
  orderName?: string;
  paymentKey?: string;
  phone?: string;
  qty?: string;
  totalAmount?: string;
};
const SuccessPage: React.FunctionComponent<SuccessPageProps> = (props) => {
  const router = useRouter();
  const [successPayment, setSuccessPayment] =
    useState<Nullable<PaymentReceiptInfo>>(null);
  React.useEffect(() => {
    if (router.query) {
      setSuccessPayment({ ...router.query });
    }
  }, [router.query]);

  return (
    <>
      <>
        <h1> 결제가 정상적으로 승인 되었어요!</h1>
        <Card width="400px">
          <Text h4 mb={0}>
            결제 승인 날짜 : {successPayment?.requestedAt ?? "-"}
          </Text>

          <Text h4 mb={0}>
            이 름 : {successPayment?.customerName}
          </Text>
          <Text h4 mb={0}>
            주문 아이디: {successPayment?.orderId}
          </Text>
          <Text h4 mb={0}>
            클래스 정보 : {successPayment?.orderName}
          </Text>
          <Text h4 mb={0}>
            총 주문 가격 : {successPayment?.totalAmount}
          </Text>
          <Text h4 mb={0}>
            예약된 핸드폰 번호 : {successPayment?.phone}
          </Text>

          <Card.Footer style={{ flexDirection: "column" }}>
            <h3> 이 페이지를 캡처하여 보관해 주세요.</h3>
            <div>
              <Link href="/">홈으로 돌아가기</Link>
            </div>
          </Card.Footer>
        </Card>
      </>
    </>
  );
};

export default SuccessPage;
