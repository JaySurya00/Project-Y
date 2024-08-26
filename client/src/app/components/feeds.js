'use client'
import Tweets from "../components/tweets";
import { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";
import { Box, CircularProgress } from "@mui/material";

export default function Feeds() {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { doRequest, errors } = useRequest({
        method: 'get',
        url: '/api/feeds',
    })
    useEffect(() => {
        const fetchTweets = async () => {
            const tweets = await doRequest();
            if (tweets) {
                setTweets(tweets);
            }
            setLoading(false);
        }
        fetchTweets();
    }, [])
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    }
    return (
        <>
            {tweets.length > 0 ? tweets.map((tweet) => { return (<Tweets key={tweet.tweet._id} tweet={tweet.tweet} />) }) : <p>There are no tweets from your followee.</p>}
        </>
    );
}