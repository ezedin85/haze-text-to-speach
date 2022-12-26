const synth = window.speechSynthesis;

const body = document.getElementById('body')
const word = document.getElementById('word')
const text_form = document.getElementById('text_form')
const pitch_value = document.getElementById('pitch_value')
const rate_value = document.getElementById('rate_value')
const pitch = document.getElementById('pitch')
const rate = document.getElementById('rate')
const start = document.getElementById('start')
const stop = document.getElementById('stop')
const select_voice = document.getElementById('select_voice')
const submit = document.getElementById('submit')

let voices = [];

const getVoices = () =>{
    voices = synth.getVoices();
    voices.forEach(voice =>{
        //create an option element
        let option = document.createElement('option');
        //assign the voice variable to the option element
        option.textContent = voice.name + '('+ voice.lang +')';
        //set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        //appen the option to the select element
        select_voice.append(option)
    })

}

getVoices()
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

const speak = () =>{
    body.style.background = "#18a2b5 url(assets/sound.gif)"
    body.style.backgroundPosition = 'center';
    body.style.backgroundSize = 'contain'; 
    body.style.backgroundRepeat = 'no-repeat'


    //check if speaking
    if(synth.speaking){
        // console.error('already speking');
        // return;
    }
    if(word.value !== ''){
        //get speak text
        const speakText = new SpeechSynthesisUtterance(word.value)

        //speak end
        speakText.onend = ()=> {
            body.style.background = "#18a2b5"
        }

        //speak error
        speakText.onerror = ()=> console.log('somehing went wrong!');

        const selectedVoice = select_voice.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice =>{
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value
        speakText.pitch = pitch.value

        //speak
        synth.speak(speakText)
    }
}


//event listners
text_form.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    word.blur()
})

//rate value change
rate.addEventListener('change', ()=>rate_value.textContent = rate.value)

//pitch value change
pitch.addEventListener('change', ()=>pitch_value.textContent = pitch.value)


//voice select cahnge
select_voice.addEventListener('change', ()=> speak())

start.addEventListener('click', ()=>{
    synth.resume()
    start.style.display = 'none'
    stop.style.display = 'inline'
})

stop.addEventListener('click', ()=>{
    synth.pause()
    stop.style.display = 'none'
    start.style.display = 'inline'
})
