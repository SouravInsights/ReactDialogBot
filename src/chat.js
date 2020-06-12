/* 
 - api-ai-javascript is the package provied by Dialogflow but back then it was used to called as Api.ai.
 Hence the package is named as api-ai-javascript. 
 
 - The use of this package is that it actually communicates with your DialogFlow bot using the client access token. 
*/
import { ApiAiClient } from 'api-ai-javascript';

/* applyMiddleware is used to create middlewares that will help our frontend to dispatch actions to the bot. And with createStore we are 
   just creating a store where all of our app's states will reside. In simple words, Store is somekind of storehouse for our app's states. 
*/
import { applyMiddleware, createStore } from 'redux';

/* Here we are storing the client access token of our dialogflow agent to the contsant variable, accessToken. But we should not hardcode
   any access token. We should always pass it via .env file. */
const accessToken = process.env.TokenChanged;

// We are creating a instance of ApiAiClient called client inside which we are passing the accessToken as argument.
const client = new ApiAiClient({ accessToken });

const ON_MESSAGE = 'ON_MESSAGE';

/* sendMessage() is the dispatcher function that dispatches action type and action payload. We are also exporting this function by writing 
  "export const sendMessage" so that we can use this function anywhere in our application. */
export const sendMessage = (text, sender = 'user') => ({
    type: ON_MESSAGE,  // Here, we are defining the action type which is "ON_MESSAGE".
    payload: { text, sender } /* It's the action payload, an object that receives two values text and sender. The value text is coming 
                                 from the below middleware called messageMiddleware. */
})

const messageMiddleware = () => next => action => {
    next(action)
    if (action.type === ON_MESSAGE) {
        const { text } = action.payload;
        client.textRequest(text).then(onSuccess)
        function onSuccess(response) {
            console.log(response.result.fulfillment.speech)
            next(sendMessage(response.result.fulfillment.speech, 'bot'));
        }
    }
}
const initState = [{ text: 'hey' }];
const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case ON_MESSAGE:
            return [...state, action.payload]
        default:
            return state
    }
}
export const store = createStore(messageReducer, applyMiddleware(messageMiddleware))
