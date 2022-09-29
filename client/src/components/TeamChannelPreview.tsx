import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

import { User, Channel } from '../data_structure'

interface Props {
  channel: {
    id: string,
    data: {
      id: string,
      name: string,
    },
    state: {
      members: [
        {
          user: User
        }
      ]
    }
  }
  type: string
  isCreating: boolean
  setIsCreating: (value: boolean) => void
  setIsEditing: (value: boolean) => void
  // TODO : INTRODUCE CORRECT TYPE
  setActiveChannel: any
  toggle: boolean
  setToggleContainer: (value: boolean) => void
}



const TeamChannelPreview: React.FC<Props> = ({ isCreating, toggle, setActiveChannel, channel, type, setIsCreating, setIsEditing, setToggleContainer }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      #{channel?.data?.name || channel?.data?.id}
    </p>
  )
  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

    return (
      <div className='channel-preview__item single'>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0].user?.id}
        />
        <p>{members[0]?.user?.fullName || members[0].user?.id}</p>
      </div>
    )
  }

  return (
    <div className={
      channel.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
    }
      onClick={() => {
        setIsCreating(false)
        setIsEditing(false)
        setActiveChannel(channel)

        if (setToggleContainer) {
          setToggleContainer(!toggle)
        }
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  )
}

export default TeamChannelPreview
