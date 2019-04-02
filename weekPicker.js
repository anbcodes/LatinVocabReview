class WeekPicker {
    constructor (onsubmit, weekButtonsElement) {
        this.onsubmit = onsubmit
        this.weeks = []
        this.selectedWeeks = []
        this.weekButtonsText = this.genWeekButtonsText()
        this.weekButtons = new ButtonGroup("weekButtons", 6, 5, this.weekButtonsText, (e) => this.weekButtonCallBack(e), weekButtonsElement)
        this.actionButtonsText = [["submit", "select All", "unselect All"]]
        this.actionButtons = new ButtonGroup("weekPickerActions", 1, 3, this.actionButtonsText, (e) => this.actionButtonsCallback(e), weekButtonsElement)
    }
    genWeekButtonsText() {
        let text = []
        let week = 1
        for (let row = 0; row < 6; row += 1) {
            let textRow = []
            for (let column = 0; column < 5; column += 1) {
                textRow.push(`week ${week}`)
                week += 1
            }
            text.push(textRow)
        }
        return text
    }
    weekButtonCallBack(e) {
        this.selectedWeeks[e.target.innerText.slice(5)] = !this.selectedWeeks[e.target.innerText.slice(5)]
        if (this.selectedWeeks[e.target.innerText.slice(5)]) {
            e.target.style.backgroundColor = `rgb(${151-50}, ${6-6}, ${235-50})`
        } else {
            e.target.style.backgroundColor = ""
        }
    }
    actionButtonsCallback(e) {
        if (e.target.innerText === "submit") {
            this.submit()
        } else if (e.target.innerText === "select All") {
            this.selectAllButtons()
        } else if (e.target.innerText === "unselect All") {
            this.unselectAllButtons()
        }
    }
    submit() {
        for (let x = 1; x < 31; x += 1) {
            console.log("slected week: ", this.selectedWeeks[x])
            if (this.selectedWeeks[x]) {
                console.log("x ", x)
                console.log([].push(x))
                this.weeks.push(x)
            }
        }
        this.onsubmit(this.weeks)
    }
    selectAllButtons() {
        let week = 1
        for (let row = 0; row < 6; row += 1) {
            for (let column = 0; column < 5; column += 1) {
                this.selectedWeeks[week] = true
                document.getElementById("weekButtons-row-" + row + "column-" + column).style.backgroundColor = `rgb(${151-50}, ${6-6}, ${235-50})`
                week += 1
            }
        }
    }
    unselectAllButtons() {
        let week = 1
        for (let row = 0; row < 6; row += 1) {
            for (let column = 0; column < 5; column += 1) {
                this.selectedWeeks[week] = false
                document.getElementById("weekButtons-row-" + row + "column-" + column).style.backgroundColor = ""
                week += 1
            }
        }
    }
    hide() {
        this.weekButtons.hide()
        this.actionButtons.hide()
    }
    show() {
        this.weekButtons.show()
        this.actionButtons.show()
    }
}