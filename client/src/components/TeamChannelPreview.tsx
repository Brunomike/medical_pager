import React from 'react'
import { Avatar, useChatContext, Channel } from 'stream-chat-react'

interface Props {
  channel: Channel
  type: string
}

interface Members {

}

const TeamChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => {
    <p className='channel-preview__item'>
      #{channel?.data?.name || channel?.data?.id}
    </p>
  }

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    return (
      <div className='channel-preview__item single'>
        <Avatar
          image={members[0].user.image}
        />
      </div>
    )
  }

  return (
    <div>

    </div>
  )
}

export default TeamChannelPreview