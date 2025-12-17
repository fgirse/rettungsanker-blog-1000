"use client"

import * as React from 'react';

type Article = {
  date: Date;
  author: string;
  title: string;
  minsLength: number;
};

type GridLayoutArticleHeaderProps = {
  article: Article;
  position: number;
};

const GridLayoutArticleHeader: React.FC<GridLayoutArticleHeaderProps> = ({ article, position }) => {
    // Handle undefined article
    if (!article) {
      return (
        <div className="article k-d-flex" key={position}>
          <div className="article-position k-d-inline-flex k-text-primary k-font-weight-bold">{`0${position}`}</div>
          <div className="article-description k-d-flex-col">
            <div className="author">No article</div>
            <div className="title k-font-weight-bold">Loading...</div>
            <div className="date k-d-flex">
              <div>N/A</div>
              <div className="separator">|</div>
              <div>N/A</div>
            </div>
          </div>
        </div>
      );
    }

    const formattedDate = article.date.toLocaleString('en-us', { month: 'short' }) + ' ' + article.date.getDate();

    return (
    <div className="article k-d-flex" key={position}>
      <div className="article-position k-d-inline-flex k-text-primary k-font-weight-bold">{`0${position}`}</div>
      <div className="article-description k-d-flex-col">
        <div className="author">{article.author}</div>
        <div className="title k-font-weight-bold">{article.title}</div>
        <div className="date k-d-flex">
          <div>{formattedDate}</div>
          <div className="separator">|</div>
          <div>{article.minsLength} min read</div>
        </div>
      </div>
    </div>
    );
};

export default GridLayoutArticleHeader;
