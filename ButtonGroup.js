class ButtonGroup {
    constructor (name, rows, columns, buttonText, buttonCallBackFunction, element) {
        this.element = element || document.body
        this.numRows = rows
        this.numColumns = columns
        this.name = name
        this.buttonCallBackFunction = buttonCallBackFunction
        this.buttonText = buttonText
        this.createButtonsElement()
    }
    show(display) {
        this.buttons.style.display = display || "block"
    }
    hide() {
        this.buttons.style.display = "none"
    }
    showButton(row, column, display) {
        document.getElementById(`${this.name}-row-${row}-column-${column}`).style.display = display || "block"
    }
    hideButton(row, column) {
        document.getElementById(`${this.name}-row-${row}-column-${column}`).style.display = "none"
    }
    showRow(row, display) {
        document.getElementById(`${this.name}-row-${row}`).style.display = display || "block"
    }
    hideRow(row) {
        document.getElementById(`${this.name}-row-${row}`).style.display = "none"
    }
    createRows() {
        this.buttonRows = []
        for (let row = 0; row < this.numRows; row += 1) {
            let buttonRow = document.createElement("div")
            buttonRow.id = this.name + "-row-" + row
            buttonRow.className = this.name + "-row"
            this.buttons.appendChild(buttonRow)
            this.buttonRows.push(buttonRow)
        }
    }
    addButtonsToRows() {
        for (let row = 0; row < this.numRows; row += 1) {
            for (let column = 0; column < this.numColumns; column += 1) {
                let button = document.createElement("button")
                button.id = this.name + "-row-" + row + "column-" + column
                button.className = this.name + " " + "resize"
                button.addEventListener("click", this.buttonCallBackFunction)
                button.appendChild(document.createTextNode(this.buttonText[row][column]))
                this.buttonRows[row].appendChild(button)
            }
        }
    }
    createButtonsElement() {
        this.buttons = document.createElement("div")
        this.buttons.id = this.name
        this.createRows()
        this.addButtonsToRows()    
        this.element.appendChild(this.buttons)    
    }
    setNewButtonText(buttonText) {
        this.buttonText = buttonText
        for (let row = 0; row < this.numRows; row += 1) {
            for (let column = 0; column < this.numColumns; column += 1) {
                let button = document.getElementById(this.name + "-row-" + row + "column-" + column)
                button.innerText = this.buttonText[row][column]
            }
        }
    }
}