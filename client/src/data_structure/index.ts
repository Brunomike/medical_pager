export interface Channel {
    id: string,
    type: string,
    cid: string,
    last_message_at: "2020-01-10T07:26:46.791232Z",
    created_at: "2020-01-10T07:25:37.63256Z",
    updated_at: "2020-01-10T07:25:37.632561Z",
    created_by: {
        id: string,
        role: string,
        created_at: "2019-08-27T17:33:14.442265Z",
        updated_at: "2020-01-10T07:25:36.402819Z",
        last_active: "2020-01-10T07:25:36.395796Z",
        banned: boolean,
        online: boolean,
        image: string,
        name: string,
        username: string
    },
    frozen: boolean,
    config: {
        created_at: "2020-01-20T10:23:44.878185331Z",
        updated_at: "2020-01-20T10:23:44.878185458Z",
        name: string,
        typing_events: boolean,
        read_events: boolean,
        connect_events: boolean,
        search: boolean,
        reactions: boolean,
        replies: boolean,
        mutes: boolean,
        uploads: boolean,
        url_enrichment: boolean,
        max_message_length: number,
        automod: string,
        automod_behavior: string,
        commands: [
            {
                name: string,
                description: string,
                args: "[text]",
                set: string
            }
        ]
    },
    name: string
    image:string
    data:{
        name:string
    }
}

export interface User {
    id: string,
    name: string,
    fullName: string,
    image: string,
    hashedPassword: string,
    phoneNumber: string
}

export interface Member {

}