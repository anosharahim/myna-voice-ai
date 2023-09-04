# Idea

What if you could talk to your audiobook or blogpost as you are listening to it? You could ask it questions and learn more about a specific topic, or on tangents that you would otherwise index in your mind for later or even forget. What if you could ask your audiobook to save some of your thoughts about the text so you could come back to them later?

In this project, I will create exactly that.

# Plan

Here is my rough plan for version 1 --

step 1: Create an interface that takes as input a URL to a blogpost.

step 2: It converts the text into audio using text-to-speech model and stores the audio in a database if it does not already exist.

step3: Incorporate voice detection while audio is playing, so when voice is detected, pause audio and start converting voice input to text.

step 4: Give that input to an LLM fine-tuned on that specific ebook, and fetch text output.

step 5: Convert text output to speech, and respond.

step 6: Inform the listener that you will continue reading, and then resume the audio.

# Resources

Overview of TTS vs STT by Murf AI:
https://murf.ai/resources/text-to-speech-vs-speech-to-text/#:~:text=As%20is%20evident%2C%20there%20is,for%20its%20speech%20recognition%20module.
