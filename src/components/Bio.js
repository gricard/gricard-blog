import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

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
                        }}
                    >
                        <p>
                            My thoughts on random things, like running, fitness, paintball, life, etc. I also rant about
                            software over at <a href="https://cdgd.tech">cdgd.tech</a>, and{' '}
                            <a href={`https://twitter.com/${social.twitter}`}>twitter</a>.<br />
                            Here's my list of <a href="/gear">running gear</a>
                        </p>
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
