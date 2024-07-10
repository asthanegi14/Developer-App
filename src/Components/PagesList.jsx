import { useEffect, useState } from 'react';
import axios from 'axios';

const PagesList = ({ accessToken, onPageSelect }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await axios.get(
                    `https://graph.facebook.com/v14.0/me/accounts`,
                    {
                        params: {
                            access_token: accessToken
                        }
                    }
                );
                setPages(response.data.data);
            } catch (error) {
                console.error('Error fetching pages', error);
            }
        };

        if (accessToken) {
            fetchPages();
        }
    }, [accessToken]);

    return (
        <select onChange={(e) => onPageSelect(e.target.value)} className='p-2 border rounded w-full'>
            <option value="">Select a Page</option>
            {pages.map((page) => (
                <option key={page.id} value={page.id}>
                    {page.name}
                </option>
            ))}
        </select>
    );
};

export default PagesList;
