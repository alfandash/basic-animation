import { Component } from 'react'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import StyledLink from "../components/StyledLink";

function FeatureItem({ title, subtitle, icon, isLeftAligned, color }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.3,
      }}
      className={`${
        isLeftAligned ? "has-text-left-desktop" : "has-text-right-desktop"
      } mb-6`}
    >
      <div className={`icon has-text-${color || "primary"} is-large mb-2`}>
        <i className={`fas ${icon} fa-3x`} />
      </div>
      <h3 className="title has-text-weight-bold is-spaced is-5">{title}</h3>
      <p className="subtitle is-6 has-text-grey">{subtitle}</p>
    </motion.div>
  );
}

export default class Features extends Component {
  constructor(props) {
    super(props);
    // If we comment out the following line,
    // we will get run time error said `this` is undefined.
    this.handleScroll = this.handleScroll.bind(this);
  }

  state = {
    midColumnRender: false
  }

  isBottom = (el) => {
    console.log(el.getBoundingClientRect().bottom, window.innerHeight)
    return el.getBoundingClientRect().bottom <= -200;
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    console.log(this.state)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(e) {
    e.preventDefault()

    const {midColumnRender} = this.state

    const wrappedElement = document.getElementById('mid-column');

    if (!wrappedElement) {
      console.log("null")
      return;
    }

    if (this. isBottom(wrappedElement)) {
      console.log('header bottom reached');
      if (!midColumnRender) {
        this.setState({
          midColumnRender: true
        })
        // window.removeEventListener('scroll', this.handleScroll)
      }
    }

    // console.log(e)
  }

  render () {
    const { midColumnRender } = this.state;
    return (
      <section className="hero section is-block is-relative is-medium">
        <div className="container" id="main-container">
          <div className="columns is-vcentered is-variable is-desktop">
            <div className="column is-8 is-offset-2">
              <motion.h1
                className="title has-text-weight-bold is-1 is-size-2-mobile is-spaced"
                layoutId="title"
              >
                The only Todo App you'll ever need
              </motion.h1>
            </div>
          </div>
          <div className="columns is-vcentered is-variable is-4 is-desktop mt-6" >
            <div className="column is-12 is-2-desktop" id="mid-column">
              <div>
                <FeatureItem
                  title="Powerful"
                  subtitle="Todo like you've never done before"
                  icon="fa-check-double"
                  color="danger"
                />
                <FeatureItem
                  title="Organized"
                  subtitle="Never miss anything"
                  icon="fa-list-ol"
                />
                <FeatureItem
                  title="Watertight"
                  subtitle="Todo where you do best"
                  icon="fa-bath"
                  color="info"
                />
              </div>
            </div>
           
            <div className="column is-1" />
            <div className="column">
              <motion.figure className="image" layoutId="image">
                <Image
                  src="/assets/task.png"
                  layout="responsive"
                  width={780}
                  height={501}
                />
              </motion.figure>
            </div>
            <div className="column is-1" />
            <div className="column is-12 is-2-desktop">
              <div>
                <FeatureItem
                  isLeftAligned
                  title="Easy"
                  subtitle="Anyone can do it"
                  icon="fa-baby"
                />
                <FeatureItem
                  isLeftAligned
                  title="Goodbye paper"
                  subtitle="Don't write anything down, todo it!"
                  icon="fa-book-dead"
                  color="danger"
                />
                <FeatureItem
                  isLeftAligned
                  title="Intelligent"
                  subtitle="It knows what's to be done so you can to do"
                  icon="fa-brain"
                  color="warning"
                />
              </div>
            </div>
          </div>
          <motion.div
            className="is-spaced has-text-centered"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/other-index" passHref>
              <StyledLink>To done it</StyledLink>
            </Link>
          </motion.div>
        </div>
        {
          midColumnRender ? (
            <>
            <div className="container">
              <div className="columns is-vcentered is-variable is-4 is-desktop mt-6" >
                <div className="column is-12 is-2-desktop" id="mid-column">
                  <div>
                    <FeatureItem
                      title="Powerful"
                      subtitle="Todo like you've never done before"
                      icon="fa-check-double"
                      color="danger"
                    />
                    <FeatureItem
                      title="Organized"
                      subtitle="Never miss anything"
                      icon="fa-list-ol"
                    />
                    <FeatureItem
                      title="Watertight"
                      subtitle="Todo where you do best"
                      icon="fa-bath"
                      color="info"
                    />
                  </div>
                </div>
              
                <div className="column is-1" />
                <div className="column">
                  <motion.figure className="image" layoutId="image">
                    <Image
                      src="/assets/task.png"
                      layout="responsive"
                      width={780}
                      height={501}
                    />
                  </motion.figure>
                </div>
                <div className="column is-1" />
                <div className="column is-12 is-2-desktop">
                  <div>
                    <FeatureItem
                      isLeftAligned
                      title="Easy"
                      subtitle="Anyone can do it"
                      icon="fa-baby"
                    />
                    <FeatureItem
                      isLeftAligned
                      title="Goodbye paper"
                      subtitle="Don't write anything down, todo it!"
                      icon="fa-book-dead"
                      color="danger"
                    />
                    <FeatureItem
                      isLeftAligned
                      title="Intelligent"
                      subtitle="It knows what's to be done so you can to do"
                      icon="fa-brain"
                      color="warning"
                    />
                  </div>
                </div>
              </div>
              <motion.div
                className="is-spaced has-text-centered"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/other-index" passHref>
                  <StyledLink>To done it</StyledLink>
                </Link>
              </motion.div>
        </div>
            </>
          ) : ('')
        }
        
      </section>
    );
  }
}
