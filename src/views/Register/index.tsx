import React, {ChangeEvent, FC, ReactNode, useContext, useId, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import registerStyle from "../../assets/jss/views/registerStyle"
import * as Yup from 'yup'

import {EventContext} from '../../components/EventMessage'

type Props = {
    children?: ReactNode
}

interface State {
    name: string
    email: string
    username: string
    password: string
    showPassword: boolean
}

const Register: FC<Props> = ({children, ...props}) => {
    const classes = registerStyle(props)
    const title = 'Register'
    const description = 'Welcome Register'
    const [values, setValues] = useState<State>({
        name: '',
        email: '',
        username: '',
        password: '',
        showPassword: false
    })
    const eventContext = useContext(EventContext)
    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }
    const RegisterSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string().min(5).max(16).required('Password is required'),
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
    });
    const onClickRegister = async (e: HTMLFormElement) => {
        e.preventDefault();
        try {
            const user = await RegisterSchema.validate(values)
            console.log(user)
        } catch (e: any) {

            eventContext?.addNewEvent({message: e.message, event: 'error'})
        }
    }

    const nameId = useId()
    const usernameId = useId()
    const emailId = useId()
    const passwordId = useId()
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Helmet>
            <form className={classes.form}>
                <h3 className={classes.h3}>Register Here</h3>
                <div>
                    <label className={classes.label} htmlFor={nameId}>Name</label>
                    <input className={classes.input}
                           onChange={handleChange('name')}
                           value={values.name}
                           type="text" name="name"
                           placeholder="Name"
                           id={nameId}/>
                </div>
                <div>
                    <label className={classes.label} htmlFor={emailId}>Email</label>
                    <input className={classes.input}
                           onChange={handleChange('email')}
                           value={values.email}
                           type="email" name="email"
                           placeholder="Email"
                           id={emailId}/>
                </div>
                <div>
                    <label className={classes.label} htmlFor={usernameId}>Username</label>
                    <input className={classes.input}
                           onChange={handleChange('username')}
                           value={values.username}
                           type="text" name="username"
                           placeholder="Username"
                           id={usernameId}/>
                </div>
                <div className={classes.divBlock}>
                    <label className={classes.label} htmlFor={passwordId}>Password</label>
                    <input className={classes.input}
                           type={values.showPassword ? "text" : "password"} name="password"
                           onChange={handleChange('password')}
                           value={values.password}
                           placeholder="Password"
                           id={passwordId}/>
                    <span onClick={handleClickShowPassword}
                          className={classes.span}>
    <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
        d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"/></svg>
  </span>
                </div>
                <button onClick={onClickRegister}
                        className={classes.button}
                >Register
                </button>
            </form>
        </>
    )
}

export default Register
