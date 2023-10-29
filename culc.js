

(async function(){
    const list = document.querySelector('#list');
    const storageKey = 'items';
    //читка массива ответов
    async function readList(){
        try{
            const storage = localStorage.getItem(storageKey);
            return storage === null ? [] : JSON.parse(storage); 
        }catch(e){
            console.log(e);
            return [];
        }
    }
    const items = await readList();
    //отрисовка текста
    function drawList(list,items){
        list.innerHTML = `<ol>${items.map((el)=>`<li>${el}</li>`).join('')}</ol>`;
    }

    function goCulc(){
        showMathExample();
        drawList(list,items);
        clear.hidden = false;
        form.hidden = false;
        go.hidden = true;
    }

    function saveList(items){
        localStorage.setItem(storageKey,JSON.stringify(items))
    }
    function clearList(){
        items.splice(0,items.length)
        saveList(items)
        drawList(list,items)
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
            return `${num1} + ${num2} = ${value} TRUE`
        }else{
            return `${num1} + ${num2} = ${value} FALSE`
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

        saveList(items);

        drawList(list,items);

        showMathExample()
    })//сделать очки и рекорд 
})();