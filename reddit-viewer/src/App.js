// component for main layout
import React, { useEffect, useState } from 'react';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('https://redditapp-ikuv.onrender.com/reddit');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setPosts(data.data.children.map((p) => p.data));
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: 'linear-gradient(180deg,#0f172a,#071025)',
      }}
    >
    
      <div
        style={{
          width: '100%',
          maxWidth: 1280,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 10px 30px rgba(2,6,23,0.9)',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 18,
          }}
        >
          <h1 style={{ margin: 0, color: '#e6f0ff', fontSize: 20 }}>
            r/reactjs — top posts
          </h1>
        </header>

        {loading && <div style={{ color: '#cbd5e1' }}>Loading posts...</div>}
        {error && (
          <div style={{ color: '#ffb4b4' }}>Error fetching posts: {error}</div>
        )}

        {!loading && !error && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
              gap: 16,
            }}
          >
            {posts.map((p) => (
              <article
                key={p.id}
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
                  padding: 14,
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 160,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    marginBottom: 8,
                    fontSize: 16,
                    color: '#ffffff',
                    lineHeight: '1.25',
                  }}
                >
                  {p.title}
                </h2>

                <div
                  style={{
                    flex: 1,
                    overflow: 'auto',
                    fontSize: 13,
                    color: '#dbeafe',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: p.selftext_html || '<i>No self text</i>',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 12,
                  }}
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: '#9be7ff',
                      fontSize: 13,
                      maxWidth: '70%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.url}
                  </a>

                  <div
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      padding: '6px 8px',
                      borderRadius: 8,
                      fontSize: 13,
                      color: 'rgba(255, 255, 255, 1)',
                    }}
                  >
                    ⭐ {p.score}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
