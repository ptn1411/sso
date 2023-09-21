import React, {ChangeEvent, FC, ReactNode, useId, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import loginStyle from "../../assets/jss/views/loginStyle";

type Props = {
    children?: ReactNode
}

interface State {
    username: string
    password: string
    showPassword: boolean
}

const Login: FC<Props> = ({children, ...props}) => {
    const classes = loginStyle(props)
    const title = 'Login'
    const description = 'Welcome'
    const [values, setValues] = useState<State>({
        username: '',
        password: '',
        showPassword: false
    })

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }
    const usernameId = useId()

    const passwordId = useId()
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Helmet>

            <form className={classes.form} method="post">
                <h3 className={classes.h3}>Login Here</h3>
                <div>
                    <label className={classes.label} htmlFor={usernameId}>Username</label>
                    <input className={classes.input}
                           onChange={handleChange('username')}
                           value={values.username}
                           type="text" name="username"
                           placeholder="Email or Username"
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
                <button className={classes.button}>Log In</button>
            </form>
        </>
    )
}

export default Login
