import React, { useState } from 'react';
import Navbar from './Navbar';
import VideoList from './VideoList';
import Transcript from './Transcripts';
import axios from "axios";

const Course_result: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<{ id: string; url: string; title: string; } | null>(null);
    const [transcript, setTranscript] = useState('');

    const handleVideoSelect = (video: { id: string; url: string; title: string; }) => {
        setSelectedVideo(video);
        // Replace with your API to fetch transcript by video ID
        axios.get(`/api/transcripts/${video.id}`)
            .then(response => setTranscript(response.data.transcript))
            .catch(error => console.error('Error fetching transcript:', error));
    };

    return (
        <div>
            <Navbar />
            <VideoList onSelect={handleVideoSelect} />
            {selectedVideo && <Transcript transcript={transcript} />}
        </div>
    );
};

export default Course_result