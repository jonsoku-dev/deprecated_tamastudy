import React from 'react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import { TodayNewsItem } from '../components/organisms';

const Wrapper = styled('div')`
  margin-top: 100px;
  .swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
`;

const Test = () => {
  const test1 = { id: 1, name: 'yahoo' };
  const test2 = { id: 2, name: 'naver' };
  const test3 = { id: 3, name: 'nate' };
  const test4 = { id: 4, name: 'yahoojp' };
  const test5 = { id: 5, name: 'line' };
  return (
    <Wrapper>
      <Swiper
        slidesPerView="auto"
        spaceBetween={7}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        rebuildOnUpdate
      >
        <div>
          <TodayNewsItem key={test1.id} name={test1.name} />
        </div>
        <div>
          <TodayNewsItem key={test2.id} name={test2.name} />
        </div>
        <div>
          <TodayNewsItem key={test3.id} name={test3.name} />
        </div>
        <div>
          <TodayNewsItem key={test4.id} name={test4.name} />
        </div>
        <div>
          <TodayNewsItem key={test5.id} name={test5.name} />
        </div>
      </Swiper>
    </Wrapper>
  );
};

Test.propTypes = {
  //
};

export default Test;
