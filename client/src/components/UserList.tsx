import React, { useState, useEffect } from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

import { InviteIcon } from '../assets'
import { User } from '../data_structure'


interface Props {
    children?: JSX.Element[] | JSX.Element | undefined
}

const ListContainer: React.FC<Props> = ({ children }) => {
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

interface UserItemProps {
    user: {
        id: string,
        name: string,
        fullName: string,
        image: string,
        hashedPassword: string,
        phoneNumber: string
    }
    selectedUsers: any[]
    setSelectedUsers: (value: any[]) => void
}

const UserItem: React.FC<UserItemProps> = ({ user, selectedUsers, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if (selected) {
            // setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
            setSelectedUsers(selectedUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            // setSelectedUsers((prevUsers) => [...prevUsers, user.id])
            setSelectedUsers([...selectedUsers, user.id])
        }
        setSelected((prevSelected) => !prevSelected)
    }
    return (
        <div className='user-item__wrapper' onClick={handleSelect}>
            <div className='user-item__name-wrapper'>
                <Avatar image={user?.image} name={user.fullName || user.id} />
                <p className='user-item__name'>{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> : <div className='user-item__invite-empty' />}

        </div>
    )
}

const UserList = ({ setSelectedUsers, selectedUsers }: { setSelectedUsers: any[], selectedUsers: any[] }) => {
    const { client } = useChatContext()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [listEmpty, setListEmpty] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;
            setLoading(true);

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID as string } },
                    { id: 1 },
                    { limit: 8 }
                )

                if (response.users.length) {
                    setUsers(response.users)
                } else {
                    setListEmpty(true)
                }

            } catch (error) {
                //console.log(error);
                setError(true)
            }
            setLoading(false)
        }

        if (client) {
            getUsers()
        }
    }, [])

    if (error) {
        return (
            <ListContainer>
                <div className='user-list__message'>
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if (listEmpty) {
        return (
            <ListContainer>
                <div className='user-list__message'>
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ?
                <div className='user-list__message'>Loading users...</div>
                : (
                    users?.map((user: any, i) => (
                        <UserItem index={i} key={user?.id} user={user} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                    ))
                )
            }
        </ListContainer>
    )
}

export default UserList