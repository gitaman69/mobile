// src/Mobile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [meterState, setMeterState] = useState('off');

    const fetchMeterState = async () => {
        try {
            const response = await axios.get('https://backend-research.vercel.app/get_meter_state');
            setMeterState(response.data.meter_state);
        } catch (error) {
            console.error('Error fetching meter state:', error);
        }
    };

    useEffect(() => {
        fetchMeterState();
        const interval = setInterval(fetchMeterState, 1000); // Fetch every second
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Mobile Meter Status</h2>
            <div
                id="led"
                style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: meterState === 'on' ? 'green' : 'red',
                    margin: '50px auto',
                    transition: 'background-color 0.5s',
                }}
            ></div>
            <div>Current Meter State: {meterState.toUpperCase()}</div>
        </div>
    );
};

export default App;
