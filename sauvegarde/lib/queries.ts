export const pageQuery = `
  query HomeQuery($relativePath: String!) {
    page(relativePath: $relativePath) {
      title
      presentation {
        image
        title
        content
        imagePosition
      }
      services {
        ... on PageServicesService {
          serviceTitle
          image
          description
        }
      }
      accordion {
        title
        introText
        items {
          title
          content
        }
      }
      contactLinks {
        contactTitle
        contactDescription
        links {
          linkText
          linkUrl
        }
      }
    }
    postConnection(sort: "date", last: 5) {
      edges {
        node {
          _sys {
            filename
          }
          title
          client
          date
        }
      }
    }
  }`;
