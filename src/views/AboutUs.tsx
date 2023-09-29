import React, { FC, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

import Grid from '../components/Grid'
import aboutUsStyle from '../assets/jss/views/aboutUsStyle'

type Props = {
  children?: ReactNode
}

const AboutUs: FC<Props> = ({ children, ...props }) => {
  const classes = aboutUsStyle(props)

  const title = 'About us'
  const description = 'Details about the app'

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className={classes.box}>
        <div className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <h1 className={classes.title}>{title}</h1>
              <h1 className={classes.subtitle}>{description}</h1>
              <div className={classes.page}>
                <button
                  onClick={() => {
                    const popupCenter = ({ url, title, w, h }) => {
                      // Fixes dual-screen position                             Most browsers      Firefox
                      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
                      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

                      const width = window.innerWidth
                        ? window.innerWidth
                        : document.documentElement.clientWidth
                        ? document.documentElement.clientWidth
                        : screen.width
                      const height = window.innerHeight
                        ? window.innerHeight
                        : document.documentElement.clientHeight
                        ? document.documentElement.clientHeight
                        : screen.height

                      const systemZoom = width / window.screen.availWidth
                      const left = (width - w) / 2 / systemZoom + dualScreenLeft
                      const top = (height - h) / 2 / systemZoom + dualScreenTop
                      const newWindow = window.open(
                        url,
                        title,
                        `
                        scrollbars=yes,
                        width=${w / systemZoom}, 
                        height=${h / systemZoom}, 
                        top=${top}, 
                        left=${left}
                        `
                      )

                      if (window.focus) newWindow.focus()
                    }
                    popupCenter({
                      url: 'http://serversso.test/login?app_id=01f5dbcf-4873-4681-b160-788c50ab23ff',
                      title: 'app',
                      w: 450,
                      h: 750
                    })
                  }}
                >
                  Open
                </button>
                <p>We do what we do because we have to do it.</p>
                <p>And we deserve to do it.</p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default AboutUs
