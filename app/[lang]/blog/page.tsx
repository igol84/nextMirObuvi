import React from 'react';

const Blog = ({params: {lang}}: { params: { lang: string } }) => {
  return (
    <h1>
      Blog land: {lang}
    </h1>
  );
};

export default Blog;