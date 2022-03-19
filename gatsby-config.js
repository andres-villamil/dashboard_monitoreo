//const path = require(`path`)

module.exports = {
  pathPrefix: `/visor/`,
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path:  `${__dirname}/src/markdown`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path:  `${__dirname}/src/pages/views/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path:  `${__dirname}/src/components/tablePhase/resources`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path:  `${__dirname}/src/components/layout/resources`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path:  `${__dirname}/src/components/planning/resources`,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Course",
        fieldName: "getCourse",
        url: "http://10.57.40.123:4466",
      },
    },
    /* {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: "http://10.57.40.123:4466",
      },
    }, */
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
  ] 
}