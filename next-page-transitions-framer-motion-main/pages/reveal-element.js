import React, { useLayoutEffect, useEffect, useRef, useState, Component } from 'react';
import styled from "styled-components";

export default function RevealElement() {
  const [showChild, setShowChild] = useState(false);
  
  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);
  
  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }

  return <Child />
};

function Child(props) {
  const [show, doShow] = useState({
    itemOne: false,
    itemTwo: false,
    itemThree: false
  });
  const [percentShown, setPercentShow] = useState({
    itemOne: 0,
    itemTwo: 0,
    itemThree: 0
  });
  const ourRef = useRef(null),
    anotherRef = useRef(null),
    refThree = useRef(null);

  useLayoutEffect(() => {
    const topPos = (element) => element.getBoundingClientRect().top;
    const bottomPos = (element) => element.getBoundingClientRect().bottom;
    const div1Pos = topPos(ourRef.current),
      div2Pos = topPos(anotherRef.current),
      div3Pos = topPos(refThree.current);
    const div3Bottom = bottomPos(refThree.current);

    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      if (div1Pos < scrollPos) {
        doShow((state) => ({ ...state, itemOne: true }));
      } else if (div2Pos < scrollPos) {
        doShow((state) => ({ ...state, itemTwo: true }));
      } else if (div3Pos < scrollPos) {
        doShow((state) => ({ ...state, itemThree: true }));
      }

      // Check if element is at bottom or past
      if (scrollPos > div3Bottom) {
        console.log(div3Bottom, scrollPos, div3Bottom - scrollPos);
        setPercentShow((prevState) => ({
          ...prevState,
          itemThree: div3Bottom - scrollPos
        }));
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [refThree]);

  // console.log(refThree)
  return (
    <>
      <p>scroll down</p>
      <Wrapper>
        <Div
          animate={show.itemThree}
          percentShown={percentShown.itemThree}
          ref={refThree}
          zIndex={3}
        >
          <p>tag here</p>
          <p>tag here</p>
          <p>tag here</p>
          <p>tag here</p>
        </Div>
        <Div animate={show.itemTwo} ref={anotherRef} zIndex={2} />
        <Div animate={show.itemOne} ref={ourRef} zIndex={1} />
      </Wrapper>
    </>
  );
}

const Div = styled.div`
  height: 900px;
  width: 300px;
  background-color: red;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")})
    translateY(${({ percentShown }) => `${percentShown}px`});
  transition: transform 1s;
  margin: 20px;
  z-index: ${({ zIndex }) => zIndex};
`;

const Wrapper = styled.div`
  margin-top: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
`;