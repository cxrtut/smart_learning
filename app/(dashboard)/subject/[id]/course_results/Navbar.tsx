import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav style={styles.navbar}>
            <h1>Video Page</h1>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#282c34',
        padding: '1rem',
        color: 'white',
        textAlign: 'center',
    } as React.CSSProperties,
};

export default Navbar