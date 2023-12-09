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
    }
}