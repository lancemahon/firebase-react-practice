import React from 'react'

export default function ChatMessage({ chat }) {

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: '200px auto 150px',
        gridTemplateRows: '30px auto 30px'
    }

    const sentByStyle = {
        backgroundColor: '#eeeeee',
        gridColumn: '1 / span 1',
        gridRow: '1 / span 1'
    }

    const contentStyle = {
        gridColumn: '2 / span 1',
        gridRow: '2 / span 1',
    }

    const timestampStyle = {
        fontSize: '0.7em',
        gridColumn: '3 / span 1',
        gridRow: '3 / span 1'
    }

    return (
        <div style={containerStyle}>
            <div style={sentByStyle}>{chat.email} wrote:</div>
            <p style={contentStyle}>{chat.content}</p>
            <p style={timestampStyle}>Sent at {chat.timestamp}</p>
        </div>
    )
}