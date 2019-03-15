/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import SocialMediaIcons from "react-social-media-icons"
import { rhythm } from "../utils/typography"
import { FaGithubAlt, FaFacebookF, FaLinkedinIn } from "react-icons/fa"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  fixed={data.avatar.childImageSharp.fixed}
                  alt={author}
                  style={{
                    marginRight: rhythm(1 / 2),
                    marginBottom: 0,
                    minWidth: 50,
                    borderRadius: `100%`,
                  }}
                  imgStyle={{
                    borderRadius: `50%`,
                  }}
                />
                <p
                  style={{
                    marginTop: `1.3rem`,
                  }}
                >
                  Volám sa <strong>{author}</strong> a toto je môj osobný blog.
                  Píšem o rôznych témach ohľadom JavaScriptu, Reactu, Node.js a
                  pod.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FaGithubAlt
                  size={`2rem`}
                  fill={`black`}
                  onClick={() =>
                    window.location.replace("https://github.com/MatejTuray")
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />

                <FaFacebookF
                  size={`2rem`}
                  fill={`#4267b2`}
                  onClick={() =>
                    window.location.replace(
                      "https://www.facebook.com/matej.turay"
                    )
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />

                <FaLinkedinIn
                  size={`2rem`}
                  fill={`#0379b6`}
                  color={`white`}
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/matej-turay-4349b9155/"
                    )
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
