import * as config from '../../auth_config.json';

const { 
    domain, 
    clientId, 
    authorizationParams: { 
        audience, 
        scope 
    } 
} = config as {
    domain: string;
    clientId: string;
    authorizationParams: {
        audience: string;
        scope: string;
    },
};

const personalAssistantApiRoot = 'http://localhost:8080/';
const personalAssistantApiTaskRoot = `${personalAssistantApiRoot}task`;
const personalAssistantApiNoteRoot = `${personalAssistantApiRoot}note`;
const personalAssistantApiToDoListRoot = `${personalAssistantApiRoot}to-do-list`;

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
        },
        note: {
            upsert: `${personalAssistantApiNoteRoot}`,
            getByDate: `${personalAssistantApiNoteRoot}`
        }
    },
    auth0: {
        domain,
        clientId,
        authorizationParams: {
            redirect_uri: `${window.location.origin}/daily`,
            audience,
            scope
        },
    },
}