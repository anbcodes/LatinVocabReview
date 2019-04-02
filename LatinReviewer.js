class LatinReviewer {
    constructor () {
        this.weekPickerElement = this.createWeekPickerElement()
        this.latinReviewByWeek = latinReviewByWeek //Defined In latinReveiwByWeek.js (Long)
        this.weekPicker = new WeekPicker((weeks) => this.onWeekPickerSubmit(weeks), this.weekPickerElement)
        this.vocabWeeks = []
        this.gameElement = this.createGameElement()
        this.endElement = this.createEndElement()
        this.game = []
    }
    createWeekPickerElement() {
        let weekPickerElement = document.createElement("div")
        weekPickerElement.id = "WeekPickerDiv"
        weekPickerElement.innerHTML = "<h1>Pick which weeks you want to review</h1>"
        document.body.appendChild(weekPickerElement)
        return weekPickerElement
    }
    onWeekPickerSubmit(weeks) {
        for (let x = 0; x < weeks.length; x += 1) {
            this.vocabWeeks.push(latinReviewByWeek[weeks[x]-1])
        }
        this.weeks = weeks
        console.log("vocabWeeks: ", this.vocabWeeks)
        this.startGame()
    }
    startGame() {
        this.weekPickerElement.style.display = "none"
        this.gameElement.style.display = "block"
        this.game = new game(this.vocabWeeks, (time) => this.onGameEnd(time), this.gameElement)
    }
    onGameEnd(time) {
        this.endElement.innerHTML = `<h1>Your time was: ${time[2]}:${time[1]}.${time[0]} <br> you reviewed week(s) ${this.weeks.join(", ")}</h1>
        <h3>Reload to play again<h3>`
        this.endElement.style.display = "block"
        this.game.hide()
    }
    createGameElement() {
        let gameElement = document.createElement("div")
        gameElement.id = "gameDiv"
        gameElement.style.display = "none"
        document.body.appendChild(gameElement)
        return gameElement
    }
    createEndElement() {
        let endElement = document.createElement("div")
        endElement.id = "endDiv"
        endElement.style.display = "none"
        document.body.appendChild(endElement)
        return endElement
    }
}