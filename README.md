## Next Steps
- Add delete functionaliity to audio library 
- [DONE] Show nothing if library has nothing instead of the library skeleton 
- Make the audio player circle move with audio 
- Update duration with audio 
- show a loading button while waiting for response from backend

# Context & Motivation

Representative of my generation (Gen Z) is the infamously short attention span. Luckily, I went to a university that is built on the latest education science, which takes into account the shortening attention span in students. I did not have to listen to a single lecture in my four years of undergrad. Every class had 8-20 students engaged in active discussion, powered by an education software that kept track of student engagement, and it made me genuinely excited about learning.

I graduated earlier this year, and have since been frantically searching for similar types of highly engaging learning environments. One option is community, which I am lucky to have in San Francisco. The other option is self-learning via books, blogs, podcasts etc. The problem is that long-form text and audio are one-sided and hard to stay engaged with. Even at maximum sustained attention, it is still passive learning.

I want to build something that transforms long-form audio from passive into an active learning modality. This is why I want to build the following project.

# Project Description

An app that serves blogs as podcasts where the user is an active participant. The user can ask the blog questions, and share it's own thoughts using voice, in a natural conversation format.

# Plan

Rough Plan for version 1 --

✅ step 1: Create an interface that takes as input a URL to a blogpost.

✅ step 2: It converts the text into audio using text-to-speech (TTS/ Coqui AI) model from Hugging Face.

✅ step 2.5 stores the audio in a database if it does not already exist.
-- store audiofiles for users ✔️
-- serve uploaded files on django for users to play ✔️

✅ step 3: Incorporate automatic speech recognition while audio is playing. Get user input and send to backend for processing.
-- explore audio recognition methods

▶️ step 4: Give that input to an LLM fine-tuned on that specific ebook, and fetch text output.
-- Explore RAG // ground LLM responses in the associated blogpost // ideally grounded in a specific span of text
-- Explore utilize semantic search to make responses more relevant to specific content in the library.

step 5: Convert text output to speech, and respond.

step 6: Inform the listener that you will continue reading, and then resume the audio.

# Resources

Overview of TTS vs STT by Murf AI:
https://murf.ai/resources/text-to-speech-vs-speech-to-text/#:~:text=As%20is%20evident%2C%20there%20is,for%20its%20speech%20recognition%20module.

Coqui AI TTS
https://github.com/coqui-ai/TTS
