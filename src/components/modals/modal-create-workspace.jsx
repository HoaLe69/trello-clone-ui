import React, { useEffect } from 'react'
import ModalOverlay from './modal-overlay'
import styles from './modal.module.css'
import classNames from 'classnames/bind'
import Button from '../shared/button'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import {
  hideCreateModal,
  selectorShowOrHideModalWorkspace
} from '../../redux/modalSlice'
import { useFormik } from 'formik'
import { gradients } from '../../utils'
import { resetStatus } from '../../redux/workspaceSlice'
import { createWorkspace } from '../../redux/api-client/workspace'
import { BeatLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)

const CreateWorkspaceModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isOpen = useSelector(selectorShowOrHideModalWorkspace)
  const status = useSelector(state => state.workspace.status)
  const user = useSelector(state => state.auth.user)

  const validate = values => {
    const error = {}
    const { title } = values
    const fChar = title.charAt(0)
    if (!title) {
      error.title = 'Require'
    } else if ((fChar < 'a' || fChar > 'z') && (fChar < 'A' || fChar > 'Z')) {
      error.title = 'Title must start within a-z'
    }
    return error
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validate,
    onSubmit: values => {
      const themeKey = values.title.charAt(0).toUpperCase()
      const theme = JSON.stringify(gradients[themeKey])
      const data = {
        ...values,
        theme
      }
      if (!values.description) delete data.description
      console.log(data)
      if (user.userId)
        dispatch(createWorkspace({ userId: user.userId, workspace: data }))
    }
  })
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/workspace')
      dispatch(resetStatus())
      dispatch(hideCreateModal())
    }
  }, [status, navigate, dispatch])
  return (
    <ModalOverlay isOpen={isOpen}>
      <div className={cx('create_modal_wrap')}>
        <div className={cx('create_modal_body')}>
          <form className={cx('create_form')} onSubmit={formik.handleSubmit}>
            <span className={cx('form_title')}>
              Let&apos;t build a Workspace
            </span>
            <span className={cx('form_des')}>
              Boost your productivity by making it easier for everyone to access
              boards in one location
            </span>
            <label className={cx('form_label')}>Workspace name</label>
            <input
              className={cx('form_input')}
              name="title"
              placeholder="Taco Co"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className={cx('form_input_des')}>
              This is the name of your company, team or organization
            </span>
            <label className={cx('form_label')}>
              Workspace description{' '}
              <span className={cx('form_label_note')}>Optional</span>
            </label>
            <textarea
              name="description"
              className={cx('form_input_textarea')}
              rows={6}
              placeholder="Our team organizes everything here"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            <span className={cx('form_input_des')}>
              Get your member on board with a few words about your Workspace
            </span>
            <Button
              disable={!(!!formik.errors.title || !!formik.values.title)}
              type="submit"
            >
              {status === 'loading' ? (
                <BeatLoader color="#fff" size={5} />
              ) : (
                'Continue'
              )}
            </Button>
          </form>
        </div>
        <span
          onClick={() => dispatch(hideCreateModal())}
          className={cx('close_modal_btn')}
        >
          <IoCloseSharp />
        </span>
      </div>
    </ModalOverlay>
  )
}

export default CreateWorkspaceModal
