import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { DiscussionEmbed } from "disqus-react"
import Chip from "@material-ui/core/Chip"
import { withStyles } from "@material-ui/core/styles"
import Subscribe from "../components/subscribe"
import Portal from "@material-ui/core/Portal"

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing.unit,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const disqusShortname = "matejturay"
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    }
    const { classes } = this.props
    return (
      <div>
        <Img sizes={post.frontmatter.featuredImage.childImageSharp.fluid} />

        <Layout location={this.props.location} title={siteTitle}>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />

          <h1 style={{ marginBottom: `2rem` }}>{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(0.1),
              marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date}
            <br />
            {"Dĺžka: " +
              Math.round(post.fields.readingTime.minutes) +
              " " +
              "minúty"}
          </p>

          <ul style={{ marginTop: `1rem` }}>
            {post.frontmatter.tags.map(tag => (
              <Chip
                label={tag}
                className={this.props.classes.chip}
                color="secondary"
              />
            ))}
          </ul>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Subscribe />
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </Layout>
      </div>
    )
  }
}

export default withStyles(styles)(BlogPostTemplate)

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        description
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1920, maxHeight: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
        readingTime {
          minutes
        }
      }
    }
  }
`
