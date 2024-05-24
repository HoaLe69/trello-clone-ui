import classNames from 'classnames/bind'
import React, { useEffect } from 'react'
import styles from '../login/loginPage.module.css'
import Logo from '../../components/shared/logo'
import Button from '../../components/shared/button'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { register } from '../../redux/api-client/auth'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'

const cx = classNames.bind(styles)

const Register = () => {
  const dispatch = useDispatch()
  // const auth = useSelector(state => state.auth.response)
  const status = useSelector(state => state.auth.status)
  const navigate = useNavigate()
  const formik = useFormik({

    initialValues: {
      email: '',
      password: '',
      retype_password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(50, 'Maximum 50 character')
        .required('Required')
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Please enter valid email address'
        ),
      password: Yup.string()
        .required('Required')
        .min(6, 'Minimun 6 characters')
        .matches(
          /(?=.*\d)(?=.*[a-zA-Z]).*/,
          'Include least one letter, one number'
        ),
      retype_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      )
    }),
    onSubmit: values => {
      const user = {
        email: values.email,
        password: values.password
      }
      dispatch(register(user))
      navigate('/login')
    }
  })
  return (
    <div className={cx('container')}>
      <form className={cx('form')} onSubmit={formik.handleSubmit}>
        <div className={cx('form_inner')}>
          <div className={cx('form_header')}>
            <Logo href="/" />
            <span>Welcome to Margelo </span>
          </div>
          <div className={cx('form_container_input')}>
            <input
              type="email"
              className={cx('form_input')}
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className={cx('form_error')}>{formik.errors.email}</span>
            ) : null}
            <input
              type="password"
              className={cx('form_input')}
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className={cx('form_error')}>{formik.errors.password}</span>
            ) : null}
            <input
              type="password"
              className={cx('form_input')}
              name="retype_password"
              placeholder="Retype your password"
              onChange={formik.handleChange}
              value={formik.values.retype_password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.retype_password && formik.errors.retype_password ? (
              <span className={cx('form_error')}>
                {formik.errors.retype_password}
              </span>
            ) : null}
          </div>
          <div className="form_button">
            <Button type="submit">
              {status === 'loading' ? (
                <BeatLoader color="#fff" size={5} />
              ) : (
                'Register'
              )}
            </Button>
          </div>
          <div>
            <Link to="/login" className={cx('form_link')}>
              Already have account ? Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
