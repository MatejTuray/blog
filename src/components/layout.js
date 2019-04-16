import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            color: `#f50057`,
            textShadow: "none",
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              backgroundImage: `none`,
              textShadow: "none",
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Roboto Condensed`,
            marginTop: 0,
            color: `#f50057`,
            textShadow: "none",
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              backgroundImage: `none`,
              textShadow: "none",
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          marginTop: '1rem',
          marginBottom: '1rem',
          borderRadius: 10,
          boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
          maxWidth: rhythm(48),
          padding: `5.37rem 1.185rem`,
          textShadow: "none",
          
        }}
      >
        <header style={{ textShadow: "none" }}>{header}</header>
        <main style={{ textShadow: "none" }}>{children}</main>
        <footer style={{ textShadow: "none" }}>
          © {new Date().getFullYear()}, Tento blog poháňa veľký
          {` `}
          <a style={{ textShadow: "none" }} href="https://www.gatsbyjs.org">
            Gatsby
          </a>
        </footer>
      </div>
    )
  }
}

export default Layout
