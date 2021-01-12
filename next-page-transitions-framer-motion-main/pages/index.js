import { Component } from 'react'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import StyledLink from "../components/StyledLink";

export default class Home extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }


 

  handleScroll(e) {
    e.preventDefault()

    const isBottom = (el) => {
      console.log(el)
      return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const wrappedElement = document.getElementById('header');

    if (!wrappedElement) {
      console.log("null")
      return;
    }

    if (isBottom(wrappedElement)) {
      console.log('header bottom reached');
      // document.removeEventListener('scroll', this.trackScrolling);
    }

    // console.log(e)
  }
  render () {
    return (
      <section className="hero section is-block is-relative is-medium">
        <div className="container">
          <div className="columns is-vcentered is-desktop">
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
            <div className="column is-8-desktop has-text-centered-touch">
              <header>
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="title has-text-weight-bold is-1 is-size-2-mobile is-spaced"
                  layoutId="title"
                >
                  The only Todo App you'll ever need
                </motion.h1>
                <motion.p
                  className="subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Imagine if you never had to write another Todo App example ever
                  again. Now you don't have to imagine.
                </motion.p>
              </header>
              <motion.div
                className="buttons is-inline-flex mt-5"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, x: { duration: 1 }}}
              >
                <Link href="/features" passHref>
                  <StyledLink>Do it</StyledLink>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
}
