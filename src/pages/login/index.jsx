import classNames from 'classnames/bind'
import React, { useEffect } from 'react'
import styles from './loginPage.module.css'
import Logo from '../../components/shared/logo'
import Button from '../../components/shared/button'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/api-client/auth'
import { BeatLoader } from 'react-spinners'

const cx = classNames.bind(styles)

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const status = useSelector(state => state.auth.status)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      dispatch(login(values))
    }
  })

  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    if (token) navigate('/workspace')
  }, [token, navigate])
  const error = useSelector(state => state.auth.error)
  return (
    <div className={cx('container')}>
      <form className={cx('form')} onSubmit={formik.handleSubmit}>
        <div className={cx('form_inner')}>
          <div className={cx('form_header')}>
            <Logo href="/" />
            <span>Login in to continue</span>
          </div>
          <div className={cx('form_container_input')}>
            <input
              type="email"
              className={cx('form_input')}
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <input
              type="password"
              className={cx('form_input')}
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="form_button">
            <Button type="submit">
              {status === 'loading' ? (
                <BeatLoader color="#fff" size={5} />
              ) : (
                'Login'
              )}
            </Button>
          </div>
          <div>
            <Link to="/register" href="/" className={cx('form_link')}>
              Create an account
            </Link>
            {/* <a href="/" className={cx('form_link')}> */}
            {/*   Forget password ? */}
            {/* </a> */}
          </div>
        </div>
        {error && <span>{error}</span>}
      </form>
    </div>
  )
}

export default LoginPage
