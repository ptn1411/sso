import { HelmetServerState } from 'react-helmet-async'

const renderFullPage = (
  html: string,
  css: string,
  fontAwesomeCss: string,
  styleTags: string,
  store: string,
  helmet: Partial<HelmetServerState>,
  scriptTags: string
): string => `<!DOCTYPE html>
<html ${helmet?.htmlAttributes?.toString()}>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&amp;display=swap">
    <link rel="stylesheet" type="text/css" href="${
      process.env.STATIC_FILES_URL ? `${process.env.STATIC_FILES_URL}/bundle.css` : `/bundle.css`
    }" />
    
    ${helmet?.title?.toString()}
    ${helmet?.meta?.toString()}
    ${helmet?.link?.toString()}
    ${styleTags}
    <style id="jss-server-side">${css}</style>
    <style id="fontawesome-server-side">${fontAwesomeCss}</style>
  </head>
  <body>
    <noscript>Sorry, your browser does not support JavaScript!</noscript>
    <div id="root">${html}</div>
    <script>window.__PRELOADED_STATE__ = ${store}</script>
    ${scriptTags}
  </body>
</html>`

export default renderFullPage
