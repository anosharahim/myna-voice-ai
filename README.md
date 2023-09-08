# Idea

What if you could listen to audiobooks and talk to them as well?
What if you could ask the audiobook to note down your thoughts about certain parts of the book?
What if your audiobook could also look up things for you and help you go down rabbitholes while listening to it?

In this project, I will create exactly that.

# Plan

Here is my rough plan for version 1 --

step 1: Create an interface that takes as input a URL to a blogpost.

step 2: It converts the text into audio using text-to-speech model.

step 2.5 stores the audio in a database if it does not already exist.

todo:
-- figure out how to store big audiofiles for users
-- serve uploaded files on django for users to play

step3: Incorporate voice detection while audio is playing, so when voice is detected, pause audio and start converting voice input to text.

step 4: Give that input to an LLM fine-tuned on that specific ebook, and fetch text output.

step 5: Convert text output to speech, and respond.

step 6: Inform the listener that you will continue reading, and then resume the audio.

# Resources

Overview of TTS vs STT by Murf AI:
https://murf.ai/resources/text-to-speech-vs-speech-to-text/#:~:text=As%20is%20evident%2C%20there%20is,for%20its%20speech%20recognition%20module.

Coqui AI TTS
https://github.com/coqui-ai/TTS
