export default class SocketEvents {
    // Server
    static readonly SEND_THE_AMBULANCE = "help_me";
    static readonly TRANSLATE_TEXT = "translate_text";

    // Client
    static readonly CHUNK_IS_COMING = "chunk";
    static readonly HET_CUU = 'end_stream';
}