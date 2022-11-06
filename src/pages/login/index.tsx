import { useAuth } from '@app/hooks/useAuth'
import { Button } from '@geist-ui/core'

import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
// import { RedirectUrlByRole } from '../../types/auth'

type Props = {}
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})
const LoginPage = (props: Props) => {
  const auth = useAuth()
  const router = useRouter()
  if (auth?.user) {
    router.push('/')
  }

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: async (values): Promise<void> => {
      // const user = await auth.login(values)
      // if (user?.role) {
      //   router.push(RedirectUrlByRole[user?.role])
      // }
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <Input
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        /> */}
        <Button color="primary">Submit</Button>
      </form>
    </div>
  )
}

export default LoginPage
