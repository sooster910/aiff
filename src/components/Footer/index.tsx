import { Grid, Text } from '@geist-ui/core'
import * as React from 'react'

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = props => {
  return (
    <footer>
      <Grid.Container>
        <Grid>
          <Text b>Copyright&copy; 아이프. All Rights Reserved </Text>
          <Text p small>
            통신판매번호 2022-서울용산-0497
          </Text>

          <Text p small>
            사업자등록번호: 202-18-07282{' '}
          </Text>
          <Text p small>
            대표 : 김현정
          </Text>
          <Text p small>
            서울특별시 용산구 한강대로 69, 상가동 지하1층 B125-1호(한강로2가,
            용산푸르지오써밋)
          </Text>
          <Text p small>
            {' '}
            대표번호: 070 - 8887 - 1053
          </Text>
        </Grid>
      </Grid.Container>
    </footer>
  )
}

export default Footer
