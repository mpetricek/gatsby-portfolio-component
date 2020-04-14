import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import './portfolio.css'

export default () => {
    const data = useStaticQuery(graphql`
    query HeaderQuery {
      allDataJson {
        edges {
          node {
              name
              img {
                childImageSharp {
                    fluid(maxWidth: 4000) {
                    ...GatsbyImageSharpFluid_noBase64
                    }
                } 
              }
              link
              technologies
          }
        }
      }
    }
  `)

    const [lightBox, setLightBox] = React.useState(false)
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [slideSide, setSlideSide] = React.useState(null)

    const items = data.allDataJson.edges;

    const activeSlide = items[currentIndex].node

    const onClick = (index) => {
        setLightBox(true)
        setCurrentIndex(index)
    }

    const previous = () => {
        setSlideSide('left')
        currentIndex > 0 ?
            setCurrentIndex(currentIndex - 1)
            :
            setCurrentIndex(items.length - 1)
    }
    const next = () => {
        setSlideSide('right')
        currentIndex < items.length - 1 ?
            setCurrentIndex(currentIndex + 1)
            :
            setCurrentIndex(0)
    }

    return (
        <section className="portfolio">
            {items.map(({ node }, index) =>
            
                <div
                    key={index}
                    className="portfolio__item"
                    onClick={() => onClick(index)}>

                    {node.img &&
                        <div className="item__image">
                            <Img
                                fluid={node.img.childImageSharp.fluid}
                                alt={`${node.name} image`} />
                        </div>
                    }

                    <h2>{node.name}</h2>

                    {node.technologies &&
                        <div className="item__technologies">
                            {node.technologies.map((technology, index) =>
                                <p key={index}>{technology}</p>
                            )}
                        </div>
                    }

                    {node.link &&
                        <a href={node.link}>Open website</a>
                    }

                </div>

            )}

            {lightBox &&
                <div
                    className={`portfolio__lightbox`}>

                    <div
                        className="lightbox__overlay"
                        onClick={() => setLightBox(false)} />

                    <button
                        onClick={() => previous()}
                        className="lightbox__previous"
                    />

                    <div
                        className={`lightbox__content lightbox__content--slide-${slideSide}`}
                        onAnimationEnd={() => setSlideSide(null)}>

                        <button
                            onClick={() => setLightBox(!lightBox)}
                            className="lightbox__close"
                        />

                        {activeSlide.img &&
                            <div className="item__image">
                                <Img
                                    fluid={activeSlide.img.childImageSharp.fluid}
                                    alt={`${activeSlide.name} image`} />
                            </div>
                        }

                        <h2>{activeSlide.name}</h2>
                        {activeSlide.technologies &&
                            <div className="item__technologies">
                                {activeSlide.technologies.map((technology, index) =>
                                    <p key={index}>{technology}</p>
                                )}
                            </div>
                        }

                        {activeSlide.link &&
                            <a href={activeSlide.link}>Open website</a>
                        }

                    </div>

                    <button
                        onClick={() => next()}
                        className="lightbox__next"
                    />
                </div>
            }

        </section>
    )
}