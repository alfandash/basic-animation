import React, { useState, useEffect, useRef, useLayoutEffect }from 'react';
import styled from 'styled-components';

export default function Reveal() {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return ('null')
  }

  return <RevealChild />
}

function RevealChild(props) {

  const [show, doShow] = useState({ itemOne: false, itemTwo: false, itemThree: false})
  const [percent, setPercentShow] = useState({ itemThree: 0 })
  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);

  useLayoutEffect(() => {

    const topPositionDiv1 = refOne.current.getBoundingClientRect().top;
    const topPositionDiv2 = refTwo.current.getBoundingClientRect().top;
    const botPositionDiv3 = refThree.current.getBoundingClientRect().bottom;
    const topPositionDiv3 = refThree.current.getBoundingClientRect().top

    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      // console.log(window.scrollY + window.innerHeight, topPositionDiv1, topPositionDiv2)
      // console.log(window.scrollY + window.innerHeight, botPositionDiv1)

      if (topPositionDiv1 < scrollPosition) {
        doShow(state => ({ ...state, itemOne: true}))
      } 
      
      if (topPositionDiv2 < scrollPosition) {
        doShow(state => ({ ...state, itemTwo: true}))
      }

      if (topPositionDiv3 < scrollPosition - 200) {
        doShow(state => ({ ...state, itemThree: true}))
      }

      // console.log(topPositionDiv3, scrollPosition, (topPositionDiv3 - scrollPosition)/ 10);
      if (scrollPosition > topPositionDiv3) {
        // console.log(botPositionDiv3, scrollPosition, botPositionDiv3 - scrollPosition);
        setPercentShow(state => ({ ...state, itemThree: (topPositionDiv3 - scrollPosition)/ 10}))
      }
    }
    
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    };
  }, [])

  return (
    <>
      <br></br>
      <br></br>
      <Div animate={show.itemOne} ref={refOne}>
        {/* <p>test</p> */}
      </Div>
      <br></br>
      <Div animate={show.itemTwo} ref={refTwo}>
        {/* <p>test</p> */}
      </Div>
      <br></br>
      <Div animate={show.itemThree} ref={refThree} percentShown={percent.itemThree}>
        {/* <p>test</p> */}
      </Div>
    </>
  )
  
}


// component we are animating
const Div = styled.div`
  transform: translateX(${({ animate }) => (animate? "0" : "-100vw")});
  transition: transform 1s;
  height: 900px;
  width: 300px;
  background-color: red;
  transform: translateY(${({ percentShown }) => `${percentShown}px`});
/* i'm using destructuring on the prop above */
`;