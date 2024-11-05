import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Video {
    id: string;
    url: string;
    title: string;
}

const VideoList: React.FC<{ onSelect: (video: Video) => void }> = ({ onSelect }) => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        // Replace with your API to fetch videos
        axios.get('/api/videos')
            .then(response => setVideos(response.data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    return (
        <div style={styles.videoList}>
            {videos.map(video => (
                <div key={video.id} style={styles.videoItem} onClick={() => onSelect(video)}>
                    <video
                        src={video.url}
                        controls
                        style={styles.video}
                        title={video.title}
                    />
                    <p>{video.title}</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    videoList: {
        display: 'flex',
        overflowX: 'auto',
        padding: '1rem',
        gap: '1rem',
    } as React.CSSProperties,
    videoItem: {
        flex: '0 0 auto',
        textAlign: 'center',
    } as React.CSSProperties,
    video: {
        width: '300px',
        height: 'auto',
    } as React.CSSProperties,
};

export default VideoList