import React from 'react'
import { useState, useEffect } from 'react'
import { Loader, FormField, Card } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff]  text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse()); // Ensure result.data contains the posts
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = allPosts.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto relative z-20">
      <div className="text-center">
        <h1 className="font-extrabold text-[#ffffff] text-[40px] xs:text-[50px] sm:text-[70px] leading-tight">
          Community <span className="gradient-text">Showcase</span>
        </h1>
        <p className="mt-4 text-gray-400 text-[16px] sm:text-[20px] max-w-[700px] mx-auto">
          Explore the boundaries of imagination with our community-generated AI art collection.
        </p>
      </div>
      <div className="mt-16">
        <FormField labelName="Search Post"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] dark:text-white text-xl mb-3">Rendering results for <span className="text-[#222328] dark:text-white ">{searchText}</span></h2>
            )}
            <div className=" dark:text-white grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">{searchText ? (
              <RenderCards data={searchedResults}
                title="No search results found" />
            ) : (
              <RenderCards
                data={allPosts}
                title="No posts found" />

            )}</div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home
