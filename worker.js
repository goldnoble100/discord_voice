// メッセージ（数値）を受け取ったら素数がどうかを判定し、
// 結果をメッセージとして送信します。
self.addEventListener('message', (message) => {
    const user = message.data;

    const audioStream = receiver.createPCMStream(user);
    const recognizeStream = speechClient.streamingRecognize(stt_request)
        .on('error', console.error)
        .on('data', (data) => {
            if(data.error === null){
                console.log(`${user.username} : ${data.results[0].alternatives[0].transcript}`);
            }
        });
    audioStream.pipe(recognizeStream);

    // when the stream ends (the user stopped talking) tell the user
    audioStream.on('end', () => {
        msg.channel.sendMessage(`I'm no longer listening to ${user}`);
    });
});
