
const btn = document.querySelector('.talk');
const content = document.querySelector('.fala');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning Boss");
    }

    else if(hr == 12) {
        speak("Good noon Boss");
    }

    else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon Boss");
    }

    else {
        speak("Good Evening Boss");
    }
}

window.addEventListener('load', ()=>{
    speak("Activating Inertia");
    speak("Going online");
    wishMe();
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const synth = window.SpeechSynthesisVoice;


recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
   var infos = speakThis(transcript.toLowerCase());
   if(infos == false){
    chatGPT(transcript.toLowerCase());
   }

}


const element = document.getElementById('mic');
element.onclick = function () {recognition.start(); };

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    // speech.text = "Não entedi, pode repetir?";
    var retorno = false;
    if(message.includes('oi') || message.includes('nome')) {
        var edit_save = document.getElementById("alien");
        edit_save.src = "./img/etelvina4.png";   
        const finalText = "Haalloooooo terraqueo! Meu nome é Harley, Você está pronto para uma aventura de outro planeta? Busquem conhecimento!";
        speech.text = finalText;
        responseTextarea.value = finalText;
        retorno = true;
    }

    else if(message.includes('voar')) {
        var edit_save = document.getElementById("alien");
        edit_save.src = "./img/etelvina5.png";   
        const finalText = "Estou indo passar férias no meu planeta, quer uma carona na minha nave supersonica? ";
        speech.text = finalText;
        responseTextarea.value = finalText;
        retorno = true;
    }

window.speechSynthesis.onvoiceschanged = function() {
        var voices =   window.speechSynthesis.getVoices();
        speech.voice = voices[10]; // Note: some voices don't support altering params
        speech.volume = 1;
        speech.pitch = 1;
        speech.rate = 1;

          
    if(speech.text != ""){
        window.speechSynthesis.speak(speech);
        retorno = true;
        return retorno;
    }
     
    };
 
   
        return retorno; 
    
    
}


function speakThisGPT(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    
    var voices = window.speechSynthesis.getVoices();
    speech.voice = voices[10]; // Note: some voices don't support altering params
    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech); 
}
//CHAT GPT SCRIPTS

// const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');

async function chatGPT(mytext){
    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: "Responda com no maximo 150 caracteres: "+mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                speakThisGPT(data.choices[0].message.content);
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }

}
