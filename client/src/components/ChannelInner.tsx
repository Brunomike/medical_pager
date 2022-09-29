import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfo } from '../assets';

interface Props {
    setIsEditing: (value: boolean) => void
}

interface Message {
    id: string
    html: string
    type: string
    user: {

    }
    attachments: []
    latest_reactions: []
    own_reactions: []
    reaction_counts: {}
    reply_count: number
    parent_id: string
    created_at: Date
    updated_at: Date
    deleted_at: Date
    mentioned_users: []
    status: string
}

export const GiphyContext = React.createContext({});

const ChannelInner: React.FC<Props> = ({ setIsEditing }) => {
    const [giphyState, setGiphyState] = useState(false);
    const { sendMessage } = useChannelActionContext();

    const overrideSubmitHandler = (message: any) => {
        let updatedMessage = {
            attachments: message.attachments,
            mentioned_users: message.mentioned_users,
            parent_id: message.parent?.id,
            parent: message.parent,
            text: message.text,
        };

        if (giphyState) {
            updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
        }

        if (sendMessage) {
            sendMessage(updatedMessage);
            setGiphyState(false);
        }
    };

    return (
        <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <Window>
                    <TeamChannelHeader setIsEditing={setIsEditing} />
                    <MessageList />
                    <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
                </Window>
                <Thread />
            </div>
        </GiphyContext.Provider>
    );
};

const TeamChannelHeader: React.FC<Props> = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();

    const MessagingHeader = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user?.id !== client.userID);
        const additionalMembers = members.length - 3;

        if (channel.type === 'messaging') {
            return (
                <div className='team-channel-header__name-wrapper'>
                    {members.map(({ user }, i) => (
                        <div key={i} className='team-channel-header__name-multi'>
                            <Avatar image={user?.image} name={user?.fullName as string || user?.id as string} size={32} />
                            <p className='team-channel-header__name user'>{user?.fullName as string || user?.id}</p>
                        </div>
                    ))}

                    {additionalMembers > 0 && <p className='team-channel-header__name user'>and {additionalMembers} more</p>}
                </div>
            );
        }

        return (
            <div className='team-channel-header__channel-wrapper'>
                <p className='team-channel-header__name'># {channel?.data?.name}</p>
                <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
                    <ChannelInfo />
                </span>
            </div>
        );
    };

    const getWatcherText = (watchers: any) => {
        if (!watchers) return 'No users online';
        if (watchers === 1) return '1 user online';
        return `${watchers} users online`;
    };

    return (
        <div className='team-channel-header__container'>
            <MessagingHeader />
            <div className='team-channel-header__right'>
                <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
            </div>
        </div>
    );
};

export default ChannelInner;