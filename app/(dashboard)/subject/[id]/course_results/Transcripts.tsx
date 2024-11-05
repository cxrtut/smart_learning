import React from 'react';

interface TranscriptProps {
    transcript: string;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript }) => {
    return (
        <div style={styles.transcript}>
            <h2>Transcript</h2>
            <p>{transcript}</p>
        </div>
    );
};

const styles = {
    transcript: {
        padding: '1rem',
        backgroundColor: '#f9f9f9',
    } as React.CSSProperties,
};

export default Transcript