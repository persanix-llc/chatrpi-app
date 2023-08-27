![Chatrpi logo](https://images.persanix.com/chatrpi/logo-padded.svg)

Chat for Raspberry Pi (Chatrpi) is a voice assistant for the [Raspberry Pi](https://raspberrypi.org)
that can hold simple conversations and control GPIO output.

Powered by [Tensorflow.js](https://www.tensorflow.org/js), [ChatGPT](https://openai.com/chatgpt),
and [Endrpi](https://endrpi.io/).

## Features

* Continuous listening via wake-word detection with configurable name.
* Indefinite conversations with wake-word bypass.
* Conversational GPIO output control with contextual memory.
* Extensible to other boards that accept HTTP requests.

## Requirements

≥ Node.js 16.0

* Required to install and run the Chatrpi server.
* Installable on the Raspberry Pi or any computer on the same LAN.

≥ Endrpi 1.0

* See the [Endrpi docs](https://endrpi.io/#quickstart) for installation requirements.

ChatGPT API key

* Visit [openai.com](https://openai.com/) to create an account.

## Quickstart

### Raspberry Pi

The following steps should be completed on your Raspberry Pi.

###### Find the IP address:

```bash
hostname -I
```

###### Install and run Endrpi:

```bash
pip3 install -U endrpi && endrpi
```

### Chatrpi host

The following steps can be completed on any computer connected to the same LAN as the Raspberry Pi,
or the Raspberry Pi itself.

###### Verify access to Endrpi

Visit <ip_address_of_pi>:5000 in your browser.
You should be presented with the Endrpi welcome screen.

###### Set the following environment variables:

```bash
ENDRPI_URL=<ip_address_of_pi:5000>
OPENAI_KEY=<your_openai_key>
```

###### Install and run Chatrpi:

```bash
npx @persanix-llc/chatrpi
```

## License

Licensed under the Apache License, Version 2.0.

Copyright &copy; 2020 - 2023 Persanix LLC. All rights reserved.
