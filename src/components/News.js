import React from 'react';
import {parseISOString} from "../utils";
import styles from '../styles/News.module.scss'

const NewsItem = ({newsItem}) => {
    return (
        <div className={styles.News__item}>
            <div className={styles.News__image} style={{backgroundImage:`url(${newsItem.urlToImage})`}}/>
            <div className={styles.News__content}>
                <div className={styles.News__meta}>{newsItem.publishedAt}</div>
                <a className={styles.News__link}><h4>{newsItem.title}</h4></a>
                <p className={styles.News__text}>{newsItem.description.substring(0, 20)}</p>
            </div>
        </div>

    )
};
//todo convert published at

const News = ({news}) => {

    const newsList = news.map((newsItem, i) => {
        return <NewsItem key={`${i}_${newsItem.publishedAt}`} newsItem={newsItem}/>
    })
    return (
        <div className={`${styles.News} box`}>
            <h3>Covid-News</h3>
            <div className={`${styles.News__inner}`}>
                <div>
                    {newsList}
                </div>
            </div>
        </div>
    );
};

export default News;