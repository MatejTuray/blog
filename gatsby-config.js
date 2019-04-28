module.exports = {
  siteMetadata: {
    title: `Bodka.js`,
    author: `Matej Turay`,
    description: "Osobný blog",
    siteUrl: `https://matejturay.sk`,
    social: {
      twitter: `MatejTuray`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://gmail.us20.list-manage.com/subscribe/post?u=136ad7872b8ae9e3ac32dd28d&id=f3d3b89fc0", // see instructions at official plugin page
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: fluidResult =>
                `flex:${_.round(fluidResult.aspectRatio, 2)};`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-reading-time`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-138502292-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Bodka.js - Matej Turay",
        short_name: `"Bodka.js`,
        start_url: `/`,
        background_color: `#f50057`,
        theme_color: `#f50057`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
    },
  ],
}
