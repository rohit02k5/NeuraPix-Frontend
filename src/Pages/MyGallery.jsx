import React, { useState, useEffect } from 'react';
import { Loader, Card } from '../components';
import { useAuth } from '../context/AuthContext';

const MyGallery = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post?user=${user.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const result = await response.json();
                    setPosts(result.data.reverse());
                }
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [user]);

    return (
        <section className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="font-extrabold text-[#ffffff] text-[32px]">My Gallery</h1>
                <p className="mt-2 text-gray-400 text-[14px] max-w-[500px] mx-auto">
                    Your personal collection of generated masterpieces.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                    {posts?.length > 0 ? (
                        posts.map((post) => <Card key={post._id} {...post} />)
                    ) : (
                        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">No posts found</h2>
                    )}
                </div>
            )}
        </section>
    );
};

export default MyGallery;
