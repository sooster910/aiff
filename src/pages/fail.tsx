import { Card, Grid, Text, Link } from '@geist-ui/core'
import * as React from 'react'

interface FailProps {}

const Fail: React.FunctionComponent<FailProps> = props => {
  return (
    <>
      <Grid.Container gap={1.5} marginTop={4} marginBottom={4}>
        <Grid xs={24} justify="center">
          <Card width="100%">
            <Text h1 my={0}>
              결제가 실패되었습니다.
            </Text>
            <Text>예약 페이지로 돌아가서 다시 결제 해 주세요.</Text>
            <Card.Footer>
              <Link color href="/booking">
                클래스 예약 페이지로 돌아가기
              </Link>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default Fail
