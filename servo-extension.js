class ServoExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.deviceIP = '192.168.43.93'; // Replace with your ESP32 IP or local network IP
    }

    getInfo() {
        return {
            id: 'servoControl',
            name: 'Servo Controller',
            blocks: [
                {
                    opcode: 'setServoAngle',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set servo pin [PIN] to [ANGLE]°',
                    arguments: {
                        PIN: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 12
                        },
                        ANGLE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 90
                        }
                    }
                }
            ]
        };
    }

    setServoAngle(args) {
        const pin = args.PIN;
        const angle = args.ANGLE;
        const url = `http://${this.deviceIP}/servo?pin=${pin}&angle=${angle}`;

        fetch(url)
            .then(response => response.text())
            .then(data => console.log("Servo moved:", data))
            .catch(err => console.error("Failed to contact ESP32:", err));
    }
}

Scratch.extensions.register(new ServoExtension());
