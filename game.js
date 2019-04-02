class game {
    constructor (weeks, endCallBack, element) {
        this.weeks = weeks
        this.endCallBack = endCallBack
        this.doneVocab = []
        this.element = element || document.body
        this.timeElement = this.createTimeElement()
        this.time = [0, 0, 0]
        this.displayText = this.createDisplayTextElement()
        this.startTime = 0
        this.answer = this.pickNewAnswer()
        this.currentButtonText = this.genButtonText()
        this.gameButtons = new ButtonGroup("gameButtons", 6, 6, this.currentButtonText, (e) => this.buttonCallBack(e), this.element)
        this.startButton = this.createStartButton()
    }
    createTimeElement() {
        let timeE = document.createElement("h1")
        timeE.id = "timeDisplay"
        timeE.innerText = "Time: 00:00.00"
        this.element.appendChild(timeE)
        return timeE
    }
    createDisplayTextElement() {
        let display = document.createElement("h1")
        display.id = "gameDisplay"
        display.innerText = "Click Start"
        this.element.appendChild(display)
        return display
    }
    pickNewAnswer() {
        let randWeek, randVocab, englishOrLatin;
        while (true) {
            randWeek = this.weeks[Math.floor(Math.random() * this.weeks.length)]
            console.log(randWeek)
            randVocab = randWeek[Math.floor(Math.random() * randWeek.length)]
            englishOrLatin = Math.floor(Math.random() * 2)
            if (!this.doneVocab.includes(randVocab) && randWeek[0].length !== 0) {
                console.log("break")
                break
            }
            let number = 0
            for (let week = 0; week < this.weeks.length; week += 1) {
                for (let v = 0; v < this.weeks[week].length; v += 1) {
                    number += 1 
                }
            }
            if (this.doneVocab.length >= number) {
                this.endGame()
                break
            }
        }
        return [randVocab[englishOrLatin], randVocab, randVocab[englishOrLatin ^ 1]]
    }
    endGame() {
        clearInterval(this.updateTime)
        this.endCallBack(this.time)
    }
    genButtonText() {
        let vocabRow = Math.floor(Math.random() * 6)
        let vocabColumn = Math.floor(Math.random() * 6)
        let buttonText = []
        for (let row = 0; row < 6; row += 1) {
            let buttonTextRow = []
            for (let column = 0; column < 6; column += 1) {
                if (row != vocabRow || column != vocabColumn) {
                    let randWeek, randVocab, englishOrLatin
                    while (true) {
                        randWeek = this.weeks[Math.floor(Math.random() * this.weeks.length)]
                        if (randWeek[0].length !== 0) {
                            break
                        }
                    }
                    randVocab = randWeek[Math.floor(Math.random() * randWeek.length)]
                    englishOrLatin = Math.floor(Math.random() * 2)
                    buttonTextRow.push(randVocab[englishOrLatin])
                } else {
                    buttonTextRow.push(this.answer[0])
                }
            }
            buttonText.push(buttonTextRow)
        }
        return buttonText
    }
    buttonCallBack(e) {
        let clickedValue = e.target.innerText
        if (clickedValue === this.answer[0]) {
            this.rightAnswer(e.target)
        } else {
            this.wrongAnswer(e.target)
        }
    }
    rightAnswer(button) {
        button.style.backgroundColor = "rgb(8, 216, 39)"
        setTimeout(() => {
            button.style.backgroundColor = ""
        }, 700)
        this.doneVocab.push(this.answer[1])
        this.answer = this.pickNewAnswer()
        this.displayText.innerText = this.answer[2]
        this.currentButtonText = this.genButtonText()
        this.gameButtons.setNewButtonText(this.currentButtonText)
    }
    wrongAnswer(button) {
        button.style.backgroundColor = "rgb(214, 12, 2)"
        setTimeout(() => {
            button.style.backgroundColor = ""
        }, 700)
    }
    createStartButton() {
        let startButton = document.createElement("button")
        startButton.innerText = "Start"
        startButton.id = "game-startButton"
        startButton.addEventListener("click", (e) => this.start(e))
        this.element.appendChild(startButton)
        return startButton
    }
    updateTime() {
        this.time[0] += 1
        if (this.time[0] >= 100) {
            this.time[0] = 0
            this.time[1] += 1
        }
        if (this.time[1] >= 60) {
            this.time[1] = 0
            this.time[2] += 1
        }
        this.timeElement.innerText = `${this.time[2]}:${this.time[1]}.${this.time[0]}`
    }
    start(e) {
        this.answer = this.pickNewAnswer()
        this.currentButtonText = this.genButtonText()
        this.gameButtons.setNewButtonText(this.currentButtonText)
        this.displayText.innerText = this.answer[2]
        this.time = [0, 0, 0]
        this.doneVocab  = []
        clearInterval(this.updateTime)
        setInterval(() => this.updateTime(), 10)
    }
    hide() {
        this.element.style.display = "none"
    }
}