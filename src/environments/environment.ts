import * as config from '../../auth_config.json';

const { domain, clientId, 
    // authorizationParams: { audience } 
} = config as {
    domain: string;
    clientId: string;
    // authorizationParams: {
    //     audience?: string;
    // },
};

const personalAssistantApiRoot = 'http://localhost:8080/';
const personalAssistantApiTaskRoot = `${personalAssistantApiRoot}task`
const personalAssistantApiToDoListRoot = `${personalAssistantApiRoot}to-do-list`

export const environment = {
    production: false,
    personalAssistantApi: {
        personalAssistantApiRoot,
        personalAssistantApiTaskRoot,
        task: {
            upsert: `${personalAssistantApiTaskRoot}`
        },
        personalAssistantApiToDoListRoot,
        toDoList: {
            getByDate: `${personalAssistantApiToDoListRoot}`
        }
    },
    auth0: {
        domain,
        clientId,
        authorizationParams: {
            redirect_uri: `${window.location.origin}/daily`,
        },
    },
}