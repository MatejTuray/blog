import React from "react"
import { Link } from "gatsby"
import BottomAppBar from "./footer"
import { rhythm, scale } from "../utils/typography"
import { NavigateBefore } from "@material-ui/icons"
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
            color: `#512DA8`,
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
            ...scale(1.2),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            color: `#512DA8`,
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
            <NavigateBefore />
            {"Späť"}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          marginTop: "1rem",
          marginBottom: "1rem",
          borderRadius: 10,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          textShadow: "none",
        }}
      >
        <header style={{ textShadow: "none" }}>{header}</header>
        <main
          style={{
            textShadow: "none",
          }}
        >
          {children}
        </main>
        <footer style={{ textShadow: "none", marginTop: "5rem" }}>
          <BottomAppBar location={location} />
        </footer>
      </div>
    )
  }
}

export default Layout
