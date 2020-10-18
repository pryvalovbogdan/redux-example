import React, { memo, useCallback, useEffect } from 'react';
import axios from 'axios';
import { shallowEqual, useDispatch, useSelector} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectorGetIsAppInit, selectorGetDataToDisplay } from './selectors';
import { actionAppPageInit, actionAppPageSetData, actionAppPageReset } from './actions'
import { Wrapper, GlobalStyles, Title, ResetButton } from './styledComponents';
import { NewsComponent, NewsWrapper } from './components';

export const App = memo(() => {
  const dispatch = useDispatch();
  const { isLoaded, dataToDisplay } = useSelector(
    createStructuredSelector({
      isLoaded: selectorGetIsAppInit,
      dataToDisplay: selectorGetDataToDisplay,
    }),
    shallowEqual,
  );

  const resetStore = useCallback(() => {
    dispatch(actionAppPageReset());
  }, [dispatch]);

  useEffect(() => {
    axios.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=145f2a210d2341e0b92b727456e8b81e')
      .then(res => {
        dispatch(actionAppPageInit('Loaded'));
        dispatch(actionAppPageSetData(res.data.articles));
      }).catch(e => {
        dispatch(actionAppPageInit('Failed to load'));
        console.error(e);
      });

    return () => resetStore();
  }, [dispatch]);


  return (
    <Wrapper>
      <Title>App news</Title>
      <Title>{`Data state is: ${isLoaded}`}</Title>
      <ResetButton onClick={resetStore}>Reset store</ResetButton>
      <NewsWrapper>
        {dataToDisplay.map(item => <NewsComponent
          key={item.title}
          title={item.title}
          url={item.url}
          urlToImage={item.urlToImage}
        />)}
      </NewsWrapper>
      <GlobalStyles />
    </Wrapper>
  )
});


