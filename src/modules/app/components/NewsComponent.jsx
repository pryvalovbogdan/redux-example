import React from 'react';
import { NewsLink, NewsImage, NewsBlock } from './styledComponents';

export const NewsComponent= ({ url, title, urlToImage }) => (<NewsBlock>
    <NewsLink href={url} target={'blank'}>
      <NewsImage
        src={ urlToImage }
        alt={"Image haven't downloaded"}
      />
    </NewsLink>
    <NewsLink href={url} target={'blank'}>{title}</NewsLink>
  </NewsBlock>);
