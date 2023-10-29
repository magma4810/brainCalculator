

(async function(){
    const list = document.querySelector('#list');
    //читка массива ответов
    async function readList(storageKey){
        try{
            const storage = localStorage.getItem(storageKey);
            return storage === null ? [] : JSON.parse(storage); 
        }catch(e){
            console.log(e);
            return [];
        }
    }
    const items = await readList('items');
    //отрисовка текста
    function drawList(list,items,select){
        if (select === 1){
            list.innerHTML = `<ol>${items.map((el)=>`<li>${el}</li>`).join('')}</ol>`;
        }else{
            list.innerHTML = `<em>Score:${items[0]}   Record:${items[1]}<em>`
        }
        
    }
    const score_and_record = document.querySelector('.score_and_record')
    const scoreRecord = [0,0];
    function goCulc(){
        showMathExample();
        drawList(list,items,1);
        drawList(score_and_record,scoreRecord,2);
        clear.hidden = false;
        form.hidden = false;
        go.hidden = true;
    }

    function saveList(items,storageKey){
        localStorage.setItem(storageKey,JSON.stringify(items))
    }
    function clearList(){
        items.splice(0,items.length)
        saveList(items)
        drawList(list,items,1)
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const example = document.querySelector('#example');
    function showMathExample(){
        let num1 = getRandomInt(10);
        let num2 = getRandomInt(10);
        example.innerHTML = `${num1} + ${num2} =`;
    }
    function mathExample(example,value){
        const splitExample = example.textContent.split('');
        const num1 = Number(splitExample[0])
        const num2 = Number(splitExample[4])
        if (value == num1+num2){
            scoreRecord[0]++;
            drawList(score_and_record,scoreRecord,2);
            return `${num1} + ${num2} = ${value} TRUE`
        }else{
            if (scoreRecord[0] > scoreRecord[1]){
                scoreRecord[1] = scoreRecord[0];
                scoreRecord[0] = 0;
                drawList(score_and_record,scoreRecord,2);
                return `${num1} + ${num2} = ${value} FALSE`
            }else{
                scoreRecord[0] = 0;
                drawList(score_and_record,scoreRecord,2);
                return `${num1} + ${num2} = ${value} FALSE`
            }
            
        }
    }
    
    const form = document.querySelector('form');
    const clear = document.querySelector('#clear');
    const go = document.querySelector('#go');

    
    go.addEventListener('click',goCulc);
    clear.addEventListener('click',clearList);


    form.addEventListener('submit',(ev) => {
        ev.preventDefault();

        const formElement = ev.target;
        const input = formElement.querySelector('input');
        const example = formElement.querySelector('#example');
        const value = input.value;
        input.value = '';
        

        items.push(mathExample(example,value));

        saveList(items,'items');

        drawList(list,items,1);

        showMathExample()
    })//сделать очки и рекорд 
})();