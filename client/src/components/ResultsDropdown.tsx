import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { Channel, User } from '../data_structure'

interface ChannelByUser {
    client: any
    setActiveChannel: any
    channel:any
    setChannel:(value:any)=>void
}   


const channelByUser = async ({ client, setActiveChannel, channel, setChannel }:ChannelByUser) => {
    const filters = {
        type: 'messaging',
        member_count: 2,
        members: { $eq: [client.user.id, client.userID] },
    };

    const [existingChannel] = await client.queryChannels(filters);

    if (existingChannel) return setActiveChannel(existingChannel);

    const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });

    setChannel(newChannel)

    return setActiveChannel(newChannel);
};

interface SearchResultProps {
    channel: Channel
    focusedId: any
    type: string
    setChannel: (value: any) => void
    toggle: boolean
    setToggleContainer: (value: boolean) => void
}

const SearchResult: React.FC<SearchResultProps> = ({ toggle, channel, focusedId, type, setChannel, setToggleContainer }) => {
    const { client, setActiveChannel } = useChatContext();
    console.log(client);
    

    if (type === 'channel') {
        return (
            <div
                onClick={() => {
                    setChannel(channel)
                    if (setToggleContainer) {
                        setToggleContainer(!toggle)
                    }
                }}
                className={focusedId === channel.id ? 'channel-search__result-container__focused' : 'channel-search__result-container'}
            >
                <div className='result-hashtag'>#</div>
                <p className='channel-search__result-text'>{channel?.data?.name}</p>
            </div>
        );
    }

    return (
        <div
            onClick={async () => {
                channelByUser({ client, setActiveChannel, channel, setChannel })
                if (setToggleContainer) {
                    setToggleContainer(!toggle)
                }
            }}
            className={focusedId === channel.id ? 'channel-search__result-container__focused' : 'channel-search__result-container'}
        >
            <div className='channel-search__result-user'>
                <Avatar image={channel?.image as string || undefined} name={channel.name} size={24} />
                <p className='channel-search__result-text'>{channel.name}</p>
            </div>
        </div>
    );
};

interface DropdownProps {
    teamChannels: Channel[]
    directChannels: Channel[]
    focusedId?: any
    loading: boolean
    setChannel: (value: {}) => void
    toggle: boolean
    setToggleContainer: (value: boolean) => void
}

const ResultsDropdown: React.FC<DropdownProps> = ({ toggle, teamChannels, directChannels, focusedId, loading, setChannel, setToggleContainer }) => {

    return (
        <div className='channel-search__results'>
            <p className='channel-search__results-header'>Channels</p>
            {loading && !teamChannels.length && (
                <p className='channel-search__results-header'>
                    <i>Loading...</i>
                </p>
            )}
            {!loading && !teamChannels.length ? (
                <p className='channel-search__results-header'>
                    <i>No channels found</i>
                </p>
            ) : (
                teamChannels?.map((channel, i) => (
                    <SearchResult
                        channel={channel}
                        focusedId={focusedId}
                        key={i}
                        setChannel={setChannel}
                        type='channel'
                        toggle={toggle}
                        setToggleContainer={setToggleContainer}
                    />
                ))
            )}
            <p className='channel-search__results-header'>Users</p>
            {loading && !directChannels.length && (
                <p className='channel-search__results-header'>
                    <i>Loading...</i>
                </p>
            )}
            {!loading && !directChannels.length ? (
                <p className='channel-search__res ults-header'>
                    <i>No direct messages found</i>
                </p>
            ) : (
                directChannels?.map((channel, i) => (
                    <SearchResult
                        channel={channel}
                        focusedId={focusedId}
                        key={i}
                        setChannel={setChannel}
                        type='user'
                        toggle={toggle}
                        setToggleContainer={setToggleContainer}
                    />
                ))
            )}
        </div>
    );
};

export default ResultsDropdown;