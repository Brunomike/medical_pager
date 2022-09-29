import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { UserList } from './'
import { CloseCreateChannel } from '../assets'
import { User } from '../data_structure'

interface InputProps {
  channelName: string | undefined
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

interface EditChannelProps {
  setIsEditing: (value: boolean) => void
}

const EditChannel: React.FC<EditChannelProps> = ({ setIsEditing }) => {
  const { channel } = useChatContext()
  const [channelName, setChannelName] = useState(channel?.data?.name)
  // TODO : INTRODUCE CORRECT TYPE
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])


  const updateChannel = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const nameChanged = channelName !== (channel?.data?.name || channel?.data?.id)

    if (nameChanged) {
      await channel?.update({ name: channelName }, { text: `Channel name changed to ${channelName}` })
    }
    if (selectedUsers.length) {
      await channel?.addMembers(selectedUsers)
    }
    setChannelName(channel?.data?.name)
    //setChannelName(null)
    setIsEditing(false)
    setSelectedUsers([])
  }


  return (
    <div className='edit-channel__container'>
      <div className='edit-channel__header'>
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />

      <div className='edit-channel__button-wrapper' onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  )
}

export default EditChannel