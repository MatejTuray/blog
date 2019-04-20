import React from "react"
import { Link, graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Bio from "../components/bio"
import Layout from "../components/layout"
import { rhythm } from "../utils/typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Pagination from "material-ui-flat-pagination"
const theme = createMuiTheme()
class PaginatedIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = { offset: 0 }
  }
  handleClick(offset, page) {
    console.log(offset, page)
    console.log(this.props)
    this.setState({ offset: offset })
    navigate(`/${page === 1 ? "" : page}`)
    console.log("click")
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Domov"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug} style={{ marginBottom: "2rem" }}>
              <Img
                sizes={node.frontmatter.featuredImage.childImageSharp.sizes}
              />
              <h3
                style={{
                  marginTop: "2rem",
                  marginBottom: rhythm(1 / 2),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <p>{node.frontmatter.date}</p>
            </div>
          )
        })}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
              limit={1}
              offset={this.state.offset}
              total={numPages}
              onClick={(e, offset, page) => {
                console.log(offset, page)
                this.handleClick(offset, page)
              }}
            />
          </MuiThemeProvider>
        </div> */}

        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Novšie príspevky
          </Link>
        )}
        {!isLast && (
          <Link to={nextPage} rel="next">
            Staršie príspevky
          </Link>
        )}
      </Layout>
    )
  }
}
export default PaginatedIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD.MM.YYYY")
            title
            description
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
