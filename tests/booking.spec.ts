import { expect, test } from '@playwright/test'
import { response } from 'express'

test.describe('AIFF 예약 시스템', () => {
  test('메인 페이지에 지점,시간표 예약링크가 노출되어야 한다.', async ({
    page,
  }) => {
    await page.goto('/')
    const bookingLink = page.getByRole('link', { name: '지점 시간표 / 예약' })
    console.log('bookingLinkk', bookingLink)
    // 링크가 존재하는지 확인
    expect(bookingLink).toBeVisible()

    // 링크의 href 속성이 올바른지 확인
    expect(bookingLink).toHaveAttribute('href', '/booking')

    // 링크 텍스트가 올바른지 확인
    expect(bookingLink).toHaveText('지점 시간표 / 예약')
  })
})
