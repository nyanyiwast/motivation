import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const quotesEndPointUrl = "https://api.quotable.io/random"
  const [posts, setPosts] = useState([])
  const [images, setImages] = useState([])
  
  const fetchPost = async () => {
  const response = await fetch(quotesEndPointUrl)

   const data = await response.json()

   data.length > 45 ? fetchPost() : setPosts(data)
  //  posts.tags[0].length > 0 ? fetchImage() : fetchPost()
  };

  const fetchImage = async () => {
    const imageEndPointKey = "29841876-2189f5c4f44dddea0757a1c53"
    let imageEndPointUrl = `https://pixabay.com/api/?key=${imageEndPointKey}&q=wisdom+love&image_type=photo`
    const response = await fetch(imageEndPointUrl)
    
     const data = await response.json()
     console.warn(imageEndPointUrl)
      // console.log(data.hits[0].id)
     setImages(data.hits[0].webformatURL)
  
    };

  useEffect(() => {
    fetchPost();
    fetchImage()
    // setTimeout(fetchImage(),5000)
  }, []);

  const coverPage = (
    <div className="imgBox">
      <div className="bark" />
        <img src={images} alt="cover"/>
        {posts.length <= 0 ? <p>Wait, we are loading something amazing...</p> : <p>You can now click to open the book</p>}
    </div>
  )

  const firstPage = (
    <div className="details">
        {/* <h4 className="color1">{posts.tags[0]}</h4> */}
        <p>" {posts.content} "</p>
        <p className="text-right">♥ - {posts.author} -</p>
    </div>
  )

  return (
    <>
      <div className="card">
        {coverPage}
        {firstPage}
      </div>
    </>
  );
}

export default App;
