function visualizer(){

    //Set number of bars for visualizer
    const number_of_bars = 63;
    
    //Gets the audio source in HTML
    const audio = document.getElementById('audio');
        
    //Create an audio context
    const contex = new AudioContext();
        
    //Create an audio source
    const audioSource = contex.createMediaElementSource(audio);
        
    //Create audio analyzer
    const analyzer = contex.createAnalyser();
        
    //Connects the audio to the analyzer then back to the context destination
    audioSource.connect(analyzer);
    audioSource.connect(contex.destination);
    
    //Prints frequency data in console
    const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(frequencyData);
    console.log("frequencyData", frequencyData);
    
    //Get visualizer container
    const visualizerContainer = document.querySelector(".visualizer-container");
    
    //Checks if visualizer button has been pressed, if pressed, it will set the color to something else
    
    //Create a set of pre-defined bars
    var clicked = false;
    document.getElementById('colorButtonBar').addEventListener("click", function()
    {
        clicked = true;
    });
    if(clicked == true)
    {
        for(let i = 0; i < number_of_bars; i++)
        {
            const bar = document.createElement("DIV");
            bar.setAttribute("id", "bar" + i);
            let color = document.getElementById('colorInputBar').value;
            document.getElementById('bars').style.background = color;
            document.getElementById('bars').style.width = "25px";
            document.getElementById('bars').style.margin = "0 2px";
            visualizerContainer.appendChild(bar);
        }
    }
    else if(clicked == false)
    {
        for(let i = 0; i < number_of_bars; i++)
        {
            const bar = document.createElement("DIV");
            bar.setAttribute("id", "bar" + i);
            bar.setAttribute("class", "visualizer-container-bars");
            visualizerContainer.appendChild(bar);
        }
    }
    
    //Makes bars move to the frequency of the audio
    function renderFrame()
    {
        analyzer.getByteFrequencyData(frequencyData);
        for(let i = 0; i < number_of_bars; i++)
        {
            const index = (i)*9;
            const fd = frequencyData[index];
    
            const bar = document.querySelector("#bar" + i);
            if(!bar)
            {
                continue;
            }
            const barHeight = Math.max(4, fd || 0);
            bar.style.height = barHeight + "px";
        }
        window.requestAnimationFrame(renderFrame);
    }
    
    renderFrame();
    
    //setInterval(function(){
    // console.log("tick");
    //renderFrame();
    //}, 1000);
    
        audio.volume = 0.5;
        audio.play();
    };