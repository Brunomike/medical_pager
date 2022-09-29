import React from 'react';

import { AddChannel } from '../assets';


interface Props {
  children?: JSX.Element[] | JSX.Element | undefined
  error: boolean
  loading: boolean
  type: string
  isCreating: boolean
  setIsCreating: (value: boolean) => void
  setIsEditing: (value: boolean) => void
  setCreateType: (value: string) => void
  toggle: boolean
  setToggleContainer: (value: boolean) => void
}



const TeamChannelList: React.FC<Props> = ({ toggle, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
  //const TeamChannelList = ({ children, error = false, loading, type }) => {
  if (error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null
  }

  if (loading) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading'>
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>
    ) : null
  }

  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        {/* Button - add a channel */}
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          toggle={toggle}
          setToggleContainer={setToggleContainer}
          type={type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList
