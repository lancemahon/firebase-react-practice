import React, { useState, useEffect } from "react"
import { auth } from "../services/firebase"
import { db } from "../services/firebase"

export default function Chat() {
    const [user, setUser] = useState(auth().currentUser)
    const [chats, setChats] = useState([])
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({
        readError: null,
        writeError: null
    })

    useEffect(() => {
        setErrors({...errors, readError: null})
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
                timestamp: Date.now(),
                uid: user.uid
            })
            setContent('')
        } catch (err) {
            setErrors({...errors, writeError: err.message})
        }
    }

    return (
        <div>
            <div className="chats">
                {chats.map(chat => {
                return <p key={chat.timestamp}>{chat.content}</p>
                })}
            </div>
            {/* {# message form #} */}
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={content}></input>
                {errors.writeError ? <p>{errors.writeError}</p> : null}
                <button type="submit">Send</button>
            </form>
            <div>
                Login in as: <strong>{user.email}</strong>
            </div>
        </div>
        )
  }