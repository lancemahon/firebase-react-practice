import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function NewConversation ({ users }) {

    const scrollableMenuStyle = {
        overflowY: 'scroll',
        height: 'inherit'
    }

    const HoverText = styled.div`
        margin: 0.2em;
        :hover {
            background-color: #d7d7d7;
            -webkit-transition: background 1s;
            transition: background 1s;
        }
    `

    const StyledLink = styled.div`
        color: black;
            :hover {
                font-size: 1.2em;
                -webkit-transition: font-size 1s;
                transition:font-size 1s;
            }
    `

    const usersToConverseWith = users.map(user => (
            <HoverText key={user.email}>
                <Link to={'/conversation'} style={{ textDecoration: 'none' }}>
                    <StyledLink>
                        {user.email}
                    </StyledLink>
                </Link>
            </HoverText>
    ))

    return (
        <div>
            <div>
                <h6>Start a new conversation</h6>
                <hr />
            </div>
            <div style={scrollableMenuStyle}>
                {usersToConverseWith}
            </div>
        </div>
    )
}