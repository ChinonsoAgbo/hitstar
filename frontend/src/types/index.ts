export interface Card {
    id: string,
    title: string,
    year: number,
    interpreter: string
}

export interface Player {
    id: PlayerID,
    name: string,
    icon: string,
    tokens: number,
    cards: Card[]
}

export enum GameState {
    START_GAME,
    START_TURN,
    WAIT_FOR_DRAW_CARD,
    DRAW_CARD,
    CARD_DREW,
    SHOW_SONG_MENU,
    SORT_CARD,
    WAIT_FOR_CARD_SORTED,
    CARD_SORTED
}

type PlayerID = string;

type SessionID = string;
type TopTopic = 'lobby' | 'controller' | 'main';
type SubTopic = 'blablabla' // TODO
type Topic = `${SessionID}/${TopTopic}/${SubTopic}`;

type Command = 'left' | 'right' | 'commit';

interface Message { // TODO
    senderId: PlayerID,
    token: string,
    gameState: GameState,
    command: Command | undefined
}

export interface MQTTMessage {
    topic: Topic,
    message: Message
}

let msg: MQTTMessage = { // TODO
    topic: 'abc123/lobby/blablabla',
    message: {
        senderId: 'lalala123',
        token: 'sdsd',
        gameState: GameState.START_GAME
    }
}