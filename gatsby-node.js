const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    return graphql(
        `
            {
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: DESC }, 
                    limit: 1000,
                    filter: { frontmatter: { published: { eq: true } } }
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                path
                                title
                                tags
                            }
                        }
                    }
                }
            }
        `
    ).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach((post, index) => {
            const previous = index === posts.length - 1 ? null : posts[index + 1].node
            const next = index === 0 ? null : posts[index - 1].node

            // PROBLEM: `gatsby develop` crashes when we create new blog post directories
            // SOLUTION: ignore the post if we don't have basic data set in the frontmatter yet
            if (!post.node.frontmatter.path) {
                return null;
            }

            createPage({
                path: post.node.frontmatter.path,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug,
                    previous,
                    next,
                },
            })
        })

        // Tag pages:
        const tagTemplate = path.resolve('src/templates/tag-post-list.js')
        let tagList = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
            let {
                node: {
                    frontmatter: { tags },
                },
            } = edge
            if (tags) {
                tagList = tagList.concat(tags)
            }
        })
        // Eliminate duplicate tags
        tagList = [...new Set(tagList)]

        // add index page
        const tagPage = path.resolve('src/pages/tag-list.js')
        createPage({
            path: '/tags',
            component: tagPage,
            context: {
                tags: tagList.sort(),
            },
        })

        // Make tag pages
        tagList.forEach(tag => {
            createPage({
                path: `/tags/${_.kebabCase(tag)}/`,
                component: tagTemplate,
                context: {
                    tag,
                },
            })
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}
