import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import Header from './Header'
import Footer from './Footer'

class Layout extends React.Component {
    render() {
        const { location, title, children } = this.props
        const rootPath = `${__PATH_PREFIX__}/`
        const header = (
            <Header role="banner" title={title} location={location} />
        );

        return (
            <div
                style={{
                    marginLeft: `auto`,
                    marginRight: `auto`,
                    maxWidth: rhythm(24),
                    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                }}
            >
                {header}
                <div style={{paddingTop: '60px'}}>
                {children}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Layout
