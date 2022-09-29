import React, { useState } from 'react';
import { ChannelList, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import {Channel} from '../data_structure'

import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

interface Props {
  logout?: () => void
  isCreating: boolean
  setIsCreating?: (value: boolean) => void
  setIsEditing: (value: boolean) => void
  setCreateType: (value: string) => void
  setToggleContainer?: (value: boolean) => void
}

const cookies = new Cookies()

interface SidebarProps {
  logout: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner' onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>Medical Pager</p>
  </div>
)

const customChannelTeamFilter = (channels: Channel[]) => {
  return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessagingFilter = (channels: Channel[]) => {
  return channels.filter((channel) => channel.type === 'messaging')  
}

interface ChannelListContentProps {  
  isCreating: boolean
  toggle:boolean
  setIsCreating: (value: boolean) => void
  setIsEditing: (value: boolean) => void
  setCreateType: (value: string) => void
  setToggleContainer: (value: boolean) => void
}


const ChannelListContent: React.FC<ChannelListContentProps> = ({ toggle,isCreating, setIsCreating, setCreateType, setIsEditing ,setToggleContainer}) => {
  const { client } = useChatContext()

  const logout = () => {
    cookies.remove('token')
    cookies.remove('userId')
    cookies.remove('userName')
    cookies.remove('fullName')
    cookies.remove('avatarURL')
    cookies.remove('hashedPassword')
    cookies.remove('phoneNumber')

    window.location.reload()
  }

  const filters = { members: { $in: [client.userID] } }
  

  return (
    <>
      <Sidebar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch toggle={toggle} setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              toggle={toggle}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => {
            <TeamChannelPreview
              {...previewProps}   
              isCreating={isCreating}           
              setIsCreating={setIsCreating}              
              setIsEditing={setIsEditing}
              toggle={toggle}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          }}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              toggle={toggle}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => {
            <TeamChannelPreview
              {...previewProps}
              isCreating={isCreating}   
              setIsCreating={setIsCreating}              
              setIsEditing={setIsEditing}
              toggle={toggle}
              setToggleContainer={setToggleContainer}              
              type="messaging"
            />
          }}
        />
      </div>
    </>
  )
}

interface ChannelListContainerProps {
  isCreating: boolean
  setIsCreating: (value: boolean) => void
  setIsEditing: (value: boolean) => void
  setCreateType: (value: string) => void
}

const ChannelListContainer: React.FC<ChannelListContainerProps> = ({ isCreating,setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState<boolean>(false)

  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent isCreating={isCreating} setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} toggle={toggleContainer} setToggleContainer={setToggleContainer} />
      </div>

      <div className='channel-list__container-responsive'
        style={{ left: toggleContainer ? "0%" : "80%", backgroundColor: '#005fff' }}
      >
        <div className='channel-list__container-toggle' onClick={() => setToggleContainer((prevToggle) => !prevToggle)}></div>
        <ChannelListContent isCreating={isCreating} setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} toggle={toggleContainer} setToggleContainer={setToggleContainer} />
      </div>
    </>
  )
}

export default ChannelListContainer;
