function loadFile(event)
{
    var image = document.getElementById('image'); // gets the ID "output" and displays the image the user uploaded
    image.src = img.src.createObjectUrl(event.target.files[0]); //image source of the first file uploaded
    
}

async function handle(event) //take in the reponse and create a form that includes amount of different emotions using data from face api
{
    console.log('submitting form...');
    $('image').html('Loading');
    event.preventDefault();

    //creating a new form with emotion data 
    var myform = document.getElementById('myform');
    var payload = new FormData(myform);

    //TODO: url for function accessing spotify API
    const resp = await fetch('<URL>', {
        method: 'POST',
        body: payload
    });

    //variable for JSON data
    var data = resp.json();
    console.log(data);
    var emotion = data.result[0].faceAttributes.emotion; //sets emotion to the first result in JSON data

    console.log(emotion);
    //HTML that will be displayed
    var resultString = 
    `<h3> Emotions in the image: </h3><br />
     <p> anger: ${emotion.anger}</p>
     <p> contempt: ${emotion.contempt}</p>
     <p> disgust: ${emotion.disgust}</p>
     <p> fear: ${emotion.fear}</p>
     <p> happiness: ${emotion.happiness}</p>
     <p> sadness: ${emotion.sadness}</p>
     <p> surprise: ${emotion.surprise}</p>
     <p> neutral: ${emotion.neutral}</p>
    `
    //measuring valence, the measurement of happiness or positivity in a song
    var valence = emotion.happiness + emotion.surprise - emotion.anger - emotion.contempt - emotion.disgust - emotion.fear - emotion.sadness;

    if(valence < emotion.neutral)
        valence = .5;
    if(valence > 1)
        valence = 1;
    if(valence < 0)
        valence = .0;
    $('#emotion').html(resultString);
    $('#hidden-emotion').html(valence);
}
loadFile();
handle();