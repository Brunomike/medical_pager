import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

import {ResultsDropdown} from './'
import { SearchIcon } from '../assets'
import {Channel} from '../data_structure'

interface Props {
    toggle:boolean
    setToggleContainer: (value: boolean) => void
}

const ChannelSearch:React.FC<Props> = ({ toggle,setToggleContainer }) => {
    const { client, setActiveChannel } = useChatContext()
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    // TODO : INTRODUCE CORRECT TYPE
    // const [teamChannels, setTeamChannels] = useState<Channel[]>([])
    const [teamChannels, setTeamChannels] = useState<any[]>([])
    const [directChannels, setDirectChannels] = useState<any[]>([])

    useEffect(() => {
        if (!query) {
            setTeamChannels([])
            setDirectChannels([])
        }
    }, [query])


    const getChannels = async (text: string) => {
        try {
            const channelResponse = client.queryChannels({
                type: 'team', 
                name: { $autocomplete: text }, 
                members: { $in: [client.userID as string]}
            });

            const userResponse = client.queryUsers({
                id: { $ne: client.userID as string },
                name: { $autocomplete: text }
            })

            const [channels, { users }] = await Promise.all([channelResponse, userResponse])

            if (channels.length) setTeamChannels(channels)

            if (users.length) setDirectChannels(users)

        } catch (error) {
            setQuery('');
        }
    }


    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value);
    }

    // TODO : INTRODUCE CORRECT TYPE
    const setChannel = (channel:any) => {
        setQuery('');
        setActiveChannel(channel)

    }

    return (
        <div className='channel-search__container'>
            <div className='channel-search__input__wrapper'>
                <div className='channel-search__input__item'>
                    <SearchIcon />
                </div>
                <input
                    className='channel-search__input__Text'
                    placeholder='Search'
                    type="text"
                    value={query}
                    onChange={onSearch}
                />

            </div>
            {
                query && (
                    <ResultsDropdown
                        teamChannels={teamChannels}
                        directChannels={directChannels}
                        loading={loading}
                        setChannel={setChannel}
                        // setQuery={setQuery}
                        toggle={toggle}
                        setToggleContainer={setToggleContainer}
                    />
                )
            }
        </div>
    )
}

export default ChannelSearch;