import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { useAuth } from '../context/AuthContext';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user, updateCoins } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    name: user?.name || '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGenerateImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerateImg(true);

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/huggingface`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to generate image');
        }

        const data = await response.json();
        setForm({ ...form, photo: data.photo });
      } catch (error) {
        alert(error.message);
      } finally {
        setGenerateImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };


  const handleSubmit = async (isPublic) => {
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form, userId: user.id, isPublic }),
        });

        const result = await response.json();
        if (response.ok) {
          if (isPublic) {
            updateCoins(10);
            alert('Success! You earned 10 coins!');
            navigate('/');
          } else {
            alert('Saved to your private gallery.');
            navigate('/my-gallery');
          }
        } else {
          alert(result.message || 'Error while posting.');
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-extrabold text-[32px] sm:text-[48px] gradient-text">Create Magic</h1>
        <p className="mt-2 text-gray-400 text-[16px] max-w-[500px] mx-auto">
          Transform your imagination into visual reality. Share your creations with the world.
        </p>
      </div>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-14 lg:items-start max-w-7xl mx-auto mt-10">

        {/* Left Side: Form */}
        <div className="flex-1 bg-[#10131f]/60 backdrop-blur-md p-8 rounded-2xl border border-gray-800 shadow-lg">
          <div className="mb-8">
            <h2 className="font-bold text-2xl text-white mb-2">Start Creating</h2>
            <p className="text-gray-400 text-sm">Enter a prompt or ask for a surprise.</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <FormField
                labelName="Your Name"
                type="text"
                name="name"
                placeholder="Ex., john doe"
                value={form.name}
                handleChange={handleChange}
                disabled // Name locked to user account
              />
              <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />
            </div>

            <div className="flex gap-5">
              <button
                type="button"
                onClick={generateImage}
                className="text-white bg-gradient-to-r from-green-500 to-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-3 text-center shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                {generatingImg ? 'Generating...' : 'Generate'}
              </button>
            </div>

            <div className="mt-6 border-t border-gray-700 pt-6 flex flex-col gap-3">
              <p className="text-gray-400 text-sm mb-2">Choose where to save your creation:</p>

              <button
                onClick={() => handleSubmit(true)}
                disabled={loading}
                className="text-white bg-gradient-to-r from-neon-blue to-neon-purple font-medium rounded-lg text-sm w-full px-6 py-3 text-center shadow-lg hover:shadow-neon transition-all duration-300 transform hover:scale-[1.02] flex justify-center items-center gap-2"
              >
                {loading ? 'Sharing...' : (
                  <>
                    <span>Share with Community</span>
                    <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full border border-yellow-500/50">+10 Coins</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleSubmit(false)}
                disabled={loading}
                className="text-gray-300 bg-transparent border border-gray-600 hover:border-white font-medium rounded-lg text-sm w-full px-6 py-3 text-center transition-all duration-300"
              >
                Save to My Gallery (Private)
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="relative bg-[#0b0b1e] border-2 border-dashed border-gray-700 hover:border-neon-blue transition-colors duration-300 text-gray-300 text-sm rounded-xl focus:ring-0 w-full aspect-square p-2 flex justify-center items-center shadow-2xl relative overflow-hidden group">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-lg shadow-inner"
              />
            ) : (
              <div className="text-center p-10 flex flex-col items-center opacity-50">
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 object-contain mb-4 invert"
                />
                <p>Preview will appear here</p>
              </div>
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-10 flex justify-center items-center bg-black/70 rounded-lg backdrop-blur-sm">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatePost;
