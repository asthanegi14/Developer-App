import { useEffect, useState } from 'react';
import axios from 'axios';

const PageInsights = ({ pageId, accessToken, dateRange }) => {
    const [followersCount, setFollowersCount] = useState(0);
    const [likesCount, setLikesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);
            try {
                const followersResponse = await axios.get(
                    `https://graph.facebook.com/${pageId}`,
                    {
                        params: {
                            fields: 'followers_count',
                            access_token: accessToken,
                            since: dateRange.since,
                            until: dateRange.until
                        }
                    }
                );

                const likesResponse = await axios.get(
                    `https://graph.facebook.com/${pageId}`,
                    {
                        params: {
                            fields: 'fan_count',
                            access_token: accessToken,
                            since: dateRange.since,
                            until: dateRange.until
                        }
                    }
                );

                setFollowersCount(followersResponse.data.followers_count);
                setLikesCount(likesResponse.data.fan_count);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching page data:', error.message);
                setError(error);
                setLoading(false);
            }
        };

        if (pageId && accessToken && dateRange.since && dateRange.until) {
            fetchPageData();
        }
    }, [pageId, accessToken, dateRange]);

    if (loading) {
        return <p className='text-xl font-bold'>Loading...</p>;
    }

    if (error) {
        return <p className='p-4 text-center text-red-500'>Error fetching page data: {error.message}</p>;
    }

    return (
        <div className='flex flex-col justify-center items-left'>
            <p className='flex gap-1'>Total Followers: <p className='text-green-500'> {followersCount}</p></p>
            <p className='flex gap-1'>Total Likes: <p className='text-green-500'> {likesCount}</p></p>
        </div>
    );
};

export default PageInsights;
