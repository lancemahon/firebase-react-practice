import React, { useState, useEffect } from "react"
import { auth, db } from "../services/firebase"
import { getUsers } from '../helpers/auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import ChatMessage from '../components/ChatMessage'
import NewConversation from "../components/NewConveration"

export default function Chat() {
    const user = auth().currentUser
    const [users, setUsers] = useState([])
    const [chats, setChats] = useState([])
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({
        readError: null,
        writeError: null
    })

    useEffect(() => {
        setErrors({...errors, readError: null})
        const temp = []
        getUsers().then(data => data.forEach(item => {
            // console.log('item:', item)
            temp.push({email: item.email})
            // console.log(temp)
        }))
        setUsers(temp)
        // console.log(users)
        try {
            db.ref('chats').on('value', snapshot => {
                let chatsArray = []
                snapshot.forEach((snap) => {
                    chatsArray.push(snap.val())
                })
                setChats(chatsArray)
            })
        } catch (err) {
            setErrors({ ...errors, readError: err.message})
        }
    }, [])

    function handleChange(event) {
        setContent(event.target.value)
      }

    async function handleSubmit(event) {
        event.preventDefault()
        setErrors({...errors, writeError: null})
        try {
            await db.ref('chats').push({
                content: content,
                timestamp: Date().toString(),
                email: user.email,
                uid: user.uid
            })
            setContent('')
        } catch (err) {
            setErrors({...errors, writeError: err.message})
        }
    }

    function logout() {
        auth().signOut()
    }

    const chatWindowContainerStyle = {
        display: 'grid',
        gridTemplateColumns: '30% 40% 30%',
        gridTemplateRows: 'auto 20hv 5vh 5vh'
    }

    const chatWindowStyle = {
        gridColumn: '2 / span 1',
        gridRow: '1 / span 1',
        height: '80vh',
        overflowY: 'scroll'
    }

    const writeMessageBoxStyle = {
        gridColumn: '2 / span 1',
        gridRow: '2 / span 1',

        display: 'grid',
        gridTemplateColumns: '70% 20%',
        gridTemplateRows: 'auto'
    }

    const messageSenderStyle = {
        gridColumn: '2 / span 1'
    }

    const textAreaStyle = {
        gridColumn: '1 / span 1',
        gridRows: '1 / span 1'
    }

    const sendButtonStyle = {
        gridColumn: '-1 / span 1',
        gridRows: '1 / span 1'
    }

    const logoutButtonStyle = {
        gridRow: '4 / span 1',
        gridColumn: '2 / span 1',
        justifySelf: 'center'
    }

    const userInfoStyle = {
        gridColumn: '2 / span 1',
        gridRow: '3 / span 1'
    }

    return (
        <div style={chatWindowContainerStyle}>
            <div style={chatWindowStyle} className="chats">
                {chats.map(chat => {
                return <ChatMessage key={chat.timestamp} chat={chat} />
                })}
            </div>
            
            <div style={messageSenderStyle}>
                <Form onSubmit={handleSubmit}>
                    <div style={writeMessageBoxStyle}>
                    <Form.Control as='textarea' onChange={handleChange} value={content}
                        style={textAreaStyle}></Form.Control>
                    {errors.writeError ? <p>{errors.writeError}</p> : null}
                    <Button type="submit" style={sendButtonStyle}>Send</Button>
                    </div>
                </Form>
            </div>

            <div style={userInfoStyle}>
                Logged in as: <strong>{user.email}</strong>
            </div>

            <div style={logoutButtonStyle}>
                <button onClick={logout}>Logout</button>
            </div>
            <NewConversation users={users}/>
        </div>
        )
  }