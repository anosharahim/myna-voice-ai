FROM continuumio/miniconda3

# system packages
RUN apt-get update && apt-get install -y libsndfile1 espeak xsel build-essential cmake curl

# Install Rust compiler
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Create and activate Conda environment
RUN conda create -n myenv python=3.9
RUN echo "conda activate myenv" >> ~/.bashrc
ENV PATH="/opt/conda/envs/myenv/bin:$PATH"


RUN mkdir -p /opt/conda/envs/myenv/etc/conda/activate.d

# Add Rust compiler to the PATH in the Conda environment
RUN echo 'export PATH="/root/.cargo/bin:$PATH"' >> /opt/conda/envs/myenv/etc/conda/activate.d/env_vars.sh

RUN pip install wheel

# Install sudachipy separately for tts
RUN pip install --no-cache-dir sudachipy

RUN pip install tts torch

COPY ./app /app

WORKDIR /app

EXPOSE 5002

CMD ["python3", "app.py"]