import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { UserList } from './'
import { CloseCreateChannel } from '../assets'

interface InputProps {
    channelName: string
    setChannelName: (value: string) => void
}

const ChannelNameInput: React.FC<InputProps> = ({ channelName, setChannelName }) => {
    const { client, setActiveChannel } = useChatContext()
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setChannelName(e.target.value);
    }

    return (
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input type="text" value={channelName} onChange={handleChange} placeholder="channel-name (no spaces)" />
            <p>Add Members</p>
        </div>
    )
}

interface Props {
    createType: string
    setIsCreating: (value: boolean) => void
    setIsEditing: (value: boolean) => void
}

const CreateChannel: React.FC<Props> = ({ createType, setIsCreating, setIsEditing }) => {
    const { client, setActiveChannel } = useChatContext()
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('')

    const createChannel = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        try {
            const newChannel = await client.channel(createType, channelName, { name: channelName, members: selectedUsers })
            await newChannel.watch()
            setChannelName('')
            setIsCreating(false)
            setSelectedUsers([client.userID])
            setActiveChannel(newChannel)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='create-channel__container'>
            <div className='create-channel__header'>
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} setIsEditing={setIsEditing} />
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className='create-channel__button-wrapper' onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    )
}

export default CreateChannel