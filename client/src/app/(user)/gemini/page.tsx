"use client"
import React, { useState } from 'react';
import axios from 'axios';

function GeminiComponent() {
    const [prompt, setPrompt] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:8000/api/generate`, { prompt });
            setGeneratedText(response.data.generatedText);
        } catch (err: any) {
            setError(err.response?.error || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Generate'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {generatedText && <p>{generatedText}</p>}
        </div>
    );
}

export default GeminiComponent;
