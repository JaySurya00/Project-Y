'use client'
import { Box, Typography } from "@mui/material";
import Tweet from "./tweet/tweets";
import { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";

export default function Timeline() {
    const [tweets, setTweets] = useState([]);
    const { doRequest, errors } = useRequest({
        method: 'get',
        url: '/api/feeds',
    })
    useEffect(() => {
        const fetchTweets = async () => {
            const tweets = await doRequest();
            console.log('from timeline', tweets);
            if(tweets){
                setTweets(tweets);
            }
        }
        fetchTweets();
    }, [])
    console.log(tweets);
    return (
        <>
            { tweets.length > 0 ? tweets.map((tweet) => { return (<Tweet key={tweet.tweet._id} tweet={tweet.tweet} />) }) : <p>There are no tweets from your followee.</p> }
        </>
    );
}
