import React from 'react'
import { Link, graphql } from 'gatsby'
import _get from 'lodash/get'
import _sortBy from 'lodash/sortBy'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

class GearIndex extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const posts = _get(data, 'allMarkdownRemark.edges', [])

        // PROBLEM: having this inline in the JSX below is causing VS Code to severely increase input lag on that line
        // SOLUTION: (for now) just extract it here
        const keywords = ['gabriel', 'ricard', 'running', 'code', 'developer', 'fitness']


        // PROBLEM: I want to sort these posts by an arbitrary order represented by frontmatter.running_gear_order
        //          but I can't get the GraphQL query to sort on that. 
        //          I don't know where/how frontmatter___date is created, but maybe I can create a custom sort field?
        // SOLUTION: (for now) using lodash.sortBy inline in the code below to sort after the fact
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Running Gear" keywords={keywords} />

                <h1>Running Gear</h1>
                <p>
                    I like gadgets and gear. I get fairly nerdy about it. These articles cover the gear I use for running and how they benefit me.
                </p>

                {!posts || posts.length < 1 ? (
                    <p>
                        <em>Sorry, there are no gear posts yet. Please check back soon.</em>
                    </p>
                ) : _sortBy(posts, o => _get(o, 'node.frontmatter.running_gear_order')).map(({ node }) => {
                    const title = node.frontmatter.title || node.fields.slug
                    return (
                        <div key={node.fields.slug}>
                            <h3
                                style={{
                                    marginBottom: rhythm(1 / 4),
                                }}
                            >
                                <Link style={{ boxShadow: `none` }} to={node.frontmatter.path}>
                                    {title} ({_get(node, 'frontmatter.running_gear_order')})
                                </Link>
                            </h3>
                            <small>{node.frontmatter.date}</small>
                            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                        </div>
                    )
                })}
            </Layout>
        )
    }
}

export default GearIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: ASC }
            filter: { frontmatter: { running_gear_page: { eq: true } } }
        ) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        path
                        running_gear_order
                    }
                }
            }
        }
    }
`
