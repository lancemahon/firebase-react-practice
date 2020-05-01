import React from 'react'
import { getUsers } from '../helpers/auth'

export default function NewConversation ({ users }) {

    const usersToConverseWith = users.map(user => (
            <div key={user.email}>
                {user.email}
            </div>
    ))

    return (
        <div>
            {usersToConverseWith}
        </div>
    )
}