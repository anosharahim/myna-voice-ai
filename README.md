
## Description

Myna lets users to convert blogposts into audio and save them into their audio library (hooked up to an S3 bucket). 

It uses an open source text-to-speech (TTS) model from HuggingFace called xttsv2, which is ranked 3rd on [TTS Arena](https://huggingface.co/spaces/TTS-AGI/TTS-Arena) (as of April, 2024). This leaderboard crowdsources blind ranking based on how natural sounding the synthesized speech is. 

For obtaining and parsing text from HTML on the web, I use BeautifulSoup and Trafilatura Python packages. 

Myna is derived from the name of a group of bird species native to Southern Asia, some of which have the ability to mimic speech.

## Install and Run

Stack: React, Django

Create a virtual environment and make sure you have Django installed for Python 3.9.6. 

- Install dependencies
    
     `pip install -r requirements.txt` 
    
- Run backend server
    
    `python manage.py runserver` 
    
- Run frontend server
    
    In a separate terminal, run the following command:  `npm run start`
    

Currently, the project is set to run on your local servers. The first time you run it, the AI model will take some time to download. Subsequent runs should be faster, but xtts_v2 can be slow on CPUs. Better to test it on [short stories](https://100wordstory.org/) to start.

## Extension / features I am working on

This is a work in progress and I am currently still building more features and fleshing out the MVP. 

My vision for this project includes: 

- Allowing users to generate audios in their desired voice (multiple options). In addition, allowing users to clone their desires voices that are not already available. This is easily possible using xtts_v2.
- Adding multilingual support to the frontend. As of April 2024, xtts_v2 has support for 17 languages.
- Voice-activated note-taking, so users can simply take notes as they are listening by talking out loud.
- Time-stamped notes: Creating a UI for users to look back on their notes and the audio snippet that the note is associated with.
