// Seleção dos itens a serem manipulados no site

const previusOperationText = document.querySelector('#operacao-anterior')
const CurrentOperationText = document.querySelector('#operacao-posterior')
const buttons = document.querySelectorAll('#button-container button')

class Calculator {
    constructor(previusOperationText, CurrentOperationText){
        this.previusOperationText = previusOperationText
        this.CurrentOperationText = CurrentOperationText
        this.CurrentOperation =  ""

    }
    // Adiciona o digito da tela
    addDigit(digit){

        // Checar se já tem um ponto
        if(digit == "." && this.CurrentOperationText.innerText.includes(".")){
            return;
        }

        this.CurrentOperation = digit;
        this.updateScreen();
    }

    //Processar todas operações da calculadora

        processOperation(operation){

        // Checagem se o valor de baixo esta vazio
            if(this.CurrentOperationText.innerText === '' && operation !== "C"){
                // Mudança de operação
                if(this.previusOperationText.innerText !== ""){
                    this.changeOperation(operation)
                }
                return;
            }
            
        //Pegar o valor atual

            let operationValue;
            const previus = +this.previusOperationText.innerText.split(" ")[0];  // Pega o texto atual
            const current = +this.CurrentOperationText.innerText;

            // Fazer as operações
            switch(operation){
                case "+": 
                    operationValue = previus + current
                    this.updateScreen(operationValue, operation, current, previus)
                break;
                case "-": 
                    operationValue = previus - current
                    this.updateScreen(operationValue, operation, current, previus)
                break;
                case "/": 
                    operationValue = previus / current
                    this.updateScreen(operationValue, operation, current, previus)
                break;
                case "*": 
                    operationValue = previus * current
                    this.updateScreen(operationValue, operation, current, previus)
                break  
                case "DEL": 
                    this.processDeletOperation()
                break 
                case "CE": 
                    this.processorClearOperation()
                break 
                case "C": 
                    this.processClearAll()
                break 
                case "=": 
                    this.processEqual()
                break 
                default:
                return;
            }

        }

    // Muda o valor da tela da calculadora

    updateScreen(
        operationValue = null, // resutado da operação
        operation = null, // resultado que o usuário envia
        current = null,
        previus = null
        
        ){

        if(operationValue === null){
            this.CurrentOperationText.innerText += this.CurrentOperation;
        } else {
            // Checar se o valor for zero
            if(previus === 0){
                operationValue = current
            } 

            // adicionar o valor de baixo para cima 
            this.previusOperationText.innerText = `${operationValue} ${operation}`
            this.CurrentOperationText.innerText = ""
        }
    }

    // Mudar operação matemática
    changeOperation(operation){

        const mathOperation = ["*", "/", "+", "-"]

        if(!mathOperation.includes(operation)){
            return;
        }

        this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0, -1) + operation;
    
    }

    //Deleta o último digito
    processDeletOperation(){
        this.CurrentOperationText.innerText = this.CurrentOperationText.innerText.slice(0, -1)
    }

    //Deleta os digitos
    processorClearOperation(){
        this.CurrentOperationText.innerText = ""
    }

    //Deleta toda a conta
    processClearAll(){
        this.CurrentOperationText.innerText = "";
        this.previusOperationText.innerText = "";
    }

    //Dar resultado final
    processEqual(){
        const operation = previusOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }
}

const calc = new Calculator(previusOperationText, CurrentOperationText); 



buttons.forEach((btn) => {   //Cria um evento para CADA botão 
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;
        
        if(+value  >= 0 || value === "."){
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }

    })
})
