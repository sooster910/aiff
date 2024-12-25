import { BookingClassForm } from '@app/components/Forms/BookingClassForm'
import SuspenseWrapper from '@app/components/SuspenseWrapper'

const BookingPage = () => {
  return (
    <SuspenseWrapper fallback={<p>...loading</p>}>
      <BookingClassForm />
    </SuspenseWrapper>
  )
}
export default BookingPage
